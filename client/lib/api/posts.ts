import { API_URL, authToken, API_URL_LOCAL } from "./constants";
import { Post as postType } from "../../types";
import * as SecureStore from "expo-secure-store";

const listPosts = async (activeTab: "home" | "popular") => {
  const token = await SecureStore.getItemAsync("token");
  try {
    const response = await fetch(`${API_URL}/post/${activeTab}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
    const response = await fetch(`${API_URL}/post/id/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
    const rawResponse = await fetch(
      `https://envited-developer-challenge-production.up.railway.app/post`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error("Error creating post");
  }
};

export { listPosts, getPost, createPost };
