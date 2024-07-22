import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../Constants/ConstantValues';
import { Alert } from 'react-native';

interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' ; 
  apiPath: string;
  data?: object; 
  headers?: object; 
  params?: object; 
  timeout?: number; 
}

export const dataManagerApiRequest = async ({
  method,
  apiPath,
  data = {},
  headers = {},
  params = {},
  timeout = 10000,
}: ApiRequest) => {

  const url = `${baseUrl}${apiPath}`;
  const config: AxiosRequestConfig = {
    method: method,
    url: url,
    data: method !== 'GET' ? data : undefined,
    headers: headers,
    params: params,
    timeout: timeout,
    maxBodyLength: Infinity,
  };

  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    // Alert.alert('An error occurred:', error?.response?.data.message);
    return error?.response?.data;
  }
};