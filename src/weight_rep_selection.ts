type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface InputParameters {
  exerciseTitle: string;
  bodyWeightKGs: number;
  maxBodyWeightPercentage: number;
  minBodyWeightPercentage: number;
  maxReps: number;
  minReps: number;
  skillLevel: SkillLevel;
  availableWeights: number[];
  isBodyWeight: boolean;
}

interface RepsAndWeight {
  weight: number;
  reps: number;
}

// Define the weight scaling factors for each skill level
const skillLevelFactors: Record<SkillLevel, number> = {
  Beginner: 0.8,
  Intermediate: 1.0,
  Advanced: 1.2,
};

function calculateWeightAndReps(input: InputParameters): RepsAndWeight {
  const {
    exerciseTitle,
    bodyWeightKGs,
    maxBodyWeightPercentage,
    minBodyWeightPercentage,
    maxReps,
    minReps,
    skillLevel,
    availableWeights,
    isBodyWeight,
  } = input;

  // Handle bodyweight exercises
  if (isBodyWeight) {
    const weight = 0;
    const reps =
      Math.round((maxReps + minReps) / 2) * skillLevelFactors[skillLevel];
    return { weight, reps };
  }

  // Calculate the weight range
  const maxWeight =
    ((bodyWeightKGs * maxBodyWeightPercentage) / 100) *
    skillLevelFactors[skillLevel];
  const minWeight =
    ((bodyWeightKGs * minBodyWeightPercentage) / 100) *
    skillLevelFactors[skillLevel];

  // Filter available weights within the calculated range
  const filteredWeights = availableWeights.filter(
    (weight) => weight >= minWeight && weight <= maxWeight
  );

  if (filteredWeights.length === 0) {
    throw new Error(
      `No available weights within the provided range | Exercise: ${exerciseTitle} | Range: ${minWeight} - ${maxWeight}.`
    );
  }

  // Find the lowest and highest weights in the filtered range
  const lowestWeight = Math.min(...filteredWeights);
  const highestWeight = Math.max(...filteredWeights);

  // Calculate the center weight
  const centerWeight = (lowestWeight + highestWeight) / 2;

  // Find the weight closest to the center
  const selectedWeight = filteredWeights.reduce((prev, curr) => {
    return Math.abs(curr - centerWeight) < Math.abs(prev - centerWeight)
      ? curr
      : prev;
  });

  // Calculate the reps based on the selected weight
  const weightRange = highestWeight - lowestWeight;
  const selectedWeightPercentage =
    (selectedWeight - lowestWeight) / weightRange;
  const repsRange = maxReps - minReps;
  const selectedReps =
    maxReps - Math.round(selectedWeightPercentage * repsRange);

  return { weight: selectedWeight, reps: selectedReps };
}

export default calculateWeightAndReps;
