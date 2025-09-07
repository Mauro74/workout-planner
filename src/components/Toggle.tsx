import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  gap: 0.75rem;
`;

const ToggleLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-light);
`;

const ToggleSwitch = styled.div<{ isOn: boolean }>`
  position: relative;
  width: 50px;
  height: 30px;
  background: ${(props) => (props.isOn ? 'var(--color-success)' : '#E5E5EA')};
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${(props) => (props.isOn ? '22px' : '2px')};
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 50%;
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

interface ToggleProps {
  label: string;
  isOn: boolean;
  onToggle: (value: boolean) => void;
}

export const Toggle = ({ label, isOn, onToggle }: ToggleProps) => {
  return (
    <ToggleContainer>
      <ToggleLabel>{label}</ToggleLabel>
      <ToggleSwitch isOn={isOn} onClick={() => onToggle(!isOn)} />
    </ToggleContainer>
  );
};
