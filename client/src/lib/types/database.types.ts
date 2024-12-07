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
          application_id: string
          company_name: string
          created_at: string
          currentScore: number | null
          interviewing_round: string | null
          link: string | null
          location: string | null
          opportunity_id: string
          order: number | null
          outOfScore: number | null
          profile_id: string
          role_title: string
          status: Database["public"]["Enums"]["ApplicationStatus"]
          status_update_date: string | null
          test_provider: string | null
          type: string
        }
        Insert: {
          application_id?: string
          company_name: string
          created_at: string
          currentScore?: number | null
          interviewing_round?: string | null
          link?: string | null
          location?: string | null
          opportunity_id: string
          order?: number | null
          outOfScore?: number | null
          profile_id: string
          role_title: string
          status?: Database["public"]["Enums"]["ApplicationStatus"]
          status_update_date?: string | null
          test_provider?: string | null
          type: string
        }
        Update: {
          application_id?: string
          company_name?: string
          created_at?: string
          currentScore?: number | null
          interviewing_round?: string | null
          link?: string | null
          location?: string | null
          opportunity_id?: string
          order?: number | null
          outOfScore?: number | null
          profile_id?: string
          role_title?: string
          status?: Database["public"]["Enums"]["ApplicationStatus"]
          status_update_date?: string | null
          test_provider?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunity"
            referencedColumns: ["opportunity_id"]
          },
          {
            foreignKeyName: "application_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      bookmark_opportunity: {
        Row: {
          bookmark_id: string
          created_at: string
          opportunity_id: string
          profile_id: string
        }
        Insert: {
          bookmark_id?: string
          created_at?: string
          opportunity_id: string
          profile_id: string
        }
        Update: {
          bookmark_id?: string
          created_at?: string
          opportunity_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunity"
            referencedColumns: ["opportunity_id"]
          },
          {
            foreignKeyName: "bookmark_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      company_thread: {
        Row: {
          created_at: string
          opportunity_id: string
          thread_id: string
        }
        Insert: {
          created_at?: string
          opportunity_id: string
          thread_id?: string
        }
        Update: {
          created_at?: string
          opportunity_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_conversation_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: true
            referencedRelation: "opportunity"
            referencedColumns: ["opportunity_id"]
          },
        ]
      }
      opportunity: {
        Row: {
          company_name: string
          created_at: string
          hiring: boolean | null
          opportunity_id: string
          role_title: string
          type: Database["public"]["Enums"]["OpportunityType"]
        }
        Insert: {
          company_name: string
          created_at?: string
          hiring?: boolean | null
          opportunity_id?: string
          role_title: string
          type: Database["public"]["Enums"]["OpportunityType"]
        }
        Update: {
          company_name?: string
          created_at?: string
          hiring?: boolean | null
          opportunity_id?: string
          role_title?: string
          type?: Database["public"]["Enums"]["OpportunityType"]
        }
        Relationships: []
      }
      opportunity_tracking: {
        Row: {
          applied: number | null
          created_at: string
          interviewing: number | null
          month: number | null
          offer: number | null
          online_assessment: number | null
          opportunity_id: string
          rejected: number | null
          total_applied: number | null
          tracking_id: number
        }
        Insert: {
          applied?: number | null
          created_at?: string
          interviewing?: number | null
          month?: number | null
          offer?: number | null
          online_assessment?: number | null
          opportunity_id?: string
          rejected?: number | null
          total_applied?: number | null
          tracking_id?: number
        }
        Update: {
          applied?: number | null
          created_at?: string
          interviewing?: number | null
          month?: number | null
          offer?: number | null
          online_assessment?: number | null
          opportunity_id?: string
          rejected?: number | null
          total_applied?: number | null
          tracking_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_tracking_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunity"
            referencedColumns: ["opportunity_id"]
          },
        ]
      }
      private_conversation: {
        Row: {
          conversation_id: string
        }
        Insert: {
          conversation_id?: string
        }
        Update: {
          conversation_id?: string
        }
        Relationships: []
      }
      private_message: {
        Row: {
          conversation_id: string
          created_at: string
          message: string
          message_id: string
          sender_avatar: Database["public"]["Enums"]["Avatar"]
          sender_id: string
          sender_username: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          message?: string
          message_id?: string
          sender_avatar: Database["public"]["Enums"]["Avatar"]
          sender_id: string
          sender_username: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          message?: string
          message_id?: string
          sender_avatar?: Database["public"]["Enums"]["Avatar"]
          sender_id?: string
          sender_username?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_message_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "private_conversation"
            referencedColumns: ["conversation_id"]
          },
        ]
      }
      private_user_conversation: {
        Row: {
          conversation_id: string
          created_at: string
          is_read: boolean
          receiver_id: string
          sender_id: string
          thread_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          is_read?: boolean
          receiver_id: string
          sender_id: string
          thread_id?: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          is_read?: boolean
          receiver_id?: string
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_user_conversation_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "private_conversation"
            referencedColumns: ["conversation_id"]
          },
          {
            foreignKeyName: "private_user_conversation_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "private_user_conversation_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profile: {
        Row: {
          avatar: Database["public"]["Enums"]["Avatar"]
          created_at: string
          profile_id: string
          school: string | null
          user_id: string
          username: string
        }
        Insert: {
          avatar: Database["public"]["Enums"]["Avatar"]
          created_at?: string
          profile_id?: string
          school?: string | null
          user_id?: string
          username: string
        }
        Update: {
          avatar?: Database["public"]["Enums"]["Avatar"]
          created_at?: string
          profile_id?: string
          school?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      public_message: {
        Row: {
          created_at: string
          message: string
          message_id: string
          sender_avatar: Database["public"]["Enums"]["Avatar"]
          sender_id: string
          sender_username: string
          thread_id: string | null
        }
        Insert: {
          created_at?: string
          message: string
          message_id?: string
          sender_avatar?: Database["public"]["Enums"]["Avatar"]
          sender_id: string
          sender_username: string
          thread_id?: string | null
        }
        Update: {
          created_at?: string
          message?: string
          message_id?: string
          sender_avatar?: Database["public"]["Enums"]["Avatar"]
          sender_id?: string
          sender_username?: string
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_message_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "company_thread"
            referencedColumns: ["thread_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_private_conversation: {
        Args: {
          sender_id: string
          receiver_id: string
        }
        Returns: string
      }
    }
    Enums: {
      ApplicationStatus:
        | "Applied"
        | "Rejected"
        | "Online Assessment"
        | "Interviewing"
        | "Offer"
      Avatar: "avatar1" | "avatar2" | "avatar3" | "avatar4"
      OpportunityType:
        | "Internship"
        | "New Grad"
        | "Co-Op"
        | "Full-time"
        | "Part-Time"
        | "Contract"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
