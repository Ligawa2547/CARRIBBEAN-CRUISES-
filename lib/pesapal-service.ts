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
      baseUrl:
        process.env.NODE_ENV === "production"
          ? "https://pay.pesapal.com/v3/api"
          : "https://cybqa.pesapal.com/pesapalv3/api",
    }
  }

  async getAccessToken(): Promise<string> {
    try {
      const url = `${this.config.baseUrl}/Auth/RequestToken`
      const headers = {
        "Content-Type": "application/json",
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          consumer_key: this.config.consumerKey,
          consumer_secret: this.config.consumerSecret,
        }),
      })

      const data = await response.json()

      if (data.token) {
        return data.token
      }

      throw new Error(data.error || "Failed to get access token")
    } catch (error) {
      console.error("PesaPal Auth Error:", error)
      throw error
    }
  }

  async submitOrderRequest(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const token = await this.getAccessToken()
      const url = `${this.config.baseUrl}/Transactions/SubmitOrderRequest`

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(paymentData),
      })

      const data = await response.json()
      return data
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
        Authorization: `Bearer ${token}`,
      }

      const response = await fetch(url, {
        method: "GET",
        headers,
      })

      return await response.json()
    } catch (error) {
      console.error("PesaPal Status Check Error:", error)
      throw error
    }
  }
}

export const pesapalService = new PesaPalService()
