export interface Exercise {
  id: string;
  name: string;
  sets: string;
  minReps: string;
  maxReps: string;
  weight: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface WorkoutAssignment {
  date: string; // YYYY-MM-DD format
  workoutId: string;
  done?: boolean; // Optional flag to mark workout as completed
}

export const DEFAULT_WORKOUTS: Workout[] = [];
