import axios from "axios";
const baseURL = "http://localhost:3001/api/v1/user";

export const login = async (email, password) => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.json();
};

export const updateProfile = async (userName, token) => {
  const response = await fetch(`${baseURL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userName,
    }),
  });

  return response.json();
};

export const getProfile = async (token) => {
  const response = await fetch(`${baseURL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
