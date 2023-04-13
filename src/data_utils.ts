import { Exercises, WorkoutOverview } from '@/api/supabase';

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
  includeCarrying: boolean
) => {
  return exercises?.filter((exercise) => {
    const muscleGroupsMatch = exercise.muscles_targeted.some((muscle) =>
      selectedMuscleGroups
        .map((muscleGroup) => muscleGroup.value)
        .includes(muscle.trim().toLowerCase())
    );
    const skillLevelMatch =
      skillLevelRankings[exercise.difficulty] <= skillLevelRankings[skillLevel];
    const bodyweightMatch = exercise.is_body_weight === includeBodyWeight;
    const explosiveMatch = exercise.is_explosive === includeExposive;
    const carryingMatch = exercise.requires_walking_room === includeCarrying;
    return (
      muscleGroupsMatch &&
      skillLevelMatch &&
      bodyweightMatch &&
      explosiveMatch &&
      carryingMatch
    );
  });
};

const getExercisesForWorkoutOverview = (
  newWorkoutOverview: WorkoutOverview,
  filteredExercises: Exercises
) => {
  return newWorkoutOverview?.segments.map((segment) => {
    if (segment.type === 'EMOM') {
      return {
        [segment.title]: getRandomValuesFromArray(
          filteredExercises,
          getRandomInt(2, 3)
        )?.map((exercise) => exercise.id),
      };
    } else if (segment.type === 'AMRAP') {
      return {
        [segment.title]: getRandomValuesFromArray(
          filteredExercises,
          getRandomInt(3, 5)
        )?.map((exercise) => exercise.id),
      };
    } else {
      throw new Error('Unknown workout segment type');
    }
  });
};

function getRandomValuesFromArray<T>(arr: T[], numValues: number): T[] {
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

function getRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

export { getExercisesForWorkoutOverview };
