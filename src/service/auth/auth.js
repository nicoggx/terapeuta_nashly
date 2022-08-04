import { axiosInstance } from '../index';

const BASE_URL_AUTH = '/v1/internal/auth';
const BASE_URL_REGISTER = '/v1/internal/register';

export const auth = (request) => axiosInstance.post(BASE_URL_AUTH, request);
export const register = (request) => axiosInstance.post(BASE_URL_REGISTER, request);
