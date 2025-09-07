import {
  ExerciseList as StyledExerciseList,
  ExerciseItem,
  ExerciseName,
  ExerciseDetails,
  ExerciseField,
  Input,
} from '../styles';
import type { Workout } from '../types';

interface ExerciseListProps {
  workout: Workout;
  onExerciseUpdate: (
    workoutId: string,
    exerciseId: string,
    field: 'sets' | 'minReps' | 'maxReps' | 'weight',
    value: string
  ) => void;
  onMaxRepsBlur: (workoutId: string, exerciseId: string, value: string) => void;
}

export const ExerciseList = ({ workout, onExerciseUpdate, onMaxRepsBlur }: ExerciseListProps) => {
  return (
    <StyledExerciseList>
      {workout.exercises.map((exercise) => (
        <ExerciseItem key={exercise.id}>
          <ExerciseName>{exercise.name}</ExerciseName>
          <ExerciseDetails>
            <ExerciseField>
              <label>Sets</label>
              <Input
                type="number"
                inputMode="numeric"
                value={exercise.sets}
                onChange={(e) => onExerciseUpdate(workout.id, exercise.id, 'sets', e.target.value)}
                placeholder="3"
              />
            </ExerciseField>
            <ExerciseField>
              <label>Min Reps</label>
              <Input
                type="number"
                inputMode="numeric"
                value={exercise.minReps}
                onChange={(e) => onExerciseUpdate(workout.id, exercise.id, 'minReps', e.target.value)}
                placeholder="8"
              />
            </ExerciseField>
            <ExerciseField>
              <label>Max Reps</label>
              <Input
                type="number"
                inputMode="numeric"
                value={exercise.maxReps}
                onChange={(e) => onExerciseUpdate(workout.id, exercise.id, 'maxReps', e.target.value)}
                onBlur={(e) => onMaxRepsBlur(workout.id, exercise.id, e.target.value)}
                placeholder="12"
              />
            </ExerciseField>
            <ExerciseField>
              <label>Weight</label>
              <Input
                type="number"
                inputMode="decimal"
                value={exercise.weight}
                onChange={(e) => onExerciseUpdate(workout.id, exercise.id, 'weight', e.target.value)}
                placeholder={exercise.weight}
              />
            </ExerciseField>
          </ExerciseDetails>
        </ExerciseItem>
      ))}
    </StyledExerciseList>
  );
};
