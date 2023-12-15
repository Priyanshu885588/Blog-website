import axios from "axios";

const API_URL = "https://blog-website-dtgf.onrender.com/api/v1/posts"; // Adjust the URL based on your backend server

export const getAllPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const jsonString = JSON.stringify(postData);

  console.log(jsonString);
  const response = await axios.post(API_URL, jsonString, {
    headers: {
      "Content-Type": "application/json",
    },
  });


  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await axios.put(`${API_URL}/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};