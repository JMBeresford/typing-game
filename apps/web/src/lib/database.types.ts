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
          accuracy: number
          created_at?: string
          enemies_killed?: number
          id?: string
          score?: number
          time_elapsed_ms?: number
          times_hit?: number
          user_id?: string | null
          waves_completed?: number
          words_per_minute: number
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
          accuracy_avg: number
          email: string | null
          enemies_killed_total: number
          id: string
          score_total: number
          username: string | null
          waves_completed_total: number
          words_per_minute_avg: number
        }
        Insert: {
          accuracy_avg?: number
          email?: string | null
          enemies_killed_total?: number
          id: string
          score_total?: number
          username?: string | null
          waves_completed_total?: number
          words_per_minute_avg?: number
        }
        Update: {
          accuracy_avg?: number
          email?: string | null
          enemies_killed_total?: number
          id?: string
          score_total?: number
          username?: string | null
          waves_completed_total?: number
          words_per_minute_avg?: number
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
      citext:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": boolean
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      citext_hash: {
        Args: {
          "": string
        }
        Returns: number
      }
      citextin: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      citextout: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      citextrecv: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      citextsend: {
        Args: {
          "": string
        }
        Returns: string
      }
      update_profile_accuracy_avg: {
        Args: {
          inserted_user_id: string
        }
        Returns: undefined
      }
      update_profile_kills_total: {
        Args: {
          inserted_user_id: string
        }
        Returns: undefined
      }
      update_profile_score_total: {
        Args: {
          inserted_user_id: string
        }
        Returns: undefined
      }
      update_profile_waves_total: {
        Args: {
          inserted_user_id: string
        }
        Returns: undefined
      }
      update_profile_wpm_avg: {
        Args: {
          inserted_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
