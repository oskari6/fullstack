import axios from "axios";
import type { Diary, NewDiaryEntry } from "./types.ts";

const baseUrl = "/api/diaries";

const getAll = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

const create = (object: NewDiaryEntry) => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data);
};

export default { getAll, create };
