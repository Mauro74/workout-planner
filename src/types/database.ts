import type { Exercise } from '../types';

export interface Database {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: string;
          name: string;
          exercises: Exercise[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          exercises: Exercise[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          exercises?: Exercise[];
          updated_at?: string;
        };
      };
      workout_assignments: {
        Row: {
          date: string;
          workout_id: string;
          created_at: string;
        };
        Insert: {
          date: string;
          workout_id: string;
          created_at?: string;
        };
        Update: {
          date?: string;
          workout_id?: string;
        };
      };
    };
  };
}
