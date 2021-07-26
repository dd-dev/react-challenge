import axios, { AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetcher = (url: string, config?: AxiosRequestConfig) =>
  axios(`${API_URL}${url}`, config).then((res) => res.data);
