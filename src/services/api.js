import axios from "axios";

export const searchData = async (payload) => {
  await axios.post("https://dummyjson.com/products/add", {
    ...payload,
  });
};
export const getData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
