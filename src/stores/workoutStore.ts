import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { databaseService, migrateFromLocalStorage } from '../services/database';
import type { Workout, WorkoutAssignment } from '../types';
import { DEFAULT_WORKOUTS } from '../types';
import { formatDate } from '../utils/dateUtils';

interface WorkoutStore {
  // State
  workouts: Workout[];
  workoutAssignments: WorkoutAssignment[];
  selectedDate: string | null;
  selectedWorkout: Workout | null;
  currentMonth: Date;
  scheduleMonth: Date;
  scheduleWeek: Date;
  scheduleView: 'weekly' | 'monthly';
  currentView: 'calendar' | 'schedule';
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  toastVisible: boolean;
  toastMessage: string;

  // Simple Setters
  setWorkouts: (workouts: Workout[]) => void;
  setWorkoutAssignments: (assignments: WorkoutAssignment[]) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedWorkout: (workout: Workout | null) => void;
  setCurrentMonth: (month: Date) => void;
  setScheduleMonth: (month: Date) => void;
  setScheduleWeek: (week: Date) => void;
  setScheduleView: (view: 'weekly' | 'monthly') => void;
  setCurrentView: (view: 'calendar' | 'schedule') => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsModalOpen: (open: boolean) => void;
  setToastVisible: (visible: boolean) => void;
  setToastMessage: (message: string) => void;

  // Complex Actions
  loadData: () => Promise<void>;
  updateExercise: (workoutId: string, exerciseId: string, field: string, value: string) => void;
  assignWorkout: () => Promise<void>;
  removeWorkout: () => Promise<void>;
  removeWorkoutFromSchedule: (date: string) => Promise<void>;
  removeAllWorkoutsFromSchedule: () => Promise<void>;
  selectDate: (date: string) => void;
  selectWorkout: (workout: Workout) => void;
  changeMonth: (direction: 'prev' | 'next') => void;
  changeScheduleMonth: (direction: 'prev' | 'next') => void;
  changeScheduleWeek: (direction: 'prev' | 'next') => void;
  goToToday: () => void;
  goToTodaySchedule: () => void;
  goToTodayWeekSchedule: () => void;
  showToast: (message: string) => void;
  markWorkoutAsDone: (date: string, done: boolean) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        workouts: DEFAULT_WORKOUTS,
        workoutAssignments: [],
        selectedDate: new Date().toISOString().split('T')[0],
        selectedWorkout: null,
        currentMonth: new Date(),
        scheduleMonth: new Date(),
        scheduleWeek: new Date(),
        scheduleView: 'weekly',
        currentView: 'calendar',
        isLoading: true,
        error: null,
        isModalOpen: false,
        toastVisible: false,
        toastMessage: '',

        // Simple Setters
        setWorkouts: (workouts) => set({ workouts }),
        setWorkoutAssignments: (workoutAssignments) => set({ workoutAssignments }),
        setSelectedDate: (selectedDate) => set({ selectedDate }),
        setSelectedWorkout: (selectedWorkout) => set({ selectedWorkout }),
        setCurrentMonth: (currentMonth) => set({ currentMonth }),
        setScheduleMonth: (scheduleMonth) => set({ scheduleMonth }),
        setScheduleWeek: (scheduleWeek) => set({ scheduleWeek }),
        setScheduleView: (scheduleView) => set({ scheduleView }),
        setCurrentView: (currentView) => set({ currentView }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
        setToastVisible: (toastVisible) => set({ toastVisible }),
        setToastMessage: (toastMessage) => set({ toastMessage }),

        // Complex Actions
        loadData: async () => {
          set({ isLoading: true, error: null });
          try {
            await migrateFromLocalStorage();
            const [workouts, assignments] = await Promise.all([
              databaseService.loadWorkouts(),
              databaseService.loadAssignments(),
            ]);
            set({
              workouts: workouts.length > 0 ? workouts : DEFAULT_WORKOUTS,
              workoutAssignments: assignments,
            });
          } catch (err) {
            console.error('Failed to load data from database:', err);
            set({ error: 'Failed to load data from database' });

            // Fallback to localStorage
            const savedWorkouts = localStorage.getItem('workoutPlannerWorkouts');
            const savedAssignments = localStorage.getItem('workoutPlannerAssignments');
            if (savedWorkouts) set({ workouts: JSON.parse(savedWorkouts) });
            if (savedAssignments) set({ workoutAssignments: JSON.parse(savedAssignments) });
          } finally {
            set({ isLoading: false });
          }
        },

        updateExercise: (workoutId, exerciseId, field, value) => {
          const { workouts, selectedWorkout } = get();

          const updatedWorkouts = workouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  exercises: workout.exercises.map((exercise) => {
                    if (exercise.id === exerciseId) {
                      let processedValue = value;

                      // Enforce minimum value of 1 for numeric fields
                      if (field === 'minReps' || field === 'maxReps' || field === 'sets' || field === 'weight') {
                        const numValue = parseFloat(value);
                        if (!isNaN(numValue) && numValue < 1) {
                          processedValue = '1';
                        }
                      }

                      const updatedExercise = { ...exercise, [field]: processedValue };

                      // Auto-adjust logic: if min reps is set higher than max reps, auto-adjust max
                      if (field === 'minReps') {
                        const minReps = parseInt(processedValue);
                        const maxReps = parseInt(exercise.maxReps);

                        if (!isNaN(minReps) && !isNaN(maxReps) && minReps > maxReps && maxReps > 0) {
                          updatedExercise.maxReps = processedValue;
                        }
                      }

                      return updatedExercise;
                    }
                    return exercise;
                  }),
                }
              : workout
          );

