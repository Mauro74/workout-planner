import { useEffect, useState } from 'react';
import { AppContainer, Card, ViewContainer, SlideView, SectionTitle, TitleContainer } from './styles';
import { Calendar } from './components/Calendar';
import { MonthlySchedule } from './components/MonthlySchedule';
import { WeeklySchedule } from './components/WeeklySchedule';
import { ScheduleViewToggle } from './components/ScheduleViewToggle';
import { Modal } from './components/Modal';
import { Toast } from './components/Toast';
import { ExerciseList } from './components/ExerciseList';
import { ActionButtonWrapper } from './components/ActionButtonWrapper';
import { formatDate } from './utils/dateUtils';
import { WorkoutSelector } from './components/WorkoutSelector';
import { WorkoutDetailsModal } from './components/WorkoutDetailsModal';
import type { Workout } from './types';
import { useWorkoutStore } from './stores/workoutStore';
import { Navigation } from './components/Navigation';
import { MdOutlineFitnessCenter, MdOutlineSchedule } from 'react-icons/md';

function App() {
  const {
    // State
    workouts,
    workoutAssignments,
    selectedDate,
    selectedWorkout,
    currentMonth,
    scheduleMonth,
    scheduleWeek,
    scheduleView,
    currentView,
    isLoading,
    error,
    isModalOpen,
    toastVisible,
    toastMessage,

    // Actions
    setCurrentView,
    setIsModalOpen,
    setToastVisible,
    setError,
    loadData,
    updateExercise,
    assignWorkout,
    removeWorkout,
    removeWorkoutFromSchedule,
    removeAllWorkoutsFromSchedule,
    selectDate,
    selectWorkout,
    changeMonth,
    changeScheduleMonth,
    changeScheduleWeek,
    goToToday,
    goToTodaySchedule,
    goToTodayWeekSchedule,
    setScheduleView,
    showToast,
    markWorkoutAsDone,
  } = useWorkoutStore();

  // Local state for workout details modal
  const [isWorkoutDetailsModalOpen, setIsWorkoutDetailsModalOpen] = useState(false);
  const [selectedWorkoutForDetails, setSelectedWorkoutForDetails] = useState<Workout | null>(null);
  const [selectedWorkoutDate, setSelectedWorkoutDate] = useState<string | null>(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleMaxRepsBlur = (workoutId: string, exerciseId: string, value: string) => {
    const workout = workouts.find((w) => w.id === workoutId);
    const exercise = workout?.exercises.find((e) => e.id === exerciseId);

    if (exercise) {
      const minReps = parseInt(exercise.minReps);
      const maxReps = parseInt(value);

      if (!isNaN(minReps) && !isNaN(maxReps) && maxReps < minReps && minReps > 0) {
        // Auto-correct max reps to min reps value
        updateExercise(workoutId, exerciseId, 'maxReps', exercise.minReps);
      }
    }
  };

  const handleSaveWorkoutChanges = () => {
    if (selectedDate && selectedWorkout) {
      setIsModalOpen(false);
      showToast(`${selectedWorkout.name} edited for ${formatDate(selectedDate)}`);
    }
  };

  const handleWorkoutClick = (workout: Workout, date: string) => {
    setSelectedWorkoutForDetails(workout);
    setSelectedWorkoutDate(date);
    setIsWorkoutDetailsModalOpen(true);
  };

  const handleMarkAsDone = (done: boolean) => {
    if (selectedWorkoutDate) {
      markWorkoutAsDone(selectedWorkoutDate, done);
    }
  };

  // Get the current workout assignment to check if it's done
  const currentAssignment = selectedWorkoutDate ? workoutAssignments.find((a) => a.date === selectedWorkoutDate) : null;
  const isDone = currentAssignment?.done || false;

  const handleCloseWorkoutDetails = () => {
    setIsWorkoutDetailsModalOpen(false);
    setSelectedWorkoutForDetails(null);
    setSelectedWorkoutDate(null);
  };

  const hasAssignedWorkout = selectedDate
    ? workoutAssignments.some((assignment) => assignment.date === selectedDate)
    : false;

  return (
    <AppContainer>
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <ViewContainer currentView={currentView}>
        <SlideView isActive={currentView === 'calendar'}>
          <Card>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={selectDate}
              workoutAssignments={workoutAssignments}
              currentMonth={currentMonth}
              onMonthChange={changeMonth}
              onGoToToday={goToToday}
            />
          </Card>
          <Card>
            <WorkoutSelector
              workouts={workouts}
              selectedWorkout={selectedWorkout}
              onWorkoutSelect={selectWorkout}
              onExerciseUpdate={updateExercise}
              onAssignWorkout={assignWorkout}
              onRemoveWorkout={removeWorkout}
              selectedDate={selectedDate}
              hasAssignedWorkout={hasAssignedWorkout}
            />
          </Card>
        </SlideView>
        <SlideView isActive={currentView === 'schedule'}>
          <Card>
            <SectionTitle>
              <TitleContainer>
                <MdOutlineSchedule size={24} /> Schedule
              </TitleContainer>
            </SectionTitle>
            <ScheduleViewToggle view={scheduleView} onViewChange={setScheduleView} />
            {scheduleView === 'monthly' ? (
              <MonthlySchedule
                workouts={workouts}
                workoutAssignments={workoutAssignments}
                currentMonth={scheduleMonth}
                onMonthChange={changeScheduleMonth}
                onRemoveWorkout={removeWorkoutFromSchedule}
                onGoToToday={goToTodaySchedule}
                onRemoveAllWorkouts={removeAllWorkoutsFromSchedule}
                onWorkoutClick={handleWorkoutClick}
              />
            ) : (
              <WeeklySchedule
                workouts={workouts}
                workoutAssignments={workoutAssignments}
                currentWeek={scheduleWeek}
                onWeekChange={changeScheduleWeek}
                onRemoveWorkout={removeWorkoutFromSchedule}
                onGoToToday={goToTodayWeekSchedule}
                onWorkoutClick={handleWorkoutClick}
              />
            )}
          </Card>
        </SlideView>
      </ViewContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${selectedWorkout?.name || ''}`}>
        {selectedWorkout && (
          <>
            <ExerciseList
              workout={selectedWorkout}
              onExerciseUpdate={updateExercise}
              onMaxRepsBlur={handleMaxRepsBlur}
            />

            <ActionButtonWrapper
              selectedDate={selectedDate}
              selectedWorkout={selectedWorkout}
              workoutAssignments={workoutAssignments}
              hasAssignedWorkout={hasAssignedWorkout}
              onSaveWorkoutChanges={handleSaveWorkoutChanges}
              onRemoveWorkout={removeWorkout}
              onAssignWorkout={assignWorkout}
            />
          </>
        )}
      </Modal>

      <Toast isVisible={toastVisible} message={toastMessage} onClose={() => setToastVisible(false)} />
      {error && <Toast isVisible={true} message={error} onClose={() => setError(null)} />}

      <WorkoutDetailsModal
        isOpen={isWorkoutDetailsModalOpen}
        onClose={handleCloseWorkoutDetails}
        workout={selectedWorkoutForDetails}
        date={selectedWorkoutDate}
        isDone={isDone}
        onMarkAsDone={handleMarkAsDone}
      />
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '1.4rem',
            borderRadius: '8px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MdOutlineFitnessCenter
            size={34}
            style={{
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}
    </AppContainer>
  );
}

export default App;
