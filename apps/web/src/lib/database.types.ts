export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games_played: {
        Row: {
          accuracy: number
          created_at: string
          enemies_killed: number
          id: string
          score: number
          time_elapsed_ms: number
          times_hit: number
          user_id: string | null
          waves_completed: number
          words_per_minute: number
        }
        Insert: {
          accuracy?: number
          created_at?: string
          enemies_killed?: number
          id?: string
          score?: number
          time_elapsed_ms?: number
          times_hit?: number
          user_id?: string | null
          waves_completed?: number
          words_per_minute?: number
        }
        Update: {
          accuracy?: number
          created_at?: string
          enemies_killed?: number
          id?: string
          score?: number
          time_elapsed_ms?: number
          times_hit?: number
          user_id?: string | null
          waves_completed?: number
          words_per_minute?: number
        }
        Relationships: [
          {
            foreignKeyName: "games_played_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
