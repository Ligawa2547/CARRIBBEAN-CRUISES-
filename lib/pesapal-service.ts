import crypto from "crypto"

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

  private generateSignature(method: string, url: string, params: Record<string, any> = {}): string {
    const timestamp = Math.floor(Date.now() / 1000)
    const nonce = crypto.randomBytes(16).toString("hex")

    const baseString = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(
      Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join("&"),
    )}`

    const signingKey = `${encodeURIComponent(this.config.consumerSecret)}&`
    const signature = crypto.createHmac("sha1", signingKey).update(baseString).digest("base64")

    return `OAuth oauth_consumer_key="${this.config.consumerKey}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_signature="${encodeURIComponent(signature)}"`
  }

  async getAccessToken(): Promise<string> {
    try {
      const url = `${this.config.baseUrl}/Auth/RequestToken`
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.generateSignature("POST", url),
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
