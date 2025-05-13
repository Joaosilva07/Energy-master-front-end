
import { createClient } from '@supabase/supabase-js';

// Set default values for development - these are placeholder values and won't work
// You'll need to replace these with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Show warning if using default values
if (supabaseUrl === 'https://example.supabase.co' || supabaseAnonKey === 'your-anon-key') {
  console.warn(
    'Using placeholder Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
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
