import {
  CalendarContainer,
  MonthNavigation,
  MonthYear,
  CurrentMonthButton,
  EmptyState,
  ScheduleContainer,
  WorkoutDate,
  WorkoutInfo,
  WorkoutItem,
  WorkoutName,
} from '../styles';
import type { Workout, WorkoutAssignment } from '../types';
import { formatDate, getWeekStart, getWeekEnd, formatWeekRange } from '../utils/dateUtils';
import { MdChevronLeft, MdChevronRight, MdDeleteForever, MdCalendarToday, MdCheckCircle } from 'react-icons/md';
import { ButtonIcon } from './ButtonIcon';

interface WeeklyScheduleProps {
  workouts: Workout[];
  workoutAssignments: WorkoutAssignment[];
  currentWeek: Date;
  onWeekChange: (direction: 'prev' | 'next') => void;
  onRemoveWorkout: (date: string) => void;
  onGoToToday: () => void;
  onWorkoutClick: (workout: Workout, date: string) => void;
}

export const WeeklySchedule = ({
  workouts,
  workoutAssignments,
  currentWeek,
  onWeekChange,
  onRemoveWorkout,
  onGoToToday,
  onWorkoutClick,
}: WeeklyScheduleProps) => {
  const getWorkoutsForWeek = () => {
    const weekStart = getWeekStart(currentWeek);
    const weekEnd = getWeekEnd(currentWeek);

    return workoutAssignments
      .filter((assignment) => {
        const assignmentDate = new Date(assignment.date);
        return assignmentDate >= weekStart && assignmentDate <= weekEnd;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((assignment) => ({
        date: assignment.date,
        workout: workouts.find((w) => w.id === assignment.workoutId),
        isDone: assignment.done || false,
      }));
  };

  const weeklyWorkouts = getWorkoutsForWeek();

  const isCurrentWeek = () => {
    const today = new Date();
    const weekStart = getWeekStart(currentWeek);
    const weekEnd = getWeekEnd(currentWeek);
    return today >= weekStart && today <= weekEnd;
  };

  return (
    <CalendarContainer>
      <MonthNavigation>
        <ButtonIcon icon={MdChevronLeft} size={30} onClick={() => onWeekChange('prev')} />
        <MonthYear>{formatWeekRange(currentWeek)}</MonthYear>
        <ButtonIcon icon={MdChevronRight} size={30} onClick={() => onWeekChange('next')} />
      </MonthNavigation>

      {!isCurrentWeek() && (
        <CurrentMonthButton onClick={onGoToToday}>
          <ButtonIcon color="var(--color-warning)" size={16} icon={MdCalendarToday} />
          <span>Current Week</span>
        </CurrentMonthButton>
      )}

      <ScheduleContainer>
        {weeklyWorkouts.length === 0 ? (
          <EmptyState>No workouts scheduled for this week</EmptyState>
        ) : (
          weeklyWorkouts.map(({ date, workout, isDone }) => (
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
    </CalendarContainer>
  );
};
