import { WorkoutOverview } from 'supabase/functions/generate_workout';

import { Exercises, WorkoutSegmentsJSONRepresentation } from '@/api/supabaseDB';

const skillLevelRankings = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
} as { [key: string]: number };

export const filteredExercisesForWorkoutOverview = (
  exercises: Exercises,
  selectedMuscleGroups: { label: string; value: string }[],
  skillLevel: string,
  includeBodyWeight: boolean,
  includeExposive: boolean,
  includeCarrying: boolean,
  includeDoubleBells: boolean
) => {
  return exercises?.filter((exercise) => {
    const muscleGroupsMatch = exercise.muscles_targeted.some((muscle) =>
      selectedMuscleGroups
        .map((muscleGroup) => muscleGroup.value)
        .includes(muscle.trim().toLowerCase())
    );
    const skillLevelMatch =
      skillLevelRankings[exercise.difficulty] <= skillLevelRankings[skillLevel];
    const bodyweightMatch = includeBodyWeight
      ? true
      : exercise.is_body_weight === includeBodyWeight;
    const explosiveMatch = includeExposive
      ? true
      : exercise.is_explosive === includeExposive;
    const carryingMatch = includeCarrying
      ? true
      : exercise.requires_walking_room === includeCarrying;
    const doubleBellsMatch = includeDoubleBells
      ? true
      : exercise.requires_double_bells === includeDoubleBells;
    return (
      muscleGroupsMatch &&
      skillLevelMatch &&
      bodyweightMatch &&
      explosiveMatch &&
      carryingMatch &&
      doubleBellsMatch
    );
  });
};

const getExercisesForWorkoutOverview = (
  newWorkoutOverview: WorkoutOverview,
  filteredExercises: Exercises
): WorkoutSegmentsJSONRepresentation[] => {
  return newWorkoutOverview?.segments.map((segment) => {
    if (segment.type === 'EMOM') {
      return {
        [segment.title]: {
          duration: segment.duration,
          type: segment.type,
          exerciseIds: getRandomValuesFromArray(
            filteredExercises,
            getRandomInt(2, 3)
          )?.map((exercise) => exercise.id),
        },
      };
    } else if (segment.type === 'AMRAP') {
      return {
        [segment.title]: {
          duration: segment.duration,
          type: segment.type,
          exerciseIds: getRandomValuesFromArray(
            filteredExercises,
            getRandomInt(3, 4)
          )?.map((exercise) => exercise.id),
        },
      };
    } else {
      throw new Error('Unknown workout segment type');
    }
  });
};

const replaceExerciseInSegment = (
  selectedSegment: string,
  oldExerciseId: number,
  newExerciseId: number,
  segmentExercises: WorkoutSegmentsJSONRepresentation
) => {
  const newSegmentExercises = { ...segmentExercises };
  const oldExercises = newSegmentExercises[selectedSegment].exerciseIds;
  const oldExerciseIndex = oldExercises.findIndex(
    (exercise) => exercise === oldExerciseId
  );
  oldExercises[oldExerciseIndex] = newExerciseId;
  return newSegmentExercises;
};

export function getRandomValuesFromArray<T>(arr: T[], numValues: number): T[] {
  const randomValues: T[] = [];
  while (randomValues.length < numValues) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomValue = arr[randomIndex];
    if (!randomValues.includes(randomValue)) {
      randomValues.push(randomValue);
    }
  }
  return randomValues;
}

export function getRandomValueFromArray<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

export { getExercisesForWorkoutOverview, replaceExerciseInSegment };
