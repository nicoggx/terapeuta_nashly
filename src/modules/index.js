import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { calendarReducer } from './calendar/calendarModule';

const composeEnhancers = compose;
const middlwares = applyMiddleware(thunk);
const reducers = combineReducers({
    calendar: calendarReducer,
});

export const store = createStore(reducers, {}, composeEnhancers(middlwares));
