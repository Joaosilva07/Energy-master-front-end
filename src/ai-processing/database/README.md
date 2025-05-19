
# AI Energy Database Documentation

This directory contains the database schema and related files for the AI energy analysis features of the application.

## Files in this directory

- `schema.md` - Comprehensive documentation of the database schema, including tables, columns, relationships, and security policies.
- `migrations.sql` - SQL migration scripts to create and set up the database schema in Supabase.

## Database Architecture

The database is designed to support both the current functionality and future AI-driven energy analysis features. It consists of:

1. **Core Tables** - For storing devices, goals, and tips
2. **AI Analysis Tables** - For storing consumption history, AI insights, and optimization plans

## Connecting to Supabase

To use this schema with Supabase:

1. Create a new Supabase project
2. Connect your application to Supabase using the integration feature
3. Execute the SQL scripts in the SQL editor in the Supabase dashboard
4. Set up appropriate environment variables

## Row-Level Security (RLS)

All tables implement Row-Level Security to ensure users can only access their own data. This is critical for maintaining data privacy and security in a multi-tenant application.

## Future Enhancements

As the AI features evolve, the database schema may need to be extended to support:

- More detailed consumption patterns
- Device-specific optimization strategies
- User preference tracking for better recommendations
- Integration with external energy data sources
