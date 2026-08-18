interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 2) throw new Error("Too many arguments");

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      value1: Number(args[0]),
      value2: Number(args[1]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const bmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  let status;

  switch (true) {
    case bmi < 16:
      status = "Underweight (Severe thinness)";
      break;
    case bmi < 17:
      status = "Underweight (Moderate thinness)";
      break;
    case bmi < 18.5:
      status = "Underweight (Mild thinness)";
      break;
    case bmi < 25:
      status = "Normal range";
      break;
    case bmi < 30:
      status = "Overweight (Pre-obese)";
      break;
    case bmi < 35:
      status = "Obese (Class I)";
      break;
    case bmi < 40:
      status = "Obese (Class II)";
      break;
    default:
      status = "Obese (Class III)";
  }
  console.log(status);
  return status;
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { value1, value2 } = parseArguments(process.argv.slice(2));
    bmi(value1, value2);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
