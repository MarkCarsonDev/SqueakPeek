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
          created_at: string
          link: string | null
          location: string | null
          opportunity_id: string
          profile_id: string
          status: Database["public"]["Enums"]["ApplicationStatus"] | null
        }
        Insert: {
          application_id?: string
          created_at?: string
          link?: string | null
          location?: string | null
          opportunity_id: string
          profile_id: string
          status?: Database["public"]["Enums"]["ApplicationStatus"] | null
        }
        Update: {
          application_id?: string
          created_at?: string
          link?: string | null
          location?: string | null
          opportunity_id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["ApplicationStatus"] | null
        }
        Relationships: [
          {
            foreignKeyName: "application_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: true
            referencedRelation: "opportunity"
            referencedColumns: ["opportunity_id"]
          },
          {
            foreignKeyName: "application_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      bookmark: {
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
            isOneToOne: true
            referencedRelation: "opportunity"
            referencedColumns: ["opportunity_id"]
          },
          {
            foreignKeyName: "bookmark_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      conversation: {
        Row: {
          conversation_id: string
          created_at: string
          opportunity_id: string | null
        }
        Insert: {
          conversation_id?: string
          created_at?: string
          opportunity_id?: string | null
        }
        Update: {
          conversation_id?: string
          created_at?: string
          opportunity_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_opportunity_id_fkey"
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
          opportunity_id: string
          role_title: Database["public"]["Enums"]["OpportunityType"]
          type: string
        }
        Insert: {
          company_name: string
          created_at?: string
          opportunity_id?: string
          role_title: Database["public"]["Enums"]["OpportunityType"]
          type: string
        }
        Update: {
          company_name?: string
          created_at?: string
          opportunity_id?: string
          role_title?: Database["public"]["Enums"]["OpportunityType"]
          type?: string
        }
        Relationships: []
      }
      private_message: {
        Row: {
          created_at: string
          message: string | null
          message_id: string
          thread_id: string
        }
        Insert: {
          created_at?: string
          message?: string | null
          message_id?: string
          thread_id: string
        }
        Update: {
          created_at?: string
          message?: string | null
          message_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_message_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: true
            referencedRelation: "private_user_conversation"
            referencedColumns: ["thread_id"]
          },
        ]
      }
      private_user_conversation: {
        Row: {
          conversation_id: string
          created_at: string
          reciever_id: string
          sender_id: string
          thread_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          reciever_id: string
          sender_id: string
          thread_id?: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          reciever_id?: string
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_user_conversation_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: true
            referencedRelation: "conversation"
            referencedColumns: ["conversation_id"]
          },
          {
            foreignKeyName: "private_user_conversation_reciever_id_fkey"
            columns: ["reciever_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "private_user_conversation_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profile: {
        Row: {
          avatar: string | null
          created_at: string
          profile_id: string
          school: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          profile_id?: string
          school?: string | null
          user_id?: string
          username?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          profile_id?: string
          school?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      public_message: {
        Row: {
          created_at: string
          message: string | null
          message_id: string
          thread_id: string
        }
        Insert: {
          created_at?: string
          message?: string | null
          message_id?: string
          thread_id: string
        }
        Update: {
          created_at?: string
          message?: string | null
          message_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_message_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: true
            referencedRelation: "public_user_conversation"
            referencedColumns: ["thread_id"]
          },
        ]
      }
      public_user_conversation: {
        Row: {
          conversation_id: string
          created_at: string
          reciever_id: string
          sender_id: string
          thread_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          reciever_id: string
          sender_id: string
          thread_id?: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          reciever_id?: string
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_conversation_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: true
            referencedRelation: "conversation"
            referencedColumns: ["conversation_id"]
          },
          {
            foreignKeyName: "public_user_conversation_reciever_id_fkey"
            columns: ["reciever_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "public_user_conversation_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
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
      Avatar: "1" | "2" | "3" | "4"
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
