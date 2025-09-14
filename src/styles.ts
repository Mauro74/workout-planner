import styled from 'styled-components';

// Color Variables
const colors = {
  // Primary colors
  primary: 'rgba(102, 126, 234, 1)',
  primaryHover: 'rgba(90, 111, 216, 1)',
  accent: 'rgba(255, 140, 0, 1)',
  accentHover: 'rgba(255, 127, 0, 1)',
  warning: 'rgba(255, 193, 7, 1)',
  success: 'rgba(76, 175, 80, 1)',

  // Background colors
  background: 'rgba(26, 26, 26, 1)',
  backgroundSecondary: 'rgba(45, 45, 45, 1)',
  card: 'rgba(51, 51, 51, 1)',
  cardSecondary: 'rgba(42, 42, 42, 1)',
  input: 'rgba(42, 42, 42, 1)',

  // Text colors
  textPrimary: 'rgba(255, 255, 255, 1)',
  textSecondary: 'rgba(204, 204, 204, 1)',
  textTertiary: 'rgba(160, 160, 160, 1)',
  textMuted: 'rgba(153, 153, 153, 1)',
  textDisabled: 'rgba(102, 102, 102, 1)',
  textDark: 'rgba(51, 51, 51, 1)',

  // Border colors
  border: 'rgba(255, 255, 255, 0.1)',
  borderSecondary: 'rgba(85, 85, 85, 1)',
  borderLight: 'rgba(233, 236, 239, 1)',

  // State colors
  selected: 'rgba(102, 126, 234, 1)',
  today: 'rgba(255, 193, 7, 1)',
  past: 'rgba(240, 240, 240, 1)',
  pastText: 'rgba(204, 204, 204, 1)',
  hover: 'rgba(224, 224, 224, 1)',
  hoverSecondary: 'rgba(255, 255, 255, 0.1)',

  // Neutral colors
  white: 'rgba(255, 255, 255, 1)',
  lightGray: 'rgba(248, 249, 250, 1)',
  mediumGray: 'rgba(245, 245, 245, 1)',
  darkGray: 'rgba(223, 223, 223, 1)',
  darkerGray: 'rgba(102, 102, 102, 1)',

  // Shadow colors
  shadowLight: 'rgba(0, 0, 0, 0.15)',
  shadowMedium: 'rgba(0, 0, 0, 0.3)',
  shadowDark: 'rgba(0, 0, 0, 0.5)',
  shadowOverlay: 'rgba(0, 0, 0, 0.8)',

  // Focus colors
  focusGlow: 'rgba(255, 215, 0, 0.1)',
  accentGlow: 'rgba(255, 140, 0, 0.4)',
};

export const AppContainer = styled.div`
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  color: ${colors.textPrimary};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

export const Title = styled.h1`
  color: ${colors.white};
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px ${colors.shadowMedium};
`;

export const Card = styled.div`
  /* background: ${colors.card};
  border-radius: 6px;
  border: 1px solid ${colors.border}; */
  padding: 1rem 0rem;
  margin-bottom: 1rem;
  color: ${colors.textPrimary};
`;

export const CalendarContainer = styled.div`
  /* padding: 0.9rem; */
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.15rem;
  margin-top: 1rem;
  width: 100%;
  overflow: hidden;
  max-width: 400px;
`;

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.15rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: ${colors.textSecondary};
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

export const DayLabel = styled.div`
  text-align: center;
  font-weight: 600;
  color: ${colors.textTertiary};
  font-size: 0.8rem;
  padding: 0.5rem 0;
`;

export const DateButton = styled.button<{
  isSelected?: boolean;
  hasWorkout?: boolean;
  isCompleted?: boolean;
  isToday?: boolean;
  isPast?: boolean;
}>`
  aspect-ratio: 1;
  border: none;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  width: 100%;
  min-width: 0;
  padding: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${(props) => {
    if (props.isSelected) {
      return `
        background: ${colors.selected};
        color: ${colors.white};
      `;
    }
    if (props.isCompleted) {
      return `
        background: ${colors.accent};
        color: ${colors.white};
        opacity: ${props.isPast ? 0.5 : 1};
        position: relative;
        &::after {
          content: '✓';
          position: absolute;
          top: 2px;
          right: 2px;
          font-size: 0.6rem;
          font-weight: bold;
        }
      `;
    }
    if (props.hasWorkout && props.isPast) {
      return `
        background: ${colors.success};
        color: ${colors.white};
        opacity: 0.7;
        cursor: not-allowed;
        &:hover {
          background: ${colors.success};
          transform: none;
        }
      `;
    }
    if (props.hasWorkout) {
      return `
        background: ${colors.success};
        color: ${colors.white};
      `;
    }
    if (props.isPast) {
      return `
        background: ${colors.past};
        color: ${colors.darkerGray};
        cursor: not-allowed;
        opacity: 0.5;
        &:hover {
          background: ${colors.past};
          transform: none;
        }
      `;
    }
    if (props.isToday) {
      return `
        background: ${colors.today};
        color: ${colors.textDark};
      `;
    }
    return `
      background: ${colors.mediumGray};
      color: ${colors.textDark};
      &:hover {
        background: ${colors.hover};
      }
    `;
  }}

  &:active {
    transform: scale(0.95);
  }
`;

export const Pill = styled.div`
  background: ${colors.cardSecondary};
  color: ${colors.warning};
  border: 2px solid ${colors.warning};
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
`;

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--color-text-light);
`;

