import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { calendarReducer } from './calendar/calendarModule';
import { authReducer } from './auth/authModule';
import { sessionReducer } from './session/sessionModule';

const composeEnhancers = compose;
const middlwares = applyMiddleware(thunk);
const reducers = combineReducers({
    calendar: calendarReducer,
    auth: authReducer,
    sessions: sessionReducer,
});

export const store = createStore(reducers, {}, composeEnhancers(middlwares));
