export interface ExerciseResponse {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface MultiplyVals {
  value1: number;
  value2: number[];
}

const parseArgs = (args: string[]): MultiplyVals => {
  if (args.every((a) => !isNaN(Number(a)))) {
    return {
      value1: Number(args[0]),
      value2: args.slice(1).map(Number),
    };
  }
  throw new Error("Provided values were not numbers!");
};

export const calculateExercises = (
  exerciseHours: number[],
  target: number,
): ExerciseResponse => {
  const completed = exerciseHours.filter((h) => h !== 0).length;
  return {
    periodLength: exerciseHours.length,
    trainingDays: completed,
    success: completed === target,
    rating: completed > target ? 3 : completed === target ? 2 : 1,
    ratingDescription:
      completed > target
        ? "not too bad but could be better"
        : completed === target
          ? "ok"
          : "bad",
    target,
    average:
      exerciseHours.reduce((sum, h) => sum + h, 0) / exerciseHours.length,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { value1, value2 } = parseArgs(process.argv.slice(2));
    //calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
    console.log(calculateExercises(value2, value1));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
