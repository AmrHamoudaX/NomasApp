import axios from "axios";

const baseUrl = "/api/products";

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

//Get All Featured Products
async function getAllFeatured() {
  const response = await axios.get(`${baseUrl}/featured`);
  return response.data;
}

async function create(newObject) {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
}

async function update(id, newObject) {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
}

async function deleteId(id) {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

export default { getAll, getAllFeatured, create, update, deleteId };
