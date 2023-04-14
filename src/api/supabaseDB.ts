import { createClient } from '@supabase/supabase-js';
import { WorkoutOverview } from 'supabase/functions/generate_workout';

import { Database } from '@/lib/database.types';

// Initialize Supabase Client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const getExercises = () => {
  return supabase
    .from('exercises')
    .select('*')
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        return res.data;
      }
    });
};

export const getWorkouts = () => {
  return supabase
    .from('workouts')
    .select('*')
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        return res.data;
      }
    });
};

export const saveWorkout = (
  workoutOverview: WorkoutOverview,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  isBodyWeight: boolean,
  isExplosive: boolean,
  requiresDoubleBells: boolean,
  requiresWalkingRoom: boolean,
  musclesTargeted: string[],
  selectedExercises: { [key: string]: number[] }
) => {
  return supabase
    .from('workouts')
    .insert({
      description: workoutOverview.description,
      difficulty: difficulty,
      duration: workoutOverview.duration,
      is_body_weight: isBodyWeight,
      is_explosive: isExplosive,
      muscles_targeted: musclesTargeted,
      requires_double_bells: requiresDoubleBells,
      requires_walking_room: requiresWalkingRoom,
      segments_with_exercises: selectedExercises,
      title: workoutOverview.title,
    })
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        return res.data;
      }
    });
};

export const getMuscleGroups = () => {
  return supabase
    .from('muscle_groups')
    .select('distinct unnest(muscle_groups) AS muscle_group')
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        return res.data as string[];
      }
    });
};

export type Workouts = Awaited<ReturnType<typeof getWorkouts>>;
export type Exercises = Awaited<ReturnType<typeof getExercises>>;
