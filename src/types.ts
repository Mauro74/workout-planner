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
    id: 'chest-back',
    name: 'Chest & Back',
    exercises: [
      { id: '13', name: 'Pec Deck', sets: '1', weight: '4', maxReps: '10', minReps: '6' },
      { id: '14', name: 'Incline Press', sets: '1', weight: '5', maxReps: '3', minReps: '1' },
      { id: '15', name: 'Close Grip Pulldowns', sets: '1', weight: '100', maxReps: '10', minReps: '6' },
      { id: '16', name: 'Deadlift', sets: '1', weight: '100', maxReps: '8', minReps: '5' },
    ],
  },
  {
    id: 'legs-one',
    name: 'Legs Day One',
    exercises: [
      { id: '10', name: 'Legs Extension', sets: '1', weight: '100', maxReps: '15', minReps: '8' },
      { id: '11', name: 'Leg Press', sets: '1', weight: '150', maxReps: '15', minReps: '8' },
      { id: '12', name: 'Standing Calf Raises', sets: '1', weight: '50', maxReps: '20', minReps: '12' },
    ],
  },
  {
    id: 'legs-two',
    name: 'Legs Day Two',
    exercises: [
      { id: '1', name: 'Legs Extension Hold 20sec', sets: '1', weight: '50', maxReps: '1', minReps: '1' },
      { id: '2', name: 'Squat', sets: '1', weight: '12', maxReps: '15', minReps: '8' },
      { id: '3', name: 'Calf Raises', sets: '1', weight: '100', maxReps: '20', minReps: '12' },
    ],
  },
  {
    id: 'shoulders-arms',
    name: 'Shoulders & Arms',
    exercises: [
      { id: '5', name: 'Lateral Raises', sets: '1', weight: '10', maxReps: '10', minReps: '6' },
      { id: '6', name: 'Bentover Lateral Raises', sets: '1', weight: '10', maxReps: '10', minReps: '6' },
      { id: '7', name: 'Barbell Curls', sets: '1', weight: '50', maxReps: '10', minReps: '6' },
      { id: '8', name: 'Triceps Pressdowns', sets: '1', weight: '10', maxReps: '10', minReps: '6' },
      { id: '9', name: 'Dips', sets: '1', weight: 'body', maxReps: '5', minReps: '3' },
    ],
  },
];
