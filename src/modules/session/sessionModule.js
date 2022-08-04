import { getSessionsHours } from '../../service/session/sessions';

const INITIAL_STATE = {
    sessions: [],
    loading: false,
    loadingTitle: '',
};

export const ACTIONS = {
    SET_SESSIONS: 'SET_SESSIONS',
    SET_LOADING: 'SET_LOADING',
    SET_LOADING_TITLE: 'SET_LOADING_TITLE',
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
