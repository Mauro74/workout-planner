import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Toggle } from './Toggle';
import { ActionButton } from '../styles';
import { formatDate } from '../utils/dateUtils';
import type { Workout } from '../types';

interface WorkoutDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workout: Workout | null;
  date: string | null;
  isDone: boolean;
  onMarkAsDone: (done: boolean) => void;
}

export const WorkoutDetailsModal = ({
  isOpen,
  onClose,
  workout,
  date,
  isDone,
  onMarkAsDone,
}: WorkoutDetailsModalProps) => {
  const [localDone, setLocalDone] = useState(isDone);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync local state with prop changes when modal opens for different workouts
  useEffect(() => {
    setLocalDone(isDone);
    setHasChanges(false);
  }, [isDone, isOpen]);

  const handleToggleChange = (value: boolean) => {
    setLocalDone(value);
    setHasChanges(value !== isDone);
  };

  const handleConfirm = () => {
    if (hasChanges) {
      onMarkAsDone(localDone);
    }
    onClose();
  };

  const handleClose = () => {
    setLocalDone(isDone);
    setHasChanges(false);
    onClose();
  };
  if (!workout) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`${workout.name}${date ? ` - ${formatDate(date)}` : ''}`}>
      <div style={{ marginBottom: '1.5rem' }}>
        {workout.exercises.map((exercise) => (
          <div
            key={exercise.id}
            style={{
              padding: '1rem',
              marginBottom: '0.75rem',
              background: 'var(--color-card)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--color-warning)',
            }}
          >
            <div
              style={{
                fontWeight: '600',
                color: 'var(--color-text-dark)',
                marginBottom: '0.5rem',
                fontSize: '1rem',
              }}
            >
              {exercise.name}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <div>
                <strong>Sets:</strong> {exercise.sets}
              </div>
              <div>
                <strong>Reps:</strong> {exercise.minReps}-{exercise.maxReps}
              </div>
              <div>
                <strong>Weight:</strong> {exercise.weight}kg
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isDone && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Toggle label="Mark as done" isOn={localDone} onToggle={handleToggleChange} />
          </div>
          <div>{hasChanges && <ActionButton onClick={handleConfirm}>Confirm</ActionButton>}</div>
        </div>
      )}
    </Modal>
  );
};
