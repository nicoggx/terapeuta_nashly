import { axiosInstance } from '../index';

const BASE_URL_GET_SESSIONS = '/v1/internal/sessions/getsessionhour';
const BASE_URL_GET_HOURS = '/v1/internal/sessions/gethourssession';
const BASE_URL_CREATE_SESSION = '/v1/internal/sessions/registerhour';
const BASE_URL_GET_PATIENTS = '/v1/internal/sessions/getpatients';
const BASE_URL_CREATE_HOURS = '/v1/internal/sessions/createhours';
const BASE_URL_GET_HOURS_CREATES = '/v1/internal/sessions/gethourscreates';

export const getSessionsHours = () => axiosInstance.get(BASE_URL_GET_SESSIONS);
export const getHoursForDate = (date) =>
    axiosInstance.get(`${BASE_URL_GET_HOURS}?date=${date}`);
export const createSession = (request) =>
    axiosInstance.post(BASE_URL_CREATE_SESSION, request);
export const getPatientsByIdP = (id) =>
    axiosInstance.get(`${BASE_URL_GET_PATIENTS}?id=${id}`);
export const createHours = (request) =>
    axiosInstance.post(BASE_URL_CREATE_HOURS, request);
export const getHoursCreates = (date) =>
    axiosInstance.get(`${BASE_URL_GET_HOURS_CREATES}?date=${date}`);
