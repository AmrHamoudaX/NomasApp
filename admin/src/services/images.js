import { axiosInstance } from "../axiosInstance";

const baseUrl = "/api/images";

async function upload(formData) {
  //upload img to supabase and get the image url
  const response = await axiosInstance.post(baseUrl, formData);
  return response.data.imageurl;
}

export default { upload };
