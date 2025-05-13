
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          created_at?: string;
        };
      };
      devices: {
        Row: {
          id: string;
          name: string;
          type: string;
          consumption: number;
          status: string;
          lastActivity: string;
          powerState: boolean;
          location: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          consumption: number;
          status: string;
          lastActivity: string;
          powerState: boolean;
          location?: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          consumption?: number;
          status?: string;
          lastActivity?: string;
          powerState?: boolean;
          location?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      goals: {
        Row: {
          id: string;
          title: string;
          description: string;
          progress: number;
          status: string;
          statusColor: string;
          iconType: string;
          iconBg: string;
          target: number;
          targetDate: string;
          type: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          progress: number;
          status: string;
          statusColor: string;
          iconType: string;
          iconBg: string;
          target?: number;
          targetDate?: string;
          type?: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          progress?: number;
          status?: string;
          statusColor?: string;
          iconType?: string;
          iconBg?: string;
          target?: number;
          targetDate?: string;
          type?: string;
          user_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
