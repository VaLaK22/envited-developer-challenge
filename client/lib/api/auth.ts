import { API_URL_LOCAL } from "./constants";
export const login = async (data: { email: string }) => {
  const res = await fetch(`${API_URL_LOCAL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok || res.status !== 200) {
    throw new Error("Login failed");
  }
  return res.json();
};

export const authenticate = async (data: {
  email: string;
  emailToken: string;
}) => {
  console.warn("authenticate");
  const res = await fetch(`${API_URL_LOCAL}/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok || res.status !== 200) {
    throw new Error("Authentication failed");
  }
  return res.json();
};
