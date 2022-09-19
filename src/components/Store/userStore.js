import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

const userReducer = (
    state = {
        id: undefined,
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: ''
    }, action
) => {
    switch (action.type) {
        case 'ADD_USER':
            return action.payload;
        case 'REMOVE_USER':
            return '';
        default:
            return state;
    }
}

const sagaMiddleware = createSagaMiddleware();

const localStorageMiddleware = ({getState}) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem('applicationState', JSON.stringify(
            getState()
        ));
        
        return result;
    };
};


const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
        return JSON.parse(localStorage.getItem('applicationState'));
    }
}

export const userStore = createStore(
    userReducer,
    reHydrateStore(),
    applyMiddleware(
        sagaMiddleware,
        localStorageMiddleware
    )
);
