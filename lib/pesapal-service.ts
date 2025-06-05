interface PesaPalConfig {
  consumerKey: string
  consumerSecret: string
  baseUrl: string
}

interface PaymentRequest {
  amount: number
  description: string
  type: "MERCHANT"
  reference: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  country_code: string
  currency: "KES" | "USD" | "UGX" | "TZS"
  callback_url: string
}

interface PaymentResponse {
  order_tracking_id: string
  merchant_reference: string
  redirect_url: string
  error?: string
  status: number
}

class PesaPalService {
  private config: PesaPalConfig

  constructor() {
    this.config = {
      consumerKey: process.env.PESAPAL_CONSUMER_KEY || "",
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || "",
      baseUrl: "https://cybqa.pesapal.com/pesapalv3/api", // Sandbox URL
    }

    if (!this.config.consumerKey || !this.config.consumerSecret) {
      console.error("PesaPal credentials not found in environment variables")
    }
  }

  async getAccessToken(): Promise<string> {
    try {
      const url = `${this.config.baseUrl}/Auth/RequestToken`

      console.log("Requesting PesaPal token...")
      console.log("URL:", url)
      console.log(
        "Consumer Key:",
        this.config.consumerKey ? `${this.config.consumerKey.substring(0, 8)}...` : "NOT SET",
      )

      const requestBody = {
        consumer_key: this.config.consumerKey,
        consumer_secret: this.config.consumerSecret,
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("Token response status:", response.status)
      console.log("Token response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Token request failed:", errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const responseText = await response.text()
      console.log("Token response body:", responseText)

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse token response:", responseText)
        throw new Error(`Invalid JSON response: ${responseText}`)
      }

      if (data.token) {
        console.log("Successfully obtained PesaPal token")
        return data.token
      }

      if (data.error) {
        console.error("PesaPal token error:", data.error)
        throw new Error(`PesaPal error: ${data.error}`)
      }

      console.error("Unexpected token response:", data)
      throw new Error("No token received from PesaPal")
    } catch (error) {
      console.error("PesaPal Auth Error:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Failed to authenticate with PesaPal")
    }
  }

  async submitOrderRequest(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      console.log("=== PesaPal Order Submission ===")
      console.log("Payment data:", {
        ...paymentData,
        phone_number: paymentData.phone_number.substring(0, 4) + "****", // Mask phone
      })

      const token = await this.getAccessToken()
      const url = `${this.config.baseUrl}/Transactions/SubmitOrderRequest`

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }

      console.log("Making payment request to:", url)
      console.log("Request headers:", { ...headers, Authorization: "Bearer ***" })

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(paymentData),
      })

      console.log("Payment response status:", response.status)
      console.log("Payment response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Payment request failed:", errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const responseText = await response.text()
      console.log("Payment response body:", responseText)

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse payment response:", responseText)
        throw new Error(`Invalid JSON response: ${responseText}`)
      }

      console.log("Parsed payment response:", data)

      if (data.order_tracking_id && data.redirect_url) {
        console.log("Payment request successful")
        return data
      }

      if (data.error) {
        console.error("PesaPal payment error:", data.error)
        throw new Error(`PesaPal error: ${data.error}`)
      }

      console.error("Unexpected payment response:", data)
      throw new Error("Invalid payment response from PesaPal")
    } catch (error) {
      console.error("PesaPal Payment Error:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Failed to submit payment request")
    }
  }

  async getTransactionStatus(orderTrackingId: string): Promise<any> {
    try {
      const token = await this.getAccessToken()
      const url = `${this.config.baseUrl}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }

      const response = await fetch(url, {
        method: "GET",
        headers,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Status check failed:", errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const responseText = await response.text()
      console.log("Transaction status response:", responseText)

      return JSON.parse(responseText)
    } catch (error) {
      console.error("PesaPal Status Check Error:", error)
      throw error
    }
  }
}

export const pesapalService = new PesaPalService()
