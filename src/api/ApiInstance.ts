/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { strings } from '@/locales';

import { IAPIResponse } from 'src/@types';

export const REST_URL = process.env.REACT_APP_BASE_URL || '';

export const axiosInstance = Axios.create({
  baseURL: REST_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor (optional, if additional request transformations are needed)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add custom headers, tokens, etc., here if needed
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: any): Promise<IAPIResponse<any>> => {
    return Promise.resolve({
      data: null,
      status: false,
      message: error?.response?.data?.message || strings.errors.commonError,
    });
  },
);

export class API {
  private static handleResponse<RES>(
    response: AxiosResponse<RES>,
  ): IAPIResponse<RES> {
    return {
      data: response instanceof Blob ? (response as RES) : response?.data,
      status: true,
      message:
        response instanceof Blob ? 'Blob Response' : (response as any)?.message,
    };
  }

  private static handleError<RES>(error: any): IAPIResponse<RES> {
    return {
      data: null,
      status: false,
      message: error?.response?.data?.message || strings.errors.commonError,
    };
  }

  static async Post<REQ, RES>(
    url: string,
    payload: REQ,
    config?: AxiosRequestConfig,
  ): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.post<RES>(url, payload, config);
      return API.handleResponse(response);
    } catch (error) {
      return API.handleError(error);
    }
  }

  static async Get<RES>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.get<RES>(url, config);
      return API.handleResponse(response);
    } catch (error) {
      return API.handleError(error);
    }
  }

  static async Put<REQ, RES>(
    url: string,
    payload?: REQ,
    config?: AxiosRequestConfig,
  ): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.put<RES>(url, payload, config);
      return API.handleResponse(response);
    } catch (error) {
      return API.handleError(error);
    }
  }

  static async Patch<REQ, RES>(
    url: string,
    payload?: REQ,
    config?: AxiosRequestConfig,
  ): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.patch<RES>(url, payload, config);
      return API.handleResponse(response);
    } catch (error) {
      return API.handleError(error);
    }
  }

  static async Delete<REQ, RES>(
    url: string,
    data?: REQ,
  ): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.delete<RES>(url, { data });
      return API.handleResponse(response);
    } catch (error) {
      return API.handleError(error);
    }
  }
}
