import express, { type Request, type Response } from "express";
import { bmi } from "./bmiCalculator.ts";
import {
  calculateExercises,
  type ExerciseResponse,
} from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

interface BmiResponse {
  weight: number;
  height: number;
  bmi: string;
}
interface ErrorResponse {
  error: string;
}

type BmiApiResponse = BmiResponse | ErrorResponse;

app.get("/bmi", (req: Request, res: Response<BmiApiResponse>) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  return res.json({
    weight,
    height,
    bmi: bmi(height, weight),
  });
});

type ExerciseApiResponse = ExerciseResponse | ErrorResponse;

interface Params {
  daily_exercises: number[];
  target: number;
}

app.post("/exercises", (req: Request, res: Response<ExerciseApiResponse>) => {
  const { daily_exercises, target }: Params = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (isNaN(target) || daily_exercises.some((e) => isNaN(e))) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
