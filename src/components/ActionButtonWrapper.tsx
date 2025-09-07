import { ActionButtonWrapper as StyledActionButtonWrapper, ActionButton } from '../styles';
import { formatDate } from '../utils/dateUtils';
import type { Workout, WorkoutAssignment } from '../types';
import { MdDeleteForever, MdSave } from 'react-icons/md';

interface ActionButtonWrapperProps {
  selectedDate: string | null;
  selectedWorkout: Workout | null;
  workoutAssignments: WorkoutAssignment[];
  hasAssignedWorkout: boolean;
  onSaveWorkoutChanges: () => void;
  onRemoveWorkout: () => void;
  onAssignWorkout: () => void;
}

export const ActionButtonWrapper = ({
  selectedDate,
  selectedWorkout,
  workoutAssignments,
  hasAssignedWorkout,
  onSaveWorkoutChanges,
  onRemoveWorkout,
  onAssignWorkout,
}: ActionButtonWrapperProps) => {
  if (!selectedWorkout) return null;

  return (
    <StyledActionButtonWrapper>
      {selectedDate ? (
        <>
          {selectedWorkout?.id === workoutAssignments.find((a) => a.date === selectedDate)?.workoutId ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ActionButton onClick={onSaveWorkoutChanges}>
                <MdSave size={20} />
                Save
              </ActionButton>
              <ActionButton
                onClick={onRemoveWorkout}
                style={{
                  background: 'var(--color-danger)',
                }}
              >
                <MdDeleteForever size={24} />
                Delete
              </ActionButton>
            </div>
          ) : !hasAssignedWorkout ? (
            <ActionButton onClick={onAssignWorkout}>
              Assign {selectedWorkout.name} to {formatDate(selectedDate)}
            </ActionButton>
          ) : (
            <ActionButton
              onClick={onAssignWorkout}
              style={{ backgroundColor: 'var(--color-warning)', color: 'var(--color-warning-text)' }}
            >
              Replace current workout with {selectedWorkout.name}
            </ActionButton>
          )}
        </>
      ) : (
        <ActionButton disabled>Select a date first</ActionButton>
      )}
    </StyledActionButtonWrapper>
  );
};
