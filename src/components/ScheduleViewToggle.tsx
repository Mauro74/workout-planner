import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  background-color: var(--color-background-secondary);
  border-radius: 25px;
  padding: 4px;
  border: 2px solid var(--color-border);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToggleOption = styled.button<{ isActive: boolean }>`
  position: relative;
  padding: 8px 16px;
  border: none;
  background: ${props => props.isActive ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'var(--color-text-muted)'};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  min-width: 70px;
  
  &:hover {
    color: ${props => props.isActive ? 'white' : 'var(--color-text-dark)'};
  }

  ${props => props.isActive && `
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  `}
`;

interface ScheduleViewToggleProps {
  view: 'weekly' | 'monthly';
  onViewChange: (view: 'weekly' | 'monthly') => void;
}

export const ScheduleViewToggle = ({ view, onViewChange }: ScheduleViewToggleProps) => {
  return (
    <ToggleContainer>
      <ToggleWrapper>
        <ToggleOption
          isActive={view === 'weekly'}
          onClick={() => onViewChange('weekly')}
        >
          Weekly
        </ToggleOption>
        <ToggleOption
          isActive={view === 'monthly'}
          onClick={() => onViewChange('monthly')}
        >
          Monthly
        </ToggleOption>
      </ToggleWrapper>
    </ToggleContainer>
  );
};
