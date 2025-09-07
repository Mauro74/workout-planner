# Supabase Database Setup for Workout Planner

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created (takes ~2 minutes)

## 2. Set Up Database Schema

### For New Databases:
1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the contents of `src/sql/schema.sql` into the editor
3. Click **Run** to create the tables and indexes

### For Existing Databases (Migration):
If you already have the workout planner database set up, you need to add the `done` column:
1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the contents of `src/sql/migration_add_done_column.sql` into the editor
3. Click **Run** to add the missing `done` column

## 3. Get Your Project Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy your **Project URL** and **anon/public key**

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. The app will automatically:
   - Migrate existing localStorage data to Supabase
   - Use Supabase for all new data operations
   - Fallback to localStorage if Supabase is unavailable

## Features

- **Automatic Migration**: Existing localStorage data is migrated to Supabase on first run
- **Fallback Support**: App continues to work with localStorage if Supabase is unavailable
- **Real-time Sync**: Data is automatically saved to the cloud
- **Cross-device Access**: Access your workouts from any device

## Database Tables

### `workouts`
- `id` (TEXT, Primary Key)
- `name` (TEXT)
- `exercises` (JSONB)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `workout_assignments`
- `date` (TEXT, Primary Key)
- `workout_id` (TEXT, Foreign Key)
- `done` (BOOLEAN, Default: FALSE)
- `created_at` (TIMESTAMP)

## Troubleshooting

- **"Supabase not configured" warning**: Check your environment variables
- **Database connection errors**: Verify your project URL and API key
- **Data not syncing**: Check browser console for error messages
