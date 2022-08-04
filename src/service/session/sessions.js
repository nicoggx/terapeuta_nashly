import { axiosInstance } from '../index';

const BASE_URL_GET_SESSIONS = '/v1/internal/sessions/getsessionhour';
const BASE_URL_GET_HOURS = '/v1/internal/sessions/gethourssession';

export const getSessionsHours = () => axiosInstance.get(BASE_URL_GET_SESSIONS);
export const getHoursForDate = (date) =>
    axiosInstance.get(`${BASE_URL_GET_HOURS}?date=${date}`);
