import axios from "axios";

const API_URL = "https://blog-website-6gjl.vercel.app/api/v1/posts"; // Adjust the URL based on your backend server

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

export const deletePost = async (postData) => {
  const response = await axios.delete(`${API_URL}/${postData.postId}`, {
    data: postData,
  });
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

export const createComment = async (postData) => {
  try {
    const response = await axios.post(
      `${API_URL}/${postData.postId}/comments`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment", error);
    throw error;
  }
};

export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error getting comments", error);
    throw error;
  }
};

export const getTopLikedPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/topliked`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top liked posts:", error);
    throw error; // Rethrow the error to propagate it to the caller if needed
  }
};

export const searchPosts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};
