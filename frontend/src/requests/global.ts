import axios from "axios";

export const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
  headers: defaultHeaders,
});
