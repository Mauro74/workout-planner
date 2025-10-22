-- Supabase SQL Schema for Workout Planner
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
-- Note: RLS is enabled after table creation to avoid conflicts

-- Create workouts table
CREATE TABLE IF NOT EXISTS public.workouts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    exercises JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create workout_assignments table
CREATE TABLE IF NOT EXISTS public.workout_assignments (
    date TEXT PRIMARY KEY,
    workout_id TEXT NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    FOREIGN KEY (workout_id) REFERENCES public.workouts (id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_workouts_name ON public.workouts (name);
CREATE INDEX IF NOT EXISTS idx_workout_assignments_workout_id ON public.workout_assignments (workout_id);
CREATE INDEX IF NOT EXISTS idx_workout_assignments_date ON public.workout_assignments (date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for workouts table
DROP TRIGGER IF EXISTS trigger_workouts_updated_at ON public.workouts;
CREATE TRIGGER trigger_workouts_updated_at
    BEFORE UPDATE ON public.workouts
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_assignments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (since this is a single-user app)
-- These policies allow all authenticated and anonymous users to access data
CREATE POLICY "Allow all access to workouts" ON public.workouts
    FOR ALL USING (true);

CREATE POLICY "Allow all access to workout_assignments" ON public.workout_assignments
    FOR ALL USING (true);

-- Alternative: If you want to restrict to authenticated users only, use these instead:
-- CREATE POLICY "Allow authenticated access to workouts" ON public.workouts
--     FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
-- CREATE POLICY "Allow authenticated access to workout_assignments" ON public.workout_assignments
--     FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
