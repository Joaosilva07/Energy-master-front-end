
/**
 * TypeScript types that mirror the database schema
 * These types should be kept in sync with the actual database structure
 */

import { Device } from '@/types/device.types';
import { ConsumptionInsight, OptimizationPlan, OptimizationDeviceAction } from '@/types/energyAnalysis.types';

/**
 * Database types for Supabase tables
 */
export interface DbTables {
  devices: {
    Row: Device & {
      created_at: string;
    };
    Insert: Omit<Device, 'id'> & {
      id?: string;
      created_at?: string;
    };
    Update: Partial<Omit<Device, 'id'>> & {
      id?: string;
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
      target: number | null;
      targetDate: string | null;
      type: string | null;
      user_id: string;
      created_at: string;
    };
    Insert: Omit<DbTables['goals']['Row'], 'id' | 'created_at'> & {
      id?: string;
      created_at?: string;
    };
    Update: Partial<Omit<DbTables['goals']['Row'], 'id' | 'created_at'>> & {
      id?: string;
      created_at?: string;
    };
  };

  tips: {
    Row: {
      id: string;
      title: string;
      description: string;
      icon: string;
      savings: string | null;
      category: string;
      featured: boolean;
      created_at: string;
    };
    Insert: Omit<DbTables['tips']['Row'], 'id' | 'created_at' | 'featured'> & {
      id?: string;
      created_at?: string;
      featured?: boolean;
    };
    Update: Partial<Omit<DbTables['tips']['Row'], 'id' | 'created_at'>> & {
      id?: string;
      created_at?: string;
    };
  };

  // AI Feature Tables

  consumption_history: {
    Row: {
      id: string;
      device_id: string;
      timestamp: string;
      consumption: number;
      user_id: string;
    };
    Insert: Omit<DbTables['consumption_history']['Row'], 'id' | 'timestamp'> & {
      id?: string;
      timestamp?: string;
    };
    Update: Partial<Omit<DbTables['consumption_history']['Row'], 'id'>> & {
      id?: string;
    };
  };

  ai_insights: {
    Row: {
      id: string;
      type: string;
      title: string;
      description: string;
      device_id: string | null;
      confidence: number | null;
      source: string;
      timestamp: string;
      user_id: string;
      actions: any | null;
    };
    Insert: Omit<ConsumptionInsight, 'actions'> & {
      id?: string;
      user_id: string;
      timestamp?: string;
      actions?: any;
    };
    Update: Partial<Omit<DbTables['ai_insights']['Row'], 'id'>> & {
      id?: string;
    };
  };

  optimization_plans: {
    Row: {
      id: string;
      name: string;
      description: string;
      estimated_savings: number;
      schedule_type: string;
      schedule_config: any | null;
      user_id: string;
      created_at: string;
      active: boolean;
    };
    Insert: Omit<OptimizationPlan, 'devices' | 'scheduleConfig'> & {
      id?: string;
      user_id: string;
      created_at?: string;
      schedule_config?: any;
    };
    Update: Partial<Omit<DbTables['optimization_plans']['Row'], 'id'>> & {
      id?: string;
    };
  };

  optimization_actions: {
    Row: {
      id: string;
      plan_id: string;
      device_id: string;
      action: string;
      parameters: any | null;
      estimated_impact: number;
      executed: boolean;
      executed_at: string | null;
    };
    Insert: Omit<OptimizationDeviceAction, 'deviceName'> & {
      id?: string;
      plan_id: string;
      executed?: boolean;
      executed_at?: string | null;
    };
    Update: Partial<Omit<DbTables['optimization_actions']['Row'], 'id'>> & {
      id?: string;
    };
  };
}

/**
 * Database schema definition for type-safe access
 */
export interface Database {
  public: {
    Tables: DbTables;
  };
}
