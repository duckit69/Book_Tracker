import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const clientAPI = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Set up interceptors to add the access token to the headers of each request
clientAPI.interceptors.request.use((config) => {
  const { accessToken } = useAuth();
  const token = accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Set up interceptors to handle 401 errors and refresh the access token
clientAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    if (error.response?.status === 401) {
      try {
        // Call refresh endpoint to get new accessToken
        const { data } = await axios.post(
          "/refresh",
          {},
          { withCredentials: true }
        );
        // Store new token and retry original request
        setAccessToken(data.accessToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return clientAPI(error.config);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Force logout if refresh fails
        setAccessToken(null);
        navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default clientAPI;
