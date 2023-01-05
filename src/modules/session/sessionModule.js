import {
    getHistorySessions,
    getPatientsByIdP,
    getScheduleSessiones,
    getSessionsHours,
} from '../../service/session/sessions';

const INITIAL_STATE = {
    sessions: [],
    loading: false,
    loadingTitle: '',
    typeSessionSelected: 0,
    infoPatient: {
        name: '',
        lastname: '',
        birthday: '',
        genere: '',
        password: '',
        reasonConsultation: '',
        diagnostics: '',
        currentCare: '',
    },
    patients: [],
    pacienteSelected: 0,
    scheduleSessiones: [],
    alertTitle: '',
    showAlert: false,
    typeAlert: 'danger',
    bodyAlert: '',
    sessionHistory: [],
};

export const ACTIONS = {
    SET_SESSIONS: 'SET_SESSIONS',
    SET_LOADING: 'SET_LOADING',
    SET_LOADING_TITLE: 'SET_LOADING_TITLE',
    SET_TYPE_SESSION_SELECTED: 'SET_TYPE_SESSION_SELECTED',
    SET_INFO_PATIENT: 'SET_INFO_PATIENT',
    SET_PATIENTS: 'SET_PATIENTS',
    SET_PATITENT_SELECTED: 'SET_PATITENT_SELECTED',
    SET_SCHEDULE_SESSIONS: 'SET_SCHEDULE_SESSIONS',
    SET_SHOW_ALERT: 'SET_SHOW_ALERT',
    SET_MESSAGE_ALERT: 'SET_MESSAGE_ALERT',
    SET_TYPE_ALERT: 'SET_TYPE_ALERT',
    SET_TITLE_ALERT: 'SET_TITLE_ALERT',
    SET_HISTORY_SESSION: 'SET_HISTORY_SESSION',
};

export const sessionReducer = (state = INITIAL_STATE, action = {}) => {
    if (action.type === ACTIONS.SET_SESSIONS) {
        return { ...state, sessions: action.payload };
    }
    if (action.type === ACTIONS.SET_LOADING) {
        return { ...state, loading: action.payload };
    }
    if (action.type === ACTIONS.SET_LOADING_TITLE) {
        return { ...state, loadingTitle: action.payload };
    }
    if (action.type === ACTIONS.SET_TYPE_SESSION_SELECTED) {
        return { ...state, typeSessionSelected: action.payload };
    }
    if (action.type === ACTIONS.SET_INFO_PATIENT) {
        return { ...state, infoPatient: action.payload };
    }
    if (action.type === ACTIONS.SET_PATIENTS) {
        return { ...state, patients: action.payload };
    }
    if (action.type === ACTIONS.SET_PATITENT_SELECTED) {
        return { ...state, pacienteSelected: action.payload };
    }
    if (action.type === ACTIONS.SET_SCHEDULE_SESSIONS) {
        return { ...state, scheduleSessiones: action.payload };
    }
    if (action.type === ACTIONS.SET_SHOW_ALERT) {
        return { ...state, showAlert: action.payload };
    }
    if (action.type === ACTIONS.SET_MESSAGE_ALERT) {
        return { ...state, bodyAlert: action.payload };
    }
    if (action.type === ACTIONS.SET_TYPE_ALERT) {
        return { ...state, typeAlert: action.payload };
    }
    if (action.type === ACTIONS.SET_TITLE_ALERT) {
        return { ...state, alertTitle: action.payload };
    }
    if (action.type === ACTIONS.SET_HISTORY_SESSION) {
        return { ...state, sessionHistory: action.payload };
    }
    return state;
};

export const getSessionsHoursDispatch = () => async (dispatch) => {
    try {
        const { data: response } = await getSessionsHours();
        if (response) {
            dispatch({ type: ACTIONS.SET_SESSIONS, payload: response.response });
        }
    } catch (e) {
        dispatch({ type: ACTIONS.SET_SESSIONS, payload: [] });
    }
};

export const getPatientsById = (id) => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_LOADING_TITLE, payload: 'Obteniendo datos...' });
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
        const { data: response } = await getPatientsByIdP(id);
        if (response) {
            dispatch({ type: ACTIONS.SET_PATIENTS, payload: response.patients });
        }
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    } catch (e) {
        dispatch({ type: ACTIONS.SET_PATIENTS, payload: [] });
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
};

export const selectTypeSession = (type) => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_TYPE_SESSION_SELECTED, payload: type });
};

export const setInfoPatientRedux = (patient) => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_INFO_PATIENT, payload: patient });
};

export const activateLoadingSession = (title) => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_LOADING_TITLE, payload: title });
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
};

export const desactiveLoadingSession = () => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_LOADING_TITLE, payload: '' });
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
};

export const setPatientSelected = (id) => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_PATITENT_SELECTED, payload: id });
};

export const getScheduleSessions = () => async (dispatch) => {
    dispatch({
        type: ACTIONS.SET_LOADING_TITLE,
        payload: 'Obteniendo sesiones agendadas...',
    });
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
        const { data: response } = await getScheduleSessiones();
        if (response) {
            dispatch({
                type: ACTIONS.SET_SCHEDULE_SESSIONS,
                payload: response.response,
            });
        }
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    } catch (e) {
        dispatch({ type: ACTIONS.SET_PATIENTS, payload: [] });
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
};

export const setAlert = (type, message, title) => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_MESSAGE_ALERT, payload: message });
    dispatch({ type: ACTIONS.SET_TITLE_ALERT, payload: title });
    dispatch({ type: ACTIONS.SET_TYPE_ALERT, payload: type });
    dispatch({ type: ACTIONS.SET_SHOW_ALERT, payload: true });
};

export const disabledAlert = () => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_MESSAGE_ALERT, payload: '' });
    dispatch({ type: ACTIONS.SET_SHOW_ALERT, payload: false });
    dispatch({ type: ACTIONS.SET_TITLE_ALERT, payload: '' });
};

export const getHistorySession = (page) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.SET_LOADING_TITLE,
            payload: 'Obteniendo sesiones...',
        });
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const { data: response } = await getHistorySessions(page);
        if (response) {
            dispatch({
                type: ACTIONS.SET_HISTORY_SESSION,
                payload: response.sessions,
            });
        }
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    } catch (e) {
        dispatch({ type: ACTIONS.SET_PATIENTS, payload: [] });
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
};
