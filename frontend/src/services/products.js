import axios from "axios";

const baseUrl = "/api/products";
let token = null;

async function getAll() {
  const request = await axios.get(baseUrl);
  return request.data;
}

async function create(newObject) {
  const request = await axios.post(baseUrl, newObject);
  return request.data;
}

async function update(id, newObject) {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
}

async function deleteId(id) {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return request.data;
}

export default { getAll, create, update, deleteId };
