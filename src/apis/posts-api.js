import axios from "axios";

const baseUrl = "https://postmingle-backend.onrender.com";

export const getAllPosts = async () => {
  const { data } = await axios.get(baseUrl + "/api/v1/posts");
  return data;
};

export const addPostComment = async (postId, message) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  };
  const { data } = await axios.post(
    baseUrl + "/api/v1/postcomment",
    {
      postId,
      message,
    },
    config
  );
  return data;
};
export const addPost = async (title, message) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  };
  const { data } = await axios.post(
    baseUrl + "/api/v1/createPost",
    {
      title,
      message,
    },
    config
  );
  return data;
};
