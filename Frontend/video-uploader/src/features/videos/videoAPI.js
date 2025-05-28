import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchVideosAPI = async () => {
  const response = await api.get("/videos/");
  return response.data;
};

export const uploadVideoAPI = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/upload/", formData);
  return response.data;
};
