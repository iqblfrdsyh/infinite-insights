import axios from "axios";
// import { jwtDecode } from "jwt-decode";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// const axiosJWT = axios.create();

// let token = localStorage.getItem("token") || "";
// let expired = parseInt(localStorage.getItem("expire")) || "";

// console.log({ token, expired });

// axiosJWT.interceptors.request.use(
//   async (config) => {
//     const currentDate = new Date();
//     if (expired * 1000 < currentDate.getTime()) {
//       try {
//         const response = await axios.get(`${baseURL}/token`, {
//           withCredentials: true,
//         });
//         config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//         localStorage.setItem("token", response.data.accessToken);
//         const decoded = jwtDecode(response.data.accessToken);
//         localStorage.setItem("expire", decoded.exp);
//       } catch (error) {
//         console.error("Error refreshing token:", error);
//       }
//     }
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

export const signup = async (endpoint, dataSignup) => {
  const response = await axios.post(`${baseURL}/${endpoint}`, dataSignup, {
    withCredentials: true,
  });

  return response.data;
};

export const signin = async (endpoint, dataSignin) => {
  const response = await axios.post(`${baseURL}/${endpoint}`, dataSignin, {
    withCredentials: true,
  });

  return response.data;
};

export const logout = async (endpoint) => {
  const response = await axios.delete(`${baseURL}/${endpoint}`, {
    withCredentials: true,
  });
  return response.data;
};

export const refreshToken = async (endpoint) => {
  const response = await axios.get(`${baseURL}/${endpoint}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getUser = async (endpoint,token) => {
  const response = await axios.get(`${baseURL}/${endpoint}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// export default axiosJWT;
