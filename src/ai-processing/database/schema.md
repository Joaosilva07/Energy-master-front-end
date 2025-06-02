
# Database Schema Documentation

This document outlines the database schema used in the energy monitoring application. The application uses Supabase (PostgreSQL) as the backend database.

## Tables

### devices

Stores information about user energy devices.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, automatically generated |
| name | TEXT | Device name |
| type | TEXT | Device type (e.g., ac, tv, light) |
| consumption | INTEGER | Power consumption in watts |
| status | TEXT | Current status (online, offline) |
| lastActivity | TEXT | Last activity timestamp or human-readable value |
| powerState | BOOLEAN | Whether the device is powered on (true) or off (false) |
| location | TEXT | Optional room/location of the device |
| user_id | UUID | Foreign key to auth.users table |
| created_at | TIMESTAMPTZ | Creation timestamp, automatically generated |

### goals

Stores user energy-saving goals.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, automatically generated |
| title | TEXT | Goal title |
| description | TEXT | Goal description |
| progress | INTEGER | Current progress (0-100) |
| status | TEXT | Status (e.g., in-progress, completed) |
| statusColor | TEXT | CSS color for the status |
| iconType | TEXT | Icon identifier |
| iconBg | TEXT | Background color for the icon |
| target | INTEGER | Optional target value |
| targetDate | TEXT | Optional target date |
| type | TEXT | Optional goal type |
| user_id | UUID | Foreign key to auth.users table |
| created_at | TIMESTAMPTZ | Creation timestamp, automatically generated |

### tips

Stores energy-saving tips shown to users.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, automatically generated |
| title | TEXT | Tip title |
| description | TEXT | Tip description |
| icon | TEXT | Icon identifier |
| savings | TEXT | Optional estimated savings |
| category | TEXT | Tip category |
| featured | BOOLEAN | Whether this is a featured tip |
| created_at | TIMESTAMPTZ | Creation timestamp, automatically generated |

## AI-Related Tables (Future Implementation)

To support the AI features of the application, the following tables are proposed:

### consumption_history

Stores historical energy consumption data for analysis.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| device_id | UUID | Foreign key to devices table |
| timestamp | TIMESTAMPTZ | When this consumption was recorded |
| consumption | NUMERIC | Energy consumption value |
| user_id | UUID | Foreign key to auth.users table |

### ai_insights

Stores AI-generated insights about energy consumption.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| type | TEXT | Insight type (warning, info, success, critical) |
| title | TEXT | Insight title |
| description | TEXT | Detailed description |
| device_id | UUID | Optional foreign key to devices table |
| confidence | NUMERIC | Confidence score (0-1) |
| source | TEXT | How this insight was generated (rule-based, ai-prediction) |
| timestamp | TIMESTAMPTZ | When this insight was generated |
| user_id | UUID | Foreign key to auth.users table |
| actions | JSONB | Recommended actions |

### optimization_plans

Stores AI-generated plans for optimizing energy usage.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Plan name |
| description | TEXT | Plan description |
| estimated_savings | NUMERIC | Estimated energy savings |
| schedule_type | TEXT | When to execute (immediate, scheduled, recurring) |
| schedule_config | JSONB | Configuration for scheduling |
| user_id | UUID | Foreign key to auth.users table |
| created_at | TIMESTAMPTZ | When this plan was created |
| active | BOOLEAN | Whether this plan is currently active |

### optimization_actions

Stores individual device actions within optimization plans.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| plan_id | UUID | Foreign key to optimization_plans table |
| device_id | UUID | Foreign key to devices table |
| action | TEXT | Action to take (turn_off, reduce_power, etc.) |
| parameters | JSONB | Parameters for the action |
| estimated_impact | NUMERIC | Estimated impact of this action |
| executed | BOOLEAN | Whether this action has been executed |
| executed_at | TIMESTAMPTZ | When this action was executed |

## Security

Row-level security (RLS) policies are implemented on all tables to ensure users can only access their own data.

### Example RLS Policy for devices table

```sql
CREATE POLICY "Usuários podem ver seus próprios dispositivos"
  ON devices
  FOR SELECT
  USING (auth.uid() = user_id);
```

Similar policies are implemented for INSERT, UPDATE, and DELETE operations on all user-specific tables.

## Indexes

To optimize query performance, the following indexes are recommended:

```sql
-- Index on user_id for faster lookups of user data
CREATE INDEX devices_user_id_idx ON devices(user_id);
CREATE INDEX goals_user_id_idx ON goals(user_id);

-- Index on device consumption for analytical queries
CREATE INDEX devices_consumption_idx ON devices(consumption);

-- Index on device type for filtering
CREATE INDEX devices_type_idx ON devices(type);
```

## Migration Path

As the AI features are implemented, we'll need to run the following migrations:

1. Create the new tables (consumption_history, ai_insights, optimization_plans, optimization_actions)
2. Add appropriate RLS policies to these tables
3. Create necessary indexes
4. Potentially add additional columns to existing tables as AI feature requirements evolve
