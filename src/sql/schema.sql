-- Supabase SQL Schema for Workout Planner
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER TABLE IF EXISTS public.workouts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.workout_assignments DISABLE ROW LEVEL SECURITY;

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

-- Enable Row Level Security (optional - for multi-user support)
-- ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.workout_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies (uncomment if you want user-specific data)
-- CREATE POLICY "Users can view their own workouts" ON public.workouts
--     FOR SELECT USING (auth.uid()::text = user_id);
-- CREATE POLICY "Users can insert their own workouts" ON public.workouts
--     FOR INSERT WITH CHECK (auth.uid()::text = user_id);
-- CREATE POLICY "Users can update their own workouts" ON public.workouts
--     FOR UPDATE USING (auth.uid()::text = user_id);
