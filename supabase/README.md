
# Supabase Database Setup

This folder contains the SQL migrations needed to set up the database tables for the EnergyMaster application.

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Open the `create_tables.sql` file from this directory
4. Copy the entire SQL code
5. Paste it into the SQL Editor in Supabase
6. Click "Run" to execute the SQL commands

This will create the following tables:
- `devices` - For storing user devices and their energy consumption data
- `goals` - For storing user energy saving goals and progress
- `tips` - For storing energy saving tips and advice

Each table has appropriate Row Level Security (RLS) policies to ensure users can only access their own data.

## Table Relationships

- `devices` and `goals` tables have a foreign key relationship with the `auth.users` table
- When a user is deleted, all their devices and goals will be automatically deleted (CASCADE)

## Notes

- The `tips` table does not have RLS enabled as it contains public information
- Initial data for tips has been pre-populated
