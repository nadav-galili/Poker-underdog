import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getUserDetails() {
  return http.get(`${apiUrl}/users/me`);
}

export function editUserDetails(user) {
  const uId = user._id;
  // delete user._id;
  return http.put(`${apiUrl}/users/${uId}`, user);
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export async function loginGoogle(email, token) {
  const { data } = await http.post(`${apiUrl}/auth/google`, { email, token });
  localStorage.setItem(tokenKey, data.token);
}

export default {
  login,
  loginGoogle,
  getCurrentUser,
  logout,
  getJwt,
  getUserDetails,
  editUserDetails,
};
