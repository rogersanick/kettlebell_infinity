type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface InputParameters {
  bodyWeight: number;
  maxBodyWeightPercentage: number;
  minBodyWeightPercentage: number;
  maxReps: number;
  minReps: number;
  skillLevel: SkillLevel;
  availableWeights: number[];
}

interface RepsAndWeight {
  weight: number;
  reps: number;
}

function calculateWeightAndReps({
  bodyWeight,
  maxBodyWeightPercentage,
  minBodyWeightPercentage,
  maxReps,
  minReps,
  skillLevel,
  availableWeights,
}: InputParameters): RepsAndWeight {
  // Function to find the closest available weight
  const findClosestWeight = (targetWeight: number) => {
    return availableWeights.reduce((prev, curr) =>
      Math.abs(curr - targetWeight) < Math.abs(prev - targetWeight)
        ? curr
        : prev
    );
  };

  let weight: number;
  switch (skillLevel) {
    case 'Beginner':
      weight = findClosestWeight(bodyWeight * minBodyWeightPercentage);
      break;
    case 'Intermediate':
      weight = findClosestWeight(
        (bodyWeight * (maxBodyWeightPercentage + minBodyWeightPercentage)) / 2
      );
      break;
    case 'Advanced':
      weight = findClosestWeight(bodyWeight * maxBodyWeightPercentage);
      break;
    default:
      throw new Error('Invalid skill level');
  }

  // Calculate the reps based on a quadratically diminishing equation
  const maxWeight = bodyWeight * maxBodyWeightPercentage;
  const scaleFactor = (maxReps - minReps) / Math.pow(maxWeight, 2);
  const reps = maxReps - scaleFactor * Math.pow(weight, 2);

  return {
    weight: Math.round(weight),
    reps: Math.round(reps),
  };
}

export default calculateWeightAndReps;
