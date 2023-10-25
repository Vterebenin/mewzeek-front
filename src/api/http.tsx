import { MSG_TO_TOSTER_MAPPER } from "@/const/general";
import { UseToastOptions, createStandaloneToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { ErrorData } from "@/vite-env";

const config = {
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`,
};
const http = axios.create(config);

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { toast } = createStandaloneToast();
    if (error instanceof AxiosError) {
      const data: ErrorData = error?.response?.data;
      if (data.message! in MSG_TO_TOSTER_MAPPER) {
        const message = data.message as string;
        toast(MSG_TO_TOSTER_MAPPER[message] as UseToastOptions);
      }
    }

    throw error;
  },
);
export const unauthorizedApi = axios.create(config);

export default http;
