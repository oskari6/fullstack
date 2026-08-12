import axios from "axios";
import { getUser } from "../services/persistentUser";

const baseUrl = "/api/blogs";

const getToken = () => {
    const savedUser = getUser();
    return `Bearer ${savedUser.token}`;
};
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: getToken() }
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = async (newObject) => {
    console.log(getToken());
    const config = {
        headers: { Authorization: getToken() }
    };

    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
    return response.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: getToken() }
    };

    await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, remove, getById };
