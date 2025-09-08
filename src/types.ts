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

export const DEFAULT_WORKOUTS: Workout[] = [
  {
    id: 'push',
    name: 'Push Day',
    exercises: [
      { id: '1', name: 'Bench Press', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
      { id: '2', name: 'Overhead Press', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
      { id: '3', name: 'Incline Dumbbell Press', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
      { id: '4', name: 'Tricep Dips', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
    ],
  },
  {
    id: 'pull',
    name: 'Pull Day',
    exercises: [
      { id: '5', name: 'Pull-ups', sets: '3', minReps: '6', maxReps: '10', weight: 'body' },
      { id: '6', name: 'Barbell Rows', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
      { id: '7', name: 'Lat Pulldowns', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
      { id: '8', name: 'Bicep Curls', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
    ],
  },
  {
    id: 'legs',
    name: 'Leg Day',
    exercises: [
      { id: '9', name: 'Squats', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
      { id: '10', name: 'Romanian Deadlifts', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
      { id: '11', name: 'Leg Press', sets: '3', minReps: '6', maxReps: '10', weight: '10' },
      { id: '12', name: 'Calf Raises', sets: '4', minReps: '6', maxReps: '10', weight: '10' },
    ],
  },
  {
    id: 'cardio',
    name: 'Cardio & Core',
    exercises: [
      { id: '13', name: 'Treadmill Run', sets: '3', minReps: '6', maxReps: '10', weight: 'body' },
      { id: '14', name: 'Planks', sets: '3', minReps: '6', maxReps: '10', weight: 'body' },
      { id: '15', name: 'Mountain Climbers', sets: '3', minReps: '6', maxReps: '10', weight: 'body' },
      { id: '16', name: 'Burpees', sets: '3', minReps: '6', maxReps: '10', weight: 'body' },
    ],
  },
];
