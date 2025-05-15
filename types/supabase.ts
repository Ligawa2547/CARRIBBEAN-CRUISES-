export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          email: string
          experience_years: number
          full_name: string
          id: number
          job_id: number
          phone: string
          resume_url: string | null
          status: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          email: string
          experience_years: number
          full_name: string
          id?: number
          job_id: number
          phone: string
          resume_url?: string | null
          status?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          email: string
          experience_years: number
          full_name: string
          id?: number
          job_id: number
          phone: string
          resume_url?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: number
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string | null
          email: string
          id?: number
          message: string
          name: string
          subject: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string | null
          department: string
          description: string
          id: number
          location: string
          requirements: string
          salary_range: string
          title: string
        }
        Insert: {
          created_at?: string | null
          department: string
          description: string
          id?: number
          location: string
          requirements: string
          salary_range: string
          title: string
        }
        Update: {
          created_at?: string | null
          department: string
          description: string
          id?: number
          location: string
          requirements: string
          salary_range: string
          title: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
