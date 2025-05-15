export interface Job {
  id: number
  title: string
  department: string
  description: string
  requirements: string
  salary_range: string
  location: string
  created_at: string
}

export interface JobApplication {
  id?: number
  job_id: number
  user_id?: string
  full_name: string
  email: string
  phone: string
  resume_url?: string
  cover_letter?: string
  experience_years: number
  status?: string
  created_at?: string
}
