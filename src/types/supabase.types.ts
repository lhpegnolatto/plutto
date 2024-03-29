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
          ended_at: string | null;
          frequency: Database["public"]["Enums"]["frequency"] | null;
          id: string;
          installments: number | null;
          payment_method_id: string | null;
          purpose: Database["public"]["Enums"]["purpose"];
          recurrence: Database["public"]["Enums"]["recurrence"];
          transacted_at: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          amount: number;
          category_id: string;
          created_at?: string | null;
          description: string;
          ended_at?: string | null;
          frequency?: Database["public"]["Enums"]["frequency"] | null;
          id?: string;
          installments?: number | null;
          payment_method_id?: string | null;
          purpose: Database["public"]["Enums"]["purpose"];
          recurrence: Database["public"]["Enums"]["recurrence"];
          transacted_at: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          amount?: number;
          category_id?: string;
          created_at?: string | null;
          description?: string;
          ended_at?: string | null;
          frequency?: Database["public"]["Enums"]["frequency"] | null;
          id?: string;
          installments?: number | null;
          payment_method_id?: string | null;
          purpose?: Database["public"]["Enums"]["purpose"];
          recurrence?: Database["public"]["Enums"]["recurrence"];
          transacted_at?: string;
          updated_at?: string | null;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      frequency_to_interval: {
        Args: {
          frequency: Database["public"]["Enums"]["frequency"];
        };
        Returns: unknown;
      };
      transactions_filters: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: Database["public"]["CompositeTypes"]["extended_transactions"][];
      };
      transactions_summary_categories: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: Json;
      };
      transactions_summary_purposes: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: Json;
      };
      transactions_summary_purposes_per_day: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: Json;
      };
      transactions_summary_recurrence: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      frequency: "daily" | "weekly" | "monthly" | "yearly";
      purpose: "revenue" | "expense";
      recurrence: "unique" | "installment_based" | "fixed_periodic";
    };
    CompositeTypes: {
      extended_transactions: {
        id: string;
        description: string;
        purpose: Database["public"]["Enums"]["purpose"];
        amount: number;
        transacted_at: string;
        created_at: string;
        updated_at: string;
        user_id: string;
        installments: number;
        frequency: Database["public"]["Enums"]["frequency"];
        recurrence: Database["public"]["Enums"]["recurrence"];
        ended_at: string;
        category_id: string;
        category_title: string;
        category_color: string;
        payment_method_id: string;
        payment_method_title: string;
        payment_method_color: string;
        installment_label: string;
        occurred_at: string;
      };
    };
  };
}
