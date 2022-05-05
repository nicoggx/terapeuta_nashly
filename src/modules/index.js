import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { homeReducer } from './home/homeModule';

const composeEnhancers = compose;
const middlwares = applyMiddleware(thunk);
const reducers = combineReducers({
    home: homeReducer,
});

export const store = createStore(reducers, {}, composeEnhancers(middlwares));
