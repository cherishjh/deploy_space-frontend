
import { boot } from 'quasar/wrappers';
import axios from 'axios';
import {FountURL} from "src/services/authService";


const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if(
        error.response.data.message === "다시 로그인해 주세요."
        && error.response.data.result === "로그인 만료"
      ){
        localStorage.removeItem('accessToken');
        location.href=FountURL;
      }
      else if(error.response.data.message === "토큰을 재발행 합니다."){
        localStorage.setItem('accessToken' ,error.response.data.result);
        originalRequest.headers.Authorization = `Bearer ${error.response.data.result}`;
        return axiosInstance(originalRequest);
      }else{
        localStorage.removeItem('accessToken');
        location.href=FountURL;
      }
      originalRequest._retry = true;
      console.log(error);

    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance; // Vue 3
  // app.config.globalProperties.$axios = axiosInstance; // Vue 2
});

export {axiosInstance}
