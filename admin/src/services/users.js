import axios from "axios";

const baseUrl = "/users";

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(newObject) {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
}

async function update(id, newObject) {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.date;
}

async function deleteId(id) {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.date;
}

export default { getAll, create, update, deleteId };
