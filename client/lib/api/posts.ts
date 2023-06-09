import { API_URL, authToken, API_URL_LOCAL } from "./constants";
import { Post as postType } from "../../types";

const listPosts = async (activeTab: "home" | "popular") => {
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
  console.log(data, "data");

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

  console.log(content);
  return content;
  // try {
  //   const response = await fetch(`${API_URL_LOCAL}/post`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (!response.ok || response.status !== 200) {
  //     throw new Error("Error creating post");
  //   }
  //   return await response.json();
  // } catch (error) {
  //   throw new Error("Error creating post");
  // }
};

export { listPosts, getPost, createPost };
