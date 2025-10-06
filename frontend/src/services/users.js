import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

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
  return request.date;
}

async function deleteId(id) {
  const config = { headers: { Authorization: token } };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.date;
}

export default { getAll, create, update, deleteId, setToken };
