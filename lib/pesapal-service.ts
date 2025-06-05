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
      baseUrl: "https://cybqa.pesapal.com/pesapalv3/api", // Using sandbox for testing
    }

    if (!this.config.consumerKey || !this.config.consumerSecret) {
      console.error("PesaPal credentials not found in environment variables")
    }
  }

  async getAccessToken(): Promise<string> {
    try {
      const url = `${this.config.baseUrl}/Auth/RequestToken`

      console.log("Requesting PesaPal token with:", {
        consumer_key: this.config.consumerKey,
        url: url,
      })

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          consumer_key: this.config.consumerKey,
          consumer_secret: this.config.consumerSecret,
        }),
      })

      const responseText = await response.text()
      console.log("PesaPal token response:", responseText)

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse PesaPal response:", responseText)
        throw new Error("Invalid response from PesaPal")
      }

      if (data.token) {
        console.log("Successfully obtained PesaPal token")
        return data.token
      }

      console.error("PesaPal token error:", data)
      throw new Error(data.error || data.message || "Failed to get access token")
    } catch (error) {
      console.error("PesaPal Auth Error:", error)
      throw error
    }
  }

  async submitOrderRequest(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      console.log("Submitting order request:", paymentData)

      const token = await this.getAccessToken()
      const url = `${this.config.baseUrl}/Transactions/SubmitOrderRequest`

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }

      console.log("Making payment request to:", url)

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(paymentData),
      })

      const responseText = await response.text()
      console.log("PesaPal payment response:", responseText)

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse payment response:", responseText)
        throw new Error("Invalid payment response from PesaPal")
      }

      if (data.order_tracking_id && data.redirect_url) {
        console.log("Payment request successful:", data)
        return data
      }

      console.error("Payment request failed:", data)
      throw new Error(data.error || data.message || "Payment request failed")
    } catch (error) {
      console.error("PesaPal Payment Error:", error)
      throw error
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
