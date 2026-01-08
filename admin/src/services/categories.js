import { axiosInstance } from "../axiosInstance";

const baseUrl = "categories";

async function getAll() {
  const response = await axiosInstance.get(baseUrl);
  return response.data;
}

async function create(newObject) {
  const response = await axiosInstance.post(baseUrl, newObject);
  return response.data;
}

async function deleteId(id) {
  const response = await axiosInstance.delete(`${baseUrl}/${id}`);
  return response.data;
}
export default { getAll, create, deleteId };
