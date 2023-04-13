// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createClient } from '@supabase/supabase-js';

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

type generateWorkoutType = (
  duration: number,
  muscle_groups: string[],
  skill_level: string,
  retryCount?: number
) => Promise<WorkoutOverview>;
export const generateNewWorkout: generateWorkoutType = async (
  duration: number,
  muscle_groups: string[],
  skill_level: string,
  retryCount = 0
) => {
  const res = await supabase.functions.invoke('generate_workout', {
    body: JSON.stringify({
      duration,
      muscle_groups,
      skill_level,
    }),
  });
  if (res.error && retryCount < 3) {
    return (await generateNewWorkout(
      duration,
      muscle_groups,
      skill_level,
      retryCount + 1
    )) as WorkoutOverview;
  } else {
    return res.data as WorkoutOverview;
  }
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

export type WorkoutOverview = {
  title: string;
  description: string;
  duration: number;
  segments: {
    title: string;
    type: 'AMRAP' | 'EMOM';
    duration: number;
  }[];
};

export type Exercises = Awaited<ReturnType<typeof getExercises>>;
