import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/posts"; // Adjust the URL based on your backend server

export const getAllPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw error; // Rethrow the error to propagate it to the caller if needed
  }
};

export const getPostById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const jsonString = JSON.stringify(postData);

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

export const toggleLike = async (postData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${postData.postId}/like`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

export const getlikes = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};
