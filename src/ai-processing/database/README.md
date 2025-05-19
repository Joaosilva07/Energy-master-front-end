
# AI Energy Database Documentation

This directory contains the database schema and related files for the AI energy analysis features of the application.

## Migration Files

- `ai_features_migration.sql` - SQL migration script to create the AI-related tables, RLS policies, and indexes.
- `executeMigration.ts` - TypeScript utility to execute the migration (for documentation purposes).

## AI Database Tables

The AI features use the following tables:

1. **consumption_history** - Stores historical energy consumption data for analysis
2. **ai_insights** - Stores AI-generated insights about energy consumption
3. **optimization_plans** - Stores AI-generated plans for optimizing energy usage
4. **optimization_actions** - Stores individual device actions within optimization plans

## How to Run the Migration

**Important:** The migration should be run manually in the Supabase SQL Editor.

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `ai_features_migration.sql`
4. Paste and execute in the SQL Editor

## Security Considerations

All tables implement Row-Level Security (RLS) policies to ensure users can only access their own data. This is critical for maintaining data privacy in a multi-tenant application.

## Indexing Strategy

Indexes have been created on frequently queried columns to improve performance:
- User ID columns for filtering by user
- Device ID columns for filtering by device
- Timestamp columns for time-based queries
- Foreign key columns for join operations

## Data Relationships

- Each consumption record is linked to a specific device and user
- Insights can be linked to specific devices (optional)
- Optimization plans belong to users
- Optimization actions are linked to specific plans and devices
