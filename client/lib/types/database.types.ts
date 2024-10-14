export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      application: {
        Row: {
          application_id: number
          created_at: string
          link: string | null
          location: string | null
          opportunity_id: number
          profile_id: number
          status: string | null
        }
        Insert: {
          application_id?: number
          created_at?: string
          link?: string | null
          location?: string | null
          opportunity_id: number
          profile_id: number
          status?: string | null
        }
        Update: {
          application_id?: number
          created_at?: string
          link?: string | null
          location?: string | null
          opportunity_id?: number
          profile_id?: number
          status?: string | null
        }
        Relationships: []
      }
      conversation: {
        Row: {
          conversation_id: number
          created_at: string
          opportunity_id: number | null
        }
        Insert: {
          conversation_id?: number
          created_at?: string
          opportunity_id?: number | null
        }
        Update: {
          conversation_id?: number
          created_at?: string
          opportunity_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: true
            referencedRelation: "private_user_conversation"
            referencedColumns: ["conversation_id"]
          },
          {
            foreignKeyName: "conversation_conversation_id_fkey1"
            columns: ["conversation_id"]
            isOneToOne: true
            referencedRelation: "public_user_conversation"
            referencedColumns: ["conversation_id"]
          },
        ]
      }
      opportunity: {
        Row: {
          company_name: string
          created_at: string
          opportunity_id: number
          role_title: string
          type: string
        }
        Insert: {
          company_name: string
          created_at?: string
          opportunity_id?: number
          role_title: string
          type: string
        }
        Update: {
          company_name?: string
          created_at?: string
          opportunity_id?: number
          role_title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_id_fkey1"
            columns: ["opportunity_id"]
            isOneToOne: true
            referencedRelation: "application"
            referencedColumns: ["opportunity_id"]
          },
          {
            foreignKeyName: "opportunity_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: true
            referencedRelation: "conversation"
            referencedColumns: ["opportunity_id"]
          },
        ]
      }
      private_message: {
        Row: {
          created_at: string
          message_id: number
          thread_id: number
        }
        Insert: {
          created_at?: string
          message_id?: number
          thread_id: number
        }
        Update: {
          created_at?: string
          message_id?: number
          thread_id?: number
        }
        Relationships: []
      }
      private_user_conversation: {
        Row: {
          conversation_id: number
          created_at: string
          reciever_id: number
          sender_id: number
          thread_id: number
        }
        Insert: {
          conversation_id: number
          created_at?: string
          reciever_id: number
          sender_id: number
          thread_id?: number
        }
        Update: {
          conversation_id?: number
          created_at?: string
          reciever_id?: number
          sender_id?: number
          thread_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "private_thread_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: true
            referencedRelation: "private_message"
            referencedColumns: ["thread_id"]
          },
        ]
      }
      profile: {
        Row: {
          avatar: string | null
          created_at: string
          profile_id: number
          school: string | null
          user_id: number
          username: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          profile_id?: number
          school?: string | null
          user_id: number
          username: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          profile_id?: number
          school?: string | null
          user_id?: number
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "application"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "profile_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "public_user_conversation"
            referencedColumns: ["sender_id"]
          },
          {
            foreignKeyName: "profile_profile_id_fkey1"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "private_user_conversation"
            referencedColumns: ["sender_id"]
          },
          {
            foreignKeyName: "profile_profile_id_fkey2"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "private_user_conversation"
            referencedColumns: ["reciever_id"]
          },
          {
            foreignKeyName: "profile_profile_id_fkey3"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "public_user_conversation"
            referencedColumns: ["reciever_id"]
          },
        ]
      }
      public_message: {
        Row: {
          created_at: string
          message_id: number
          thread_id: number
        }
        Insert: {
          created_at?: string
          message_id?: number
          thread_id: number
        }
        Update: {
          created_at?: string
          message_id?: number
          thread_id?: number
        }
        Relationships: []
      }
      public_user_conversation: {
        Row: {
          conversation_id: number
          created_at: string
          reciever_id: number
          sender_id: number
          thread_id: number
        }
        Insert: {
          conversation_id: number
          created_at?: string
          reciever_id: number
          sender_id: number
          thread_id?: number
        }
        Update: {
          conversation_id?: number
          created_at?: string
          reciever_id?: number
          sender_id?: number
          thread_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_thread_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: true
            referencedRelation: "public_message"
            referencedColumns: ["thread_id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          first_name: string
          last_name: string
          password: string
          user_id: number
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          last_name: string
          password: string
          user_id?: number
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          last_name?: string
          password?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
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
      ApplicationStatus:
        | "Initial Screen"
        | "Rejected"
        | "Online Assessment"
        | "Interviewing"
        | "Offer"
      OpportunityType: "Internship" | "New Grad" | "Co-Op"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
