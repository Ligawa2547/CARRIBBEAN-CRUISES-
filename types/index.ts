export interface Job {
  id: number
  title: string
  description: string
  department: string
  location: string
  salary_range?: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  employment_type: "full-time" | "part-time" | "contract" | "temporary"
  experience_level: "entry" | "mid" | "senior" | "executive"
  featured?: boolean
  created_at: string
  updated_at: string
  application_deadline?: string
  contact_email?: string
  external_url?: string
}

export interface Application {
  id: number
  job_id: number
  user_id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  cover_letter?: string
  resume_url?: string
  additional_documents?: string[]
  status: "pending" | "reviewing" | "interviewed" | "accepted" | "rejected"
  created_at: string
  updated_at: string
  notes?: string
}

export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "read" | "responded" | "closed"
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface SavedJob {
  id: number
  user_id: string
  job_id: number
  created_at: string
}

export interface Notification {
  id: number
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  created_at: string
}

export interface CruisePackage {
  id: number
  name: string
  description: string
  duration: string
  price: number
  image_url: string
  destinations: string[]
  amenities: string[]
  cruise_line: string
  departure_dates: string[]
  max_capacity: number
  available_spots: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: number
  user_id?: string
  cruise_id: number
  guest_name: string
  guest_email: string
  guest_phone: string
  number_of_guests: number
  departure_date: string
  total_amount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  payment_status: "pending" | "paid" | "failed" | "refunded"
  special_requests?: string
  created_at: string
  updated_at: string
}
