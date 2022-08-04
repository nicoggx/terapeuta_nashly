import jwtDecode from 'jwt-decode';

const INITIAL_STATE = {
    auth: null,
    authenticated: false,
    user: null,
    loading: false,
    loadingTitle: '',
};

export const ACTIONS = {
    SET_AUTH: 'SET_AUTH',
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',
    SET_USER: 'SET_USER',
    SET_LOADING: 'SET_LOADING',
    SET_LOADING_TITLE: 'SET_LOADING_TITLE',
};

export const authReducer = (state = INITIAL_STATE, action = {}) => {
    if (action.type === ACTIONS.SET_AUTH) {
        return { ...state, auth: action.payload };
    }
    if (action.type === ACTIONS.SET_AUTHENTICATED) {
        return { ...state, authenticated: action.payload };
    }
    if (action.type === ACTIONS.SET_USER) {
        return { ...state, user: action.payload };
    }
    if (action.type === ACTIONS.SET_LOADING) {
        return { ...state, loading: action.payload };
    }
    if (action.type === ACTIONS.SET_LOADING_TITLE) {
        return { ...state, loadingTitle: action.payload };
    }
    return state;
};

export const authLogin = (response, status) => async (dispatch) => {
    if (status === 200) {
        dispatch({ type: ACTIONS.SET_USER, payload: response });
        dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
        dispatch({
            type: ACTIONS.SET_AUTH,
            payload: jwtDecode(response.accessToken),
        });
        localStorage.setItem('auth', JSON.stringify(response));
    }
};

export const verifyAuthExpire = () => async (dispatch) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
        dispatch({ type: ACTIONS.SET_USER, payload: auth });
        dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
        dispatch({
            type: ACTIONS.SET_AUTH,
            payload: jwtDecode(auth.accessToken),
        });
    }
};

export const logOutAction = () => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_USER, payload: null });
    dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: false });
    dispatch({
        type: ACTIONS.SET_AUTH,
        payload: null,
    });
};

export const activateLoading = (title) => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_LOADING_TITLE, payload: title });
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
};

export const desactiveLoading = () => async (dispatch) => {
    dispatch({ type: ACTIONS.SET_LOADING_TITLE, payload: '' });
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
};
