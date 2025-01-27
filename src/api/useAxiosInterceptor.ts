import { axiosInstance } from './ApiInstance';

export const setupAxiosInterceptor = () => {
  axiosInstance.interceptors.request.use((request) => {
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      switch (error.response?.status) {
        case 401: {
          localStorage.clear();
          window.location.reload();
          return Promise.reject(error);
        }
        default: {
          return Promise.reject(error);
        }
      }
    },
  );
};
