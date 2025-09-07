import {
  CalendarContainer,
  MonthNavigation,
  MonthYear,
  CurrentMonthButton,
  EmptyState,
  RemoveAllButton,
  RemoveAllContainer,
  ScheduleContainer,
  WorkoutDate,
  WorkoutInfo,
  WorkoutItem,
  WorkoutName,
} from '../styles';
import type { Workout, WorkoutAssignment } from '../types';
import { formatMonthYear, formatDate } from '../utils/dateUtils';
import {
  MdChevronLeft,
  MdChevronRight,
  MdDeleteForever,
  MdCalendarMonth,
  MdClearAll,
  MdCheckCircle,
} from 'react-icons/md';
import { ButtonIcon } from './ButtonIcon';

interface MonthlyScheduleProps {
  workouts: Workout[];
  workoutAssignments: WorkoutAssignment[];
  currentMonth: Date;
  onMonthChange: (direction: 'prev' | 'next') => void;
  onRemoveWorkout: (date: string) => void;
  onGoToToday: () => void;
  onRemoveAllWorkouts: () => void;
  onWorkoutClick: (workout: Workout, date: string) => void;
}

export const MonthlySchedule = ({
  workouts,
  workoutAssignments,
  currentMonth,
  onMonthChange,
  onRemoveWorkout,
  onGoToToday,
  onRemoveAllWorkouts,
  onWorkoutClick,
}: MonthlyScheduleProps) => {
  const getWorkoutsForMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    return workoutAssignments
      .filter((assignment) => {
        const assignmentDate = new Date(assignment.date);
        return assignmentDate.getFullYear() === year && assignmentDate.getMonth() === month;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((assignment) => ({
        date: assignment.date,
        workout: workouts.find((w) => w.id === assignment.workoutId),
        isDone: assignment.done || false,
      }));
  };

  const monthlyWorkouts = getWorkoutsForMonth();

  const isCurrentMonth = () => {
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth();
  };

  return (
    <CalendarContainer>
      <MonthNavigation>
        <ButtonIcon icon={MdChevronLeft} size={30} onClick={() => onMonthChange('prev')} />
        <MonthYear>{formatMonthYear(currentMonth)}</MonthYear>
        <ButtonIcon icon={MdChevronRight} size={30} onClick={() => onMonthChange('next')} />
      </MonthNavigation>

      {!isCurrentMonth() && (
        <CurrentMonthButton onClick={onGoToToday}>
          <ButtonIcon color="var(--color-warning)" size={16} icon={MdCalendarMonth} />
          <span>Current Month</span>
        </CurrentMonthButton>
      )}

      <ScheduleContainer>
        {monthlyWorkouts.length === 0 ? (
          <EmptyState>No workouts scheduled for this month</EmptyState>
        ) : (
          monthlyWorkouts.map(({ date, workout, isDone }) => (
            <WorkoutItem key={date} style={{ opacity: isDone ? 0.7 : 1 }}>
              <WorkoutInfo>
                <WorkoutName
                  onClick={() => workout && onWorkoutClick(workout, date)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: isDone ? 'line-through' : 'none',
                    color: isDone ? 'var(--color-success)' : 'var(--color-text-dark)',
                  }}
                >
                  {isDone && <MdCheckCircle style={{ marginRight: '8px', color: 'var(--color-success)' }} />}
                  {workout?.name}
                </WorkoutName>
                <WorkoutDate style={{ color: isDone ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                  {formatDate(date)}
                </WorkoutDate>
              </WorkoutInfo>
              <ButtonIcon
                size={30}
                color={isDone ? 'var(--color-text-secondary)' : 'var(--color-danger)'}
                icon={MdDeleteForever}
                onClick={() => onRemoveWorkout(date)}
                style={{ opacity: isDone ? 0.5 : 1, cursor: isDone ? 'not-allowed' : 'pointer' }}
              />
            </WorkoutItem>
          ))
        )}
      </ScheduleContainer>

      {monthlyWorkouts.length > 1 && (
        <RemoveAllContainer>
          <RemoveAllButton onClick={onRemoveAllWorkouts}>
            <MdClearAll size={20} />
            Remove All
          </RemoveAllButton>
        </RemoveAllContainer>
      )}
    </CalendarContainer>
  );
};
