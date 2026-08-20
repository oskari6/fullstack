export const VISIBILITY = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;
export type Visibility = (typeof VISIBILITY)[keyof typeof VISIBILITY];
export const WEATHER = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export type Weather = (typeof WEATHER)[keyof typeof WEATHER];

export interface Diary {
  weather: Weather;
  visibility: Visibility;
  date: Date;
  comment?: string;
}

export interface NewDiaryEntry {
  weather: Weather;
  visibility: Visibility;
  date: string;
  comment?: string;
}
