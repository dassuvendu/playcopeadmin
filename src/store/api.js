import axios from "axios";
import { useNavigate } from "react-router-dom";
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use((req) => {
  let userTokenData;
  try {
    userTokenData = JSON.parse(localStorage.getItem("userToken"));
  } catch (error) {
    userTokenData = null;
  }
  let token = userTokenData && userTokenData.token ? userTokenData.token : null;
    req.headers["Content-Type"] = "application/json";
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      localStorage.removeItem("userToken");
   
    }
    return Promise.reject(error);
  }
);

export default api;
