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
          id: string;
          title: string;
          color: string;
          user_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          color: string;
          user_id?: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          color?: string;
          user_id?: string;
          created_at?: string | null;
        };
      };
      scheduled_transactions: {
        Row: {
          created_at: string | null;
          updated_at: string | null;
          title: string;
          amount: number;
          due_day: number;
          first_due_at: string;
          installments: number | null;
          user_id?: string | null;
          id: string;
          category_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          updated_at?: string | null;
          title: string;
          amount: number;
          due_day: number;
          first_due_at: string;
          installments?: number | null;
          user_id?: string | null;
          id?: string;
          category_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          updated_at?: string | null;
          title?: string;
          amount?: number;
          due_day?: number;
          first_due_at?: string;
          installments?: number | null;
          user_id?: string | null;
          id?: string;
          category_id?: string | null;
        };
      };
      transactions: {
        Row: {
          id: string;
          title: string;
          type: string;
          amount: number;
          transacted_at: string;
          created_at: string | null;
          updated_at: string | null;
          user_id: string;
          category_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          type: string;
          amount: number;
          transacted_at: string;
          created_at?: string | null;
          updated_at?: string | null;
          user_id?: string;
          category_id: string;
        };
        Update: {
          id?: string;
          title?: string;
          type?: string;
          amount?: number;
          transacted_at?: string;
          created_at?: string | null;
          updated_at?: string | null;
          user_id?: string;
          category_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
