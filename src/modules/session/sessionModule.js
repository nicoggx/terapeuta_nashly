import { getPatientsByIdP, getSessionsHours } from '../../service/session/sessions';

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
};

export const ACTIONS = {
    SET_SESSIONS: 'SET_SESSIONS',
    SET_LOADING: 'SET_LOADING',
    SET_LOADING_TITLE: 'SET_LOADING_TITLE',
    SET_TYPE_SESSION_SELECTED: 'SET_TYPE_SESSION_SELECTED',
    SET_INFO_PATIENT: 'SET_INFO_PATIENT',
    SET_PATIENTS: 'SET_PATIENTS',
    SET_PATITENT_SELECTED: 'SET_PATITENT_SELECTED',
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
