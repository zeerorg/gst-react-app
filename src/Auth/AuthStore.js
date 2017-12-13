import { createStore } from 'redux';

export const ANONYMOUS = 'ANONYMOUS';
export const START_LOGGING = 'START_LOGGING';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING = 'LOGGING';
export const LOGGED = 'LOGGED';

// eslint-disable-next-line
const exampleState = {
    status: 'ANONYMOUS|LOGGING|LOGGED',
    user: 'null|null|Object'
}

const startState = {
    status: ANONYMOUS
}

function authReducer(state = startState, action) {
    switch(action.type) {
        case START_LOGGING: {
            if(state.status === ANONYMOUS)
                return Object.assign({}, state, {status: LOGGING});
            return state;
        }
        case LOGGED_IN:
            return Object.assign({}, state, {status: LOGGED, user: action.user});
        default:
            return state;
    }
}

export let authStore = createStore(authReducer);
