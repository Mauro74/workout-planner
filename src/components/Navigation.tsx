import { MdCalendarMonth, MdOutlineSchedule } from 'react-icons/md';
import { TabContainer, TabButton } from '../styles';

export const Navigation = ({
  currentView,
  setCurrentView,
}: {
  currentView: 'calendar' | 'schedule';
  setCurrentView: (view: 'calendar' | 'schedule') => void;
}) => {
  return (
    <TabContainer activeTab={currentView}>
      <TabButton isActive={currentView === 'calendar'} onClick={() => setCurrentView('calendar')}>
        <MdCalendarMonth size={18} />
        <span>Planner</span>
      </TabButton>
      <TabButton isActive={currentView === 'schedule'} onClick={() => setCurrentView('schedule')}>
        <MdOutlineSchedule size={18} />
        <span>Schedule</span>
      </TabButton>
    </TabContainer>
  );
};
