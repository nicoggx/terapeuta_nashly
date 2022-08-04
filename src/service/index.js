import axios from 'axios';
import { ENV } from '../env/env';

const UNAUTHORIZED_CODE = 401;
const INTERNAL_SERVER_ERROR_CODE = 500;
const INTERNAL_SERVER_ERROR_MESSAGE = 'Error Interno del Servidor';

const axiosInstance = axios.create({
    baseURL: ENV.BFF_PATH,
    timeout: 120000,
    withCredentials: true,
});

function handleSuccess(response) {
    return response;
}

function handleError(error) {
    console.log('error ', error);
    const { response } = error;
    if (response !== undefined) {
        const { status, data } = response;
        if (status === UNAUTHORIZED_CODE) {
            // return window.location.replace(EXPIRED_SESSION_URL)
        }
        const message =
            data && data.message ? data.message : INTERNAL_SERVER_ERROR_MESSAGE;
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
            status,
            message,
            ...data,
        });
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
        error: INTERNAL_SERVER_ERROR_MESSAGE,
        status: INTERNAL_SERVER_ERROR_CODE,
    });
}

axiosInstance.interceptors.response.use(handleSuccess, handleError);

export { axiosInstance };
