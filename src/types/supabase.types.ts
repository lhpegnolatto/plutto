export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          color: string;
          created_at: string | null;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          color: string;
          created_at?: string | null;
          id?: string;
          title: string;
          user_id?: string;
        };
        Update: {
          color?: string;
          created_at?: string | null;
          id?: string;
          title?: string;
          user_id?: string;
        };
      };
      payment_methods: {
        Row: {
          color: string;
          created_at: string | null;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          color: string;
          created_at?: string | null;
          id?: string;
          title: string;
          user_id?: string;
        };
        Update: {
          color?: string;
          created_at?: string | null;
          id?: string;
          title?: string;
          user_id?: string;
        };
      };
      transactions: {
        Row: {
          amount: number;
          category_id: string;
          created_at: string | null;
          description: string;
          fixed_period: Database["public"]["Enums"]["fixed_period"] | null;
          id: string;
          installments: number | null;
          payment_method_id: string;
          repeat: Database["public"]["Enums"]["repeat"];
          transacted_at: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          amount: number;
          category_id: string;
          created_at?: string | null;
          description: string;
          fixed_period?: Database["public"]["Enums"]["fixed_period"] | null;
          id?: string;
          installments?: number | null;
          payment_method_id: string;
          repeat: Database["public"]["Enums"]["repeat"];
          transacted_at: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          amount?: number;
          category_id?: string;
          created_at?: string | null;
          description?: string;
          fixed_period?: Database["public"]["Enums"]["fixed_period"] | null;
          id?: string;
          installments?: number | null;
          payment_method_id?: string;
          repeat?: Database["public"]["Enums"]["repeat"];
          transacted_at?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updated_at?: string | null;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      transactions_summary: {
        Args: { start_date: string; end_date: string };
        Returns: Json;
      };
    };
    Enums: {
      fixed_period: "daily" | "weekly" | "monthly" | "yearly";
      repeat: "fixed" | "installment" | "single";
      transaction_type: "expense" | "earn";
    };
  };
}
