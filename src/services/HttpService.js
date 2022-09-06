import axios from 'axios';
import LocalStorageService from './LocalStorageService';

const localStorageService = LocalStorageService.getService();

const instance = axios.create({
  baseURL: 'https://www.dev.api-hnj.xyz/api',
});

instance.interceptors.request.use(
  async req => {
    const userData = await localStorageService.getDataFromLocalStorage();
    if (userData) {
      const parsedData = JSON.parse(userData);
      req.headers.Authorization = `Bearer ${parsedData.token}`;
    }
    return req;
  },
  err => {
    throw new Error(err.response.data.message);
  },
);
export default instance;

// https://www.dev.api-hnj.xyz/api
// https://www.api-hnj.xyz/api
// http://HNJ-BACKEND-1437881233.us-east-2.elb.amazonaws.com/api
