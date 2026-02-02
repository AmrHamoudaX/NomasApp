import { axiosInstance } from "../axiosInstance";

const baseUrl = "/products";

//Get All Products
async function getAll() {
  const response = await axiosInstance.get(baseUrl);
  return response.data;
}

//Get All Featured Products
async function getAllFeatured() {
  const response = await axiosInstance.get(`${baseUrl}/featured`);
  return response.data;
}

async function create(newObject) {
  const response = await axiosInstance.post(baseUrl, newObject);
  return response.data;
}
// -----Featured Products-----
async function feature(newObject) {
  const response = await axiosInstance.put(`${baseUrl}/featured`, newObject);
  return response.data;
}

async function deleteFeaturedId(id) {
  const response = await axiosInstance.delete(`${baseUrl}/featured/${id}`);
  return response.data;
}
// -----End Featured Products-----

async function deleteId(id) {
  const response = await axiosInstance.delete(`${baseUrl}/${id}`);
  return response.data;
}
export default {
  getAll,
  getAllFeatured,
  create,
  feature,
  deleteId,
  deleteFeaturedId,
};
