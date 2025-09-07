-- Migration: Add 'done' column to workout_assignments table
-- Run this if you already have an existing workout_assignments table without the 'done' column

-- Add the done column with default value FALSE
ALTER TABLE public.workout_assignments 
ADD COLUMN IF NOT EXISTS done BOOLEAN DEFAULT FALSE;

-- Update any existing records to have done = FALSE (this is redundant due to DEFAULT but explicit)
UPDATE public.workout_assignments 
SET done = FALSE 
WHERE done IS NULL;
