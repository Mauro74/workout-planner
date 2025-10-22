# Row Level Security (RLS) Setup for Workout Planner

## What is Row Level Security?

Row Level Security (RLS) is a PostgreSQL feature that allows you to control which rows users can access in a table. Supabase strongly recommends enabling RLS for security, even for single-user applications.

## How to Enable RLS in Your Supabase Project

### Method 1: Using the Updated SQL Schema (Recommended)

1. **Open your Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Navigate to your workout planner project

2. **Access the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Updated Schema**
   - Copy the entire contents of `src/sql/schema.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute

This will:
- Enable RLS on both `workouts` and `workout_assignments` tables
- Create policies that allow full access (suitable for single-user apps)
- Remove the RLS warnings from your dashboard

### Method 2: Manual Setup via Dashboard

If you prefer to use the Supabase dashboard:

1. **Navigate to Authentication > Policies**
2. **For each table (workouts, workout_assignments):**
   - Click "Enable RLS" 
   - Click "New Policy"
   - Choose "Get started quickly" → "Enable access to all users"
   - Click "Save policy"

### Method 3: Quick SQL Commands

Run these commands in your SQL Editor:

```sql
-- Enable RLS
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_assignments ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for single-user app
CREATE POLICY "Allow all access to workouts" ON public.workouts FOR ALL USING (true);
CREATE POLICY "Allow all access to workout_assignments" ON public.workout_assignments FOR ALL USING (true);
```

## Policy Options Explained

### Current Setup (Recommended for Single-User App)
```sql
CREATE POLICY "Allow all access to workouts" ON public.workouts FOR ALL USING (true);
```
- **Pros**: Simple, works immediately, no authentication required
- **Cons**: Less secure if you ever want multi-user support
- **Best for**: Personal workout planner apps

### Alternative: Authenticated Users Only
```sql
CREATE POLICY "Allow authenticated access to workouts" ON public.workouts 
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
```
- **Pros**: More secure, still works with anonymous access
- **Cons**: Slightly more complex
- **Best for**: Apps that might add authentication later

### Future: User-Specific Data
If you ever want to add user authentication and make data user-specific:
```sql
-- Add user_id column first
ALTER TABLE public.workouts ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create user-specific policies
CREATE POLICY "Users can access their own workouts" ON public.workouts 
    FOR ALL USING (auth.uid() = user_id);
```

## Verifying RLS is Working

1. **Check Dashboard**: The RLS warnings should disappear
2. **Test App**: Your workout planner should continue working normally
3. **SQL Editor**: Run `SELECT * FROM workouts;` - it should return data

## Troubleshooting

### App Stops Working After Enabling RLS
- Check that policies were created correctly
- Verify the policy conditions match your app's access pattern
- Use the permissive `USING (true)` policy for single-user apps

### Still Seeing RLS Warnings
- Ensure you ran the SQL commands in the correct database
- Check that both `ENABLE ROW LEVEL SECURITY` and `CREATE POLICY` commands succeeded
- Refresh your Supabase dashboard

### Need to Disable RLS Temporarily
```sql
ALTER TABLE public.workouts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_assignments DISABLE ROW LEVEL SECURITY;
```

## Security Best Practices

1. **For Personal Apps**: Use the current permissive policies
2. **For Shared Apps**: Implement user-specific policies
3. **For Public Apps**: Consider read-only policies for public data
4. **Always**: Keep your Supabase API keys secure and use environment variables

## Next Steps

After enabling RLS:
1. Test your workout planner app thoroughly
2. Consider adding user authentication if you want to sync across devices
3. Monitor your Supabase dashboard for any new security recommendations
