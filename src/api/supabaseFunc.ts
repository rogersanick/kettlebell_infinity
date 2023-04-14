// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createClient } from '@supabase/supabase-js';
import { WorkoutOverview } from 'supabase/functions/generate_workout';

import { Database } from '@/lib/database.types';

import { Exercises } from '@/api/supabaseDB';

// Initialize Supabase Client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Get new workout overview
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

type selectExercisesType = (
  workoutOverview: WorkoutOverview,
  exercises: Exercises,
  retryCount?: number
) => Promise<string[][]>;
export const selectExercisesForSegment: selectExercisesType = async (
  workoutOverview: WorkoutOverview,
  exercises,
  retryCount = 0
) => {
  const formattedSegments = workoutOverview.segments.map(
    (segment) =>
      `title: ${segment.title}, duration: ${segment.duration}, type: ${segment.type}`
  );
  const formattedExercises = exercises.map(
    (exercise) =>
      `title: ${exercise.title}, muscle_group: ${exercise.muscles_targeted}, skill_level: ${exercise.difficulty}`
  );
  const res = await supabase.functions.invoke('select_exercises', {
    body: JSON.stringify({
      segments: formattedSegments,
      exercises: formattedExercises,
    }),
  });
  if (res.error && retryCount < 3) {
    return (await selectExercisesForSegment(
      workoutOverview,
      exercises,
      retryCount + 1
    )) as string[][];
  } else {
    return res.data as string[][];
  }
};
