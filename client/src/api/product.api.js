import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async ({ category, cursor, limit = 20 }) => {
  const params = { limit };

  if (category) params.category = category;
  if (cursor)   params.cursor   = cursor;

  const response = await axios.get(`${API_URL}/api/products`, { params });
  return response.data;
};