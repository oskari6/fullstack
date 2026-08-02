import axios from "axios";

const baseUrl = "/api/persons";

export const getAllPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export const createPerson = (formData) => {
  return axios
    .post(baseUrl, formData)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
    });
};

export const updatePerson = (id, updatedUser) =>
  axios.put(`${baseUrl}/${id}`, updatedUser).then((res) => res.data);

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
