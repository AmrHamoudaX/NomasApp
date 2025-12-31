import { axiosInstance } from "./axiosInstance";

const baseUrl = "/api/orders";

async function getAll() {
  const response = await axiosInstance.get(baseUrl);
  return response.data;
}

async function create(newObject) {
  const response = await axiosInstance.post(baseUrl, newObject);
  return response.data;
}

async function update(id, newObject) {
  const response = await axiosInstance.put(`${baseUrl}/${id}`, newObject);
  return response.data;
}

export default { getAll, create, update };
