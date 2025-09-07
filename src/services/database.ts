import { supabase, isSupabaseConfigured } from '../config/supabase';
import type { Workout, WorkoutAssignment } from '../types';

export interface DatabaseService {
  saveWorkouts(workouts: Workout[]): Promise<void>;
  loadWorkouts(): Promise<Workout[]>;
  saveWorkout(workout: Workout): Promise<void>;
  deleteWorkout(workoutId: string): Promise<void>;
  saveAssignments(assignments: WorkoutAssignment[]): Promise<void>;
  loadAssignments(): Promise<WorkoutAssignment[]>;
  saveAssignment(assignment: WorkoutAssignment): Promise<void>;
  updateAssignmentDone(date: string, done: boolean): Promise<void>;
  deleteAssignment(date: string): Promise<void>;
  deleteAssignmentsByMonth(year: number, month: number): Promise<void>;
}

class SupabaseService implements DatabaseService {
  async saveWorkouts(workouts: Workout[]): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('workouts')
      .upsert(workouts.map(workout => ({
        id: workout.id,
        name: workout.name,
        exercises: workout.exercises as any
      })) as any);

    if (error) {
      throw new Error(`Failed to save workouts: ${error.message}`);
    }
  }

  async loadWorkouts(): Promise<Workout[]> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to load workouts: ${error.message}`);
    }

    return (data as any[])?.map(row => ({
      id: row.id,
      name: row.name,
      exercises: row.exercises
    })) || [];
  }

  async saveWorkout(workout: Workout): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('workouts')
      .upsert({
        id: workout.id,
        name: workout.name,
        exercises: workout.exercises as any
      } as any);

    if (error) {
      throw new Error(`Failed to save workout: ${error.message}`);
    }
  }

  async deleteWorkout(workoutId: string): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', workoutId);

    if (error) {
      throw new Error(`Failed to delete workout: ${error.message}`);
    }
  }

  async saveAssignments(assignments: WorkoutAssignment[]): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('workout_assignments')
      .upsert(assignments.map(assignment => ({
        date: assignment.date,
        workout_id: assignment.workoutId
      })) as any);

    if (error) {
      throw new Error(`Failed to save assignments: ${error.message}`);
    }
  }

  async loadAssignments(): Promise<WorkoutAssignment[]> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('workout_assignments')
      .select('*')
      .order('date');

    if (error) {
      throw new Error(`Failed to load assignments: ${error.message}`);
    }

    return (data as any[])?.map(row => ({
      date: row.date,
      workoutId: row.workout_id,
      done: row.done || false
    })) || [];
  }

  async saveAssignment(assignment: WorkoutAssignment): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('workout_assignments')
      .upsert({
        date: assignment.date,
        workout_id: assignment.workoutId,
        done: assignment.done || false
      } as any);

    if (error) {
      throw new Error(`Failed to save assignment: ${error.message}`);
    }
  }

  async updateAssignmentDone(date: string, done: boolean): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('workout_assignments')
      .update({ done })
      .eq('date', date);

    if (error) {
      throw new Error(`Failed to update assignment: ${error.message}`);
    }
  }

  async deleteAssignment(date: string): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('workout_assignments')
      .delete()
      .eq('date', date);

    if (error) {
      throw new Error(`Failed to delete assignment: ${error.message}`);
    }
  }

  async deleteAssignmentsByMonth(year: number, month: number): Promise<void> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured');
    }

    // Create date range for the month
    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month + 1).padStart(2, '0')}-31`;

    const { error } = await supabase
      .from('workout_assignments')
      .delete()
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) {
      throw new Error(`Failed to delete assignments for month: ${error.message}`);
    }
  }
}

// Fallback localStorage service for when Supabase is not configured
class LocalStorageService implements DatabaseService {
  async saveWorkouts(workouts: Workout[]): Promise<void> {
    localStorage.setItem('workoutPlannerWorkouts', JSON.stringify(workouts));
  }

  async loadWorkouts(): Promise<Workout[]> {
    const saved = localStorage.getItem('workoutPlannerWorkouts');
    return saved ? JSON.parse(saved) : [];
  }

  async saveWorkout(workout: Workout): Promise<void> {
    const workouts = await this.loadWorkouts();
    const index = workouts.findIndex(w => w.id === workout.id);
    if (index >= 0) {
      workouts[index] = workout;
    } else {
      workouts.push(workout);
    }
    await this.saveWorkouts(workouts);
  }

  async deleteWorkout(workoutId: string): Promise<void> {
    const workouts = await this.loadWorkouts();
    const filtered = workouts.filter(w => w.id !== workoutId);
    await this.saveWorkouts(filtered);
  }

  async saveAssignments(assignments: WorkoutAssignment[]): Promise<void> {
    localStorage.setItem('workoutPlannerAssignments', JSON.stringify(assignments));
  }

  async loadAssignments(): Promise<WorkoutAssignment[]> {
    const saved = localStorage.getItem('workoutPlannerAssignments');
    return saved ? JSON.parse(saved) : [];
  }

  async saveAssignment(assignment: WorkoutAssignment): Promise<void> {
    const assignments = await this.loadAssignments();
    const index = assignments.findIndex(a => a.date === assignment.date);
    if (index >= 0) {
      assignments[index] = assignment;
    } else {
      assignments.push(assignment);
    }
    await this.saveAssignments(assignments);
  }

  async updateAssignmentDone(date: string, done: boolean): Promise<void> {
    const assignments = await this.loadAssignments();
    const index = assignments.findIndex(a => a.date === date);
    if (index >= 0) {
      assignments[index].done = done;
      await this.saveAssignments(assignments);
    }
  }

  async deleteAssignment(date: string): Promise<void> {
    const assignments = await this.loadAssignments();
    const filtered = assignments.filter(a => a.date !== date);
    await this.saveAssignments(filtered);
  }

  async deleteAssignmentsByMonth(year: number, month: number): Promise<void> {
    const assignments = await this.loadAssignments();
    const filtered = assignments.filter(assignment => {
      const assignmentDate = new Date(assignment.date);
      return !(assignmentDate.getFullYear() === year && assignmentDate.getMonth() === month);
    });
    await this.saveAssignments(filtered);
  }
}

// Export the appropriate service based on configuration
export const databaseService: DatabaseService = isSupabaseConfigured() 
  ? new SupabaseService() 
  : new LocalStorageService();

// Migration utility to move data from localStorage to Supabase
export const migrateFromLocalStorage = async (): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Cannot migrate: Supabase not configured');
    return;
  }

  try {
    // Check if data exists in localStorage
    const localWorkouts = localStorage.getItem('workoutPlannerWorkouts');
    const localAssignments = localStorage.getItem('workoutPlannerAssignments');

    if (localWorkouts) {
      const workouts: Workout[] = JSON.parse(localWorkouts);
      await new SupabaseService().saveWorkouts(workouts);
      console.log('Migrated workouts to Supabase');
    }

    if (localAssignments) {
      const assignments: WorkoutAssignment[] = JSON.parse(localAssignments);
      await new SupabaseService().saveAssignments(assignments);
      console.log('Migrated assignments to Supabase');
    }

    // Optionally clear localStorage after successful migration
    // localStorage.removeItem('workoutPlannerWorkouts');
    // localStorage.removeItem('workoutPlannerAssignments');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};
