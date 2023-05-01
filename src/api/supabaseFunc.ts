// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSupabase } from '@/api/supabaseClient';
import { Exercises } from '@/api/supabaseDB';

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
  const supabase = getSupabase();
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
    const workout = res.data as WorkoutOverview;
    const segmentsToRender = [];
    const segments = workout.segments;
    let duration = 0;
    for (let i = 0; i < segments.length; i++) {
      if (duration + segments[i].duration <= workout.duration) {
        segmentsToRender.push(segments[i]);
        duration += segments[i].duration;
      } else {
        break;
      }
    }
    res.data.segments = segmentsToRender;
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
  const supabase = getSupabase();
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

/** TYPE DEFINITIONS */
export interface WorkoutOverview {
  title: string;
  description: string;
  duration: number;
  segments: {
    title: string;
    type: 'AMRAP' | 'EMOM';
    duration: number;
  }[];
}
