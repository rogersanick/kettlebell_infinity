import { SupabaseClient } from '@supabase/supabase-js';

import { getSupabase } from '@/api/supabaseClient';
import { WorkoutOverview } from '@/api/supabaseFunc';

export const getExercises = () => {
  const supabase = getSupabase();
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

export const getWorkouts = async (client: SupabaseClient) => {
  const userResponse = await client.auth.getUser();
  const userId = userResponse?.data.user?.id;
  return client
    .from('workouts')
    .select()
    .eq('user_id', userId)
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        return res.data;
      }
    });
};

export const getWorkout = (id: string, client: SupabaseClient) => {
  return client
    .from('workouts')
    .select('*')
    .limit(1)
    .eq('id', id)
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        return res.data[0];
      }
    });
};

export const saveWorkout = async (
  client: SupabaseClient,
  workoutOverview: WorkoutOverview,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  isBodyWeight: boolean,
  isExplosive: boolean,
  requiresDoubleBells: boolean,
  requiresWalkingRoom: boolean,
  musclesTargeted: string[],
  selectedExercises: {
    [key: string]: {
      duration: number;
      exerciseIds: number[];
    };
  }
) => {
  return client
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

export const deleteWorkout = (id: number) => {
  const supabase = getSupabase();
  return supabase
    .from('workouts')
    .delete()
    .eq('id', id)
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        return res.data;
      }
    });
};

export const getMuscleGroups = () => {
  const supabase = getSupabase();
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

export type Workout = Awaited<ReturnType<typeof getWorkout>>;
export type WorkoutSegmentsJSONRepresentation = {
  [key: string]: SegmentJSONRepresentation;
};
export type SegmentJSONRepresentation = {
  exerciseIds: number[];
  type: 'AMRAP' | 'EMOM';
  duration: number;
};

export type Workouts = Awaited<ReturnType<typeof getWorkouts>>;
export type Exercises = Awaited<ReturnType<typeof getExercises>>;