export const Dot = styled.div<{
  isSelected?: boolean;
  isAssigned?: boolean;
  isCompleted?: boolean;
  isToday?: boolean;
}>`
  background-color: ${(props) =>
    props.isSelected
      ? colors.primary
      : props.isCompleted
      ? colors.accent
      : props.isAssigned
      ? colors.success
      : props.isToday && colors.today};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const WorkoutSelector = styled.div``;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
  color: ${colors.darkGray};
`;

export const WorkoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const WorkoutCard = styled.button<{ isSelected?: boolean }>`
  background: ${(props) => (props.isSelected ? colors.primary : colors.lightGray)};
  color: ${(props) => (props.isSelected ? colors.white : colors.textDark)};
  border: 2px solid ${(props) => (props.isSelected ? colors.primary : colors.borderLight)};
  border-radius: 6px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${colors.shadowLight};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ExerciseList = styled.div`
  margin-top: 1rem;
  h4 {
    margin-bottom: 0.5rem;
    color: ${colors.textPrimary};
    font-size: 1rem;
  }
`;

export const ExerciseItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  background: ${colors.lightGray};
  border-radius: 6px;
  border-left: 4px solid ${colors.accent};
`;

export const ExerciseName = styled.span`
  font-weight: 600;
  color: ${colors.textDark};
`;

export const ExerciseDetails = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.1rem;
  font-size: 0.9rem;
  color: ${colors.textDisabled};
`;

export const ExerciseField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 25%;
  label {
    font-size: 0.7rem;
    color: ${colors.textDark};
  }
`;

export const ExerciseInfo = styled.div`
  h5 {
    margin: 0 0 0.25rem 0;
    color: ${colors.textPrimary};
    font-size: 0.9rem;
  }
  p {
    margin: 0;
    color: ${colors.textSecondary};
    font-size: 0.8rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.4rem;
  border: 2px solid ${colors.borderSecondary};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: ${colors.input};
  color: ${colors.textPrimary};

  &:focus {
    outline: none;
    border-color: ${colors.warning};
    box-shadow: 0 0 0 3px ${colors.focusGlow};
  }

  &::placeholder {
    color: ${colors.textMuted};
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ViewContainer = styled.div<{ currentView: 'calendar' | 'schedule' }>`
  display: block;
  width: 100%;
`;

export const SlideView = styled.div<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  width: 100%;
  opacity: ${(props) => (props.isActive ? '1' : '0')};
  transform: ${(props) => (props.isActive ? 'translateX(0)' : 'translateX(-20px)')};
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  animation: ${(props) => (props.isActive ? 'slideInFade 0.3s ease-out' : 'none')};

  @keyframes slideInFade {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const ActionButton = styled.button`
  background: ${colors.accent};
  color: ${colors.white};
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${colors.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${colors.accentGlow};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${colors.textDisabled};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &:hover {
      background: ${colors.textDisabled};
      transform: none;
      box-shadow: none;
    }
  }
`;

export const MonthNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const NavButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: ${colors.primaryHover};
  }
`;

export const MonthYear = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.darkGray};
`;

// Modal styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.shadowOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: ${colors.card};
  color: ${colors.textPrimary};
  border-radius: 16px;
  padding: 1rem;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px ${colors.shadowDark};
  border: 1px solid ${colors.borderSecondary};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.textSecondary};
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.hoverSecondary};
    color: ${colors.textPrimary};
  }
`;

// Tab Navigation styles
export const TabContainer = styled.div<{ activeTab: 'calendar' | 'schedule' }>`
  display: flex;
  background: ${colors.cardSecondary};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  margin: 0;
  touch-action: pan-y;
  box-shadow: 0 2px 8px ${colors.shadowMedium};

  /* &::after {
    content: '';
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: calc(50% - 0.25rem);
    height: calc(100% - 0.5rem);
    background: ${colors.warning};
    transform: translateX(${(props) => (props.activeTab === 'schedule' ? '100%' : '0%')});
    transition: transform 0.3s ease-in-out;
    z-index: 1;
  } */
`;

export const TabButton = styled.div<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.2rem;
  border: none;
  text-align: center;
  background: transparent;
  color: ${(props) => (props.isActive ? colors.warning : colors.textMuted)};
  font-weight: 600;
  position: relative;
  z-index: 2;
  cursor: pointer;
  transition: all 0.1s ease;
  span {
    font-size: 0.6rem;
    /* color: ${colors.textMuted}; */
  }
`;

// Toast notification styles
export const ToastContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${colors.cardSecondary};
  color: ${colors.warning};
  border: 2px solid ${colors.warning};
  padding: 1rem 1.5rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px ${colors.shadowMedium};
  transform: translateX(${(props) => (props.isVisible ? '0' : '100%')});
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  max-width: 300px;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CurrentMonthButton = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const ScheduleContainer = styled.div`
  margin-top: 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem;
  font-style: italic;
`;

export const WorkoutItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  background: var(--color-card);
  border-radius: 6px;
  /* border: 1px solid var(--color-border); */
`;

export const WorkoutInfo = styled.div`
  flex: 1;
`;

export const WorkoutName = styled.div`
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.25rem;
`;

export const WorkoutDate = styled.div`
  font-size: 0.9rem;
  color: var(--color-text-muted);
`;

export const RemoveAllContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

export const RemoveAllButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-danger);
  color: var(--color-white);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
