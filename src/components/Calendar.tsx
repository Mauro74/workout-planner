import {
  CalendarContainer,
  CalendarGrid,
  CalendarHeader,
  DayLabel,
  DateButton,
  SectionTitle,
  MonthNavigation,
  MonthYear,
  Dot,
  Legend,
} from '../styles';
import type { WorkoutAssignment } from '../types';
import { formatMonthYear } from '../utils/dateUtils';
import { MdCalendarMonth, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { ButtonIcon } from './ButtonIcon';

interface CalendarProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  workoutAssignments: WorkoutAssignment[];
  currentMonth: Date;
  onMonthChange: (direction: 'prev' | 'next') => void;
  onGoToToday: () => void;
}

export const Calendar = ({
  selectedDate,
  onDateSelect,
  workoutAssignments,
  currentMonth,
  onMonthChange,
  onGoToToday,
}: CalendarProps) => {
  const today = new Date().toISOString().split('T')[0];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push(dateStr);
    }

    return days;
  };

  const hasWorkout = (date: string) => {
    return workoutAssignments.some((assignment) => assignment.date === date);
  };

  const isWorkoutCompleted = (date: string) => {
    const assignment = workoutAssignments.find((assignment) => assignment.date === date);
    return assignment?.done || false;
  };

  const isPastDate = (date: string) => {
    return date < today;
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <CalendarContainer id="calendarContainer">
      <SectionTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdCalendarMonth size={24} /> Select a Date
      </SectionTitle>
      <MonthNavigation>
        <ButtonIcon icon={MdChevronLeft} size={30} onClick={() => onMonthChange('prev')} />
        <MonthYear>{formatMonthYear(currentMonth)}</MonthYear>
        <ButtonIcon icon={MdChevronRight} size={30} onClick={() => onMonthChange('next')} />
      </MonthNavigation>

      {!isCurrentMonth() && (
        <div
          onClick={onGoToToday}
          style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center', marginBottom: '1rem' }}
        >
          <ButtonIcon color="var(--color-warning)" size={16} icon={MdCalendarMonth} />
          <span>Today</span>
        </div>
      )}
      <div id="calendarGrid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CalendarHeader>
          {daysOfWeek.map((day) => (
            <DayLabel key={day}>{day}</DayLabel>
          ))}
        </CalendarHeader>
        <CalendarGrid>
          {days.map((date, index) => (
            <div key={index}>
              {date && (
                <DateButton
                  isSelected={selectedDate === date}
                  hasWorkout={hasWorkout(date)}
                  isCompleted={isWorkoutCompleted(date)}
                  isToday={date === today}
                  isPast={isPastDate(date)}
                  onClick={() => !isPastDate(date) && onDateSelect(date)}
                  disabled={isPastDate(date)}
                >
                  {new Date(date).getDate()}
                </DateButton>
              )}
            </div>
          ))}
        </CalendarGrid>
      </div>
      <Legend>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Dot isToday /> Today
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Dot isAssigned /> Assigned
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Dot isCompleted /> Done
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Dot isSelected /> Selected
        </div>
      </Legend>
    </CalendarContainer>
  );
};
