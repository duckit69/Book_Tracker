import axios, { AxiosInstance } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";

export const useApiClient = (): AxiosInstance => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const apiClientRef = useRef(
    axios.create({
      baseURL: "https://localhost:3000",
      withCredentials: true,
    })
  );

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = apiClientRef.current.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }
    );

    // Response interceptor
    const responseInterceptor = apiClientRef.current.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Prevent infinite loop
          try {
            // Attempt to refresh the accessToken
            const { data } = await axios.post(
              "https://localhost:3000/refresh",
              {
                withCredentials: true,
              }
            );
            setAccessToken(data.accessToken);
            error.config.headers.Authorization = `Bearer ${data.accessToken}`;
            return apiClientRef.current(error.config);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            setAccessToken(null);
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component unmounts
    return () => {
      apiClientRef.current.interceptors.request.eject(requestInterceptor);
      apiClientRef.current.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, setAccessToken, navigate]);

  return apiClientRef.current;
};