          // Update selectedWorkout if it's the one being modified
          let newSelectedWorkout = selectedWorkout;
          if (selectedWorkout && selectedWorkout.id === workoutId) {
            const updatedWorkout = updatedWorkouts.find((w) => w.id === workoutId);
            if (updatedWorkout) {
              newSelectedWorkout = updatedWorkout;
            }
          }

          set({ workouts: updatedWorkouts, selectedWorkout: newSelectedWorkout });

          // Save to database
          databaseService.saveWorkouts(updatedWorkouts).catch((err) => {
            console.error('Failed to save workouts:', err);
            localStorage.setItem('workoutPlannerWorkouts', JSON.stringify(updatedWorkouts));
          });
        },

        selectDate: (date) => {
          const { workoutAssignments, workouts } = get();
          const existingAssignment = workoutAssignments.find((assignment) => assignment.date === date);
          const selectedWorkout = existingAssignment
            ? workouts.find((w) => w.id === existingAssignment.workoutId) || null
            : null;

          set({ selectedDate: date, selectedWorkout });
        },

        selectWorkout: (workout) => {
          set({ selectedWorkout: workout, isModalOpen: true });
        },

        assignWorkout: async () => {
          const { selectedDate, selectedWorkout, workoutAssignments } = get();
          if (!selectedDate || !selectedWorkout) return;

          const newAssignment: WorkoutAssignment = {
            date: selectedDate,
            workoutId: selectedWorkout.id,
          };

          try {
            await databaseService.saveAssignment(newAssignment);
            const filteredAssignments = workoutAssignments.filter((assignment) => assignment.date !== selectedDate);

            set({
              workoutAssignments: [...filteredAssignments, newAssignment],
              isModalOpen: false,
            });

            const hasAssignedWorkout = workoutAssignments.some((assignment) => assignment.date === selectedDate);
            const action = hasAssignedWorkout ? 'replaced with' : 'assigned to';
            get().showToast(`${selectedWorkout.name} ${action} ${formatDate(selectedDate)}`);
          } catch (err) {
            console.error('Failed to assign workout:', err);
            set({ error: 'Failed to assign workout' });
          }
        },

        removeWorkout: async () => {
          const { selectedDate, workoutAssignments } = get();
          if (!selectedDate) return;

          const assignment = workoutAssignments.find((a) => a.date === selectedDate);
          if (assignment?.done) {
            get().showToast('Cannot delete completed workouts');
            return;
          }

          try {
            await databaseService.deleteAssignment(selectedDate);
            set((state) => ({
              workoutAssignments: state.workoutAssignments.filter((assignment) => assignment.date !== selectedDate),
              selectedWorkout: null,
              isModalOpen: false,
            }));
            get().showToast(`Workout removed for ${formatDate(selectedDate)}`);
          } catch (err) {
            console.error('Failed to remove workout:', err);
            set({ error: 'Failed to remove workout' });
          }
        },

        removeWorkoutFromSchedule: async (date) => {
          const { workoutAssignments } = get();
          const assignment = workoutAssignments.find((a) => a.date === date);

          if (assignment?.done) {
            get().showToast('Cannot delete completed workouts');
            return;
          }

          try {
            await databaseService.deleteAssignment(date);
            set((state) => ({
              workoutAssignments: state.workoutAssignments.filter((assignment) => assignment.date !== date),
            }));
          } catch (err) {
            console.error('Failed to remove workout from schedule:', err);
            set({ error: 'Failed to remove workout' });
          }
        },

        removeAllWorkoutsFromSchedule: async () => {
          const { scheduleMonth, workoutAssignments } = get();
          const year = scheduleMonth.getFullYear();
          const month = scheduleMonth.getMonth();

          // Get all assignments for the month
          const monthAssignments = workoutAssignments.filter((assignment) => {
            const assignmentDate = new Date(assignment.date);
            return assignmentDate.getFullYear() === year && assignmentDate.getMonth() === month;
          });

          // Filter to get only non-completed workouts
          const nonCompletedAssignments = monthAssignments.filter((a) => !a.done);
          const completedCount = monthAssignments.length - nonCompletedAssignments.length;

          if (nonCompletedAssignments.length === 0) {
            if (completedCount > 0) {
              get().showToast('No incomplete workouts to remove (completed workouts preserved)');
            } else {
              get().showToast('No workouts to remove');
            }
            return;
          }

          try {
            // Delete only non-completed assignments
            for (const assignment of nonCompletedAssignments) {
              await databaseService.deleteAssignment(assignment.date);
            }

            // Update state to remove only non-completed assignments
            set((state) => ({
              workoutAssignments: state.workoutAssignments.filter((assignment) => {
                const assignmentDate = new Date(assignment.date);
                const isInMonth = assignmentDate.getFullYear() === year && assignmentDate.getMonth() === month;
                // Keep if not in this month, or if in this month but completed
                return !isInMonth || assignment.done;
              }),
            }));

            const monthName = scheduleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            if (completedCount > 0) {
              get().showToast(
                `${nonCompletedAssignments.length} incomplete workouts removed for ${monthName} (${completedCount} completed workouts preserved)`
              );
            } else {
              get().showToast(`All ${nonCompletedAssignments.length} workouts removed for ${monthName}`);
            }
          } catch (err) {
            console.error('Failed to remove workouts:', err);
            set({ error: 'Failed to remove workouts' });
          }
        },

        changeMonth: (direction) => {
          set((state) => {
            const newMonth = new Date(state.currentMonth);
            if (direction === 'prev') {
              newMonth.setMonth(newMonth.getMonth() - 1);
            } else {
              newMonth.setMonth(newMonth.getMonth() + 1);
            }
            return { currentMonth: newMonth };
          });
        },

        changeScheduleMonth: (direction) => {
          set((state) => {
            const newMonth = new Date(state.scheduleMonth);
            if (direction === 'prev') {
              newMonth.setMonth(newMonth.getMonth() - 1);
            } else {
              newMonth.setMonth(newMonth.getMonth() + 1);
            }
            return { scheduleMonth: newMonth };
          });
        },

        changeScheduleWeek: (direction) => {
          set((state) => {
            const newWeek = new Date(state.scheduleWeek);
            if (direction === 'prev') {
              newWeek.setDate(newWeek.getDate() - 7);
            } else {
              newWeek.setDate(newWeek.getDate() + 7);
            }
            return { scheduleWeek: newWeek };
          });
        },

        goToToday: () => {
          const today = new Date();
          const todayStr = today.toISOString().split('T')[0];
          set({ currentMonth: today });
          get().selectDate(todayStr);
        },

        goToTodaySchedule: () => {
          const today = new Date();
          set({ scheduleMonth: today });
        },

        goToTodayWeekSchedule: () => {
          const today = new Date();
          set({ scheduleWeek: today });
        },

        showToast: (message) => {
          set({ toastMessage: message, toastVisible: true, error: null });
        },

        markWorkoutAsDone: async (date, done) => {
          try {
            await databaseService.updateAssignmentDone(date, done);
            set((state) => ({
              workoutAssignments: state.workoutAssignments.map((assignment) =>
                assignment.date === date ? { ...assignment, done } : assignment
              ),
            }));
            get().showToast(`Workout marked as ${done ? 'done' : 'not done'}`);
          } catch (err) {
            console.error('Failed to update workout status:', err);
            set({ error: 'Failed to update workout status' });
          }
        },
      }),
      {
        name: 'workout-store',
        partialize: (state) => ({
          // Only persist essential data, not UI state
          workouts: state.workouts,
          workoutAssignments: state.workoutAssignments,
        }),
      }
    ),
    {
      name: 'workout-store', // Name for devtools
    }
  )
);

// Store is available in devtools without Zukeeper to avoid setState errors
if (typeof window !== 'undefined') {
  (window as any).store = useWorkoutStore;
}
