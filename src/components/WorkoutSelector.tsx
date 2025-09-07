import React from 'react';
import { WorkoutSelector as WorkoutSelectorContainer, SectionTitle, WorkoutGrid, WorkoutCard } from '../styles';
import type { Workout } from '../types';
import { MdCalendarMonth, MdOutlineFitnessCenter } from 'react-icons/md';

interface WorkoutSelectorProps {
  workouts: Workout[];
  selectedWorkout: Workout | null;
  onWorkoutSelect: (workout: Workout) => void;
  onExerciseUpdate: (
    workoutId: string,
    exerciseId: string,
    field: 'minReps' | 'maxReps' | 'weight',
    value: string
  ) => void;
  onAssignWorkout: () => void;
  onRemoveWorkout: () => void;
  selectedDate: string | null;
  hasAssignedWorkout: boolean;
}

export const WorkoutSelector: React.FC<WorkoutSelectorProps> = ({
  workouts,
  selectedWorkout,
  onWorkoutSelect,
  hasAssignedWorkout,
}) => {
  return (
    <WorkoutSelectorContainer>
      <SectionTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdOutlineFitnessCenter size={24} /> Select a Workout
      </SectionTitle>
      <WorkoutGrid>
        {workouts.map((workout) => {
          const isCurrentlyAssigned = hasAssignedWorkout && selectedWorkout?.id === workout.id;
          const isOtherWorkout = hasAssignedWorkout && selectedWorkout?.id !== workout.id;

          return (
            <WorkoutCard
              key={workout.id}
              isSelected={selectedWorkout?.id === workout.id}
              onClick={() => {
                if (!hasAssignedWorkout || isCurrentlyAssigned) {
                  onWorkoutSelect(workout);
                }
              }}
              style={{
                opacity: isOtherWorkout ? 0.5 : 1,
                cursor: isOtherWorkout ? 'not-allowed' : 'pointer',
                // border: isCurrentlyAssigned ? '2px solid var(--color-border-success)' : undefined,
              }}
            >
              {isCurrentlyAssigned && (
                <>
                  <MdCalendarMonth size={16} />
                </>
              )}
              {workout.name}
            </WorkoutCard>
          );
        })}
      </WorkoutGrid>
    </WorkoutSelectorContainer>
  );
};
