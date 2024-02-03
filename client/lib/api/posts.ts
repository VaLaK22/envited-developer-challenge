import { API_URL, authToken, API_URL_LOCAL } from "./constants";
import { Post as postType } from "../../types";
import * as SecureStore from "expo-secure-store";

const listPosts = async (activeTab: "home" | "popular") => {
  const token = await SecureStore.getItemAsync("token");

  try {
    const response = await fetch(`${API_URL_LOCAL}/post/${activeTab}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok || response.status !== 200) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("Error fetching posts");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching posts");
  }
};

const getPost = async (id: string) => {
  const token = await SecureStore.getItemAsync("token");
  try {
    const response = await fetch(`${API_URL_LOCAL}/post/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok || response.status !== 200) {
      throw new Error("Error fetching post");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching post");
  }
};
const createPost = async (data: postType) => {
  const token = await SecureStore.getItemAsync("token");
  try {
    const rawResponse = await fetch(`${API_URL_LOCAL}/post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error("Error creating post");
  }
};

//Like a post
const likePost = async (id: string) => {
  console.log("id", id);
  const token = await SecureStore.getItemAsync("token");
  try {
    const response = await fetch(`${API_URL_LOCAL}/post/like/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok || response.status !== 200) {
      throw new Error("Error liking post");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error liking post");
  }
};

//View a post
const viewPost = async (id: string) => {
  const token = await SecureStore.getItemAsync("token");
  try {
    const response = await fetch(`${API_URL_LOCAL}/post/view/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok || response.status !== 200) {
      throw new Error("Error liking post");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error liking post");
  }
};

export { listPosts, getPost, createPost, likePost, viewPost };
