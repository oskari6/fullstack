import axios from "axios";
import { useEffect, useState } from "react";
import diaryService from "./service.ts";
import {
  VISIBILITY,
  WEATHER,
  type Diary,
  type NewDiaryEntry,
  type Visibility,
  type Weather,
} from "./types.ts";

const initialDiaryEntry: NewDiaryEntry = {
  weather: WEATHER.Cloudy,
  visibility: VISIBILITY.Good,
  date: "",
  comment: "",
};
const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [formData, setFormData] = useState(initialDiaryEntry);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const handleCreate = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await diaryService.create(formData).then((returnedDiary) => {
        setDiaries(diaries.concat(returnedDiary));
      });
      setFormData(initialDiaryEntry);
      setErrorMessage("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          `Error: ${error.response?.data?.error ?? "Request failed"}`,
        );
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <div>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={handleCreate}>
        <div>
          weather
          {Object.values(WEATHER).map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={formData.weather === w}
                onChange={({ target }) =>
                  setFormData((prev) => ({
                    ...prev,
                    weather: target.value as Weather,
                  }))
                }
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          visibility
          {Object.values(VISIBILITY).map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={formData.visibility === v}
                onChange={({ target }) =>
                  setFormData((prev) => ({
                    ...prev,
                    visibility: target.value as Visibility,
                  }))
                }
              />
              {v}
            </label>
          ))}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "150px" }}
        >
          <input
            placeholder="comment"
            value={formData.comment}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                comment: event.target.value,
              }))
            }
          />
          <input
            type="date"
            value={formData.date}
            onChange={({ target }) =>
              setFormData((prev) => ({
                ...prev,
                date: target.value,
              }))
            }
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h1>diaries</h1>
      {diaries.map((d, index) => (
        <div key={index}>
          <b>{new Date(d.date).toLocaleDateString()}</b>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
          <p>{d.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
