import {
    AUTHORIZATION_ERRORS,
    AUTHORIZATION_FAILED,
    LOGIN,
    LOGOUT,
    REGISTER_ERRORS
} from "../types";


const authUser = !!localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
const registerErrors = {
    name: [],
    email: [],
    password: [],
    confirm: [],
}
const authErrors = {
    name: [],
    password: [],
}
const initialUserState = {
    authUser,
    user,
    registerErrors,
    authErrors,
    authFailed: false,
}

export default function userReducer(state = initialUserState, action) {
    switch (action.type) {

        case LOGIN:
            localStorage.setItem('token', action.token);
            localStorage.setItem('user', JSON.stringify(action.user));
            return {
                ...state,
                authUser: true,
                user: action.user,
            }

        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                authUser: false,
                user: null,
            }

        case REGISTER_ERRORS:
            return {
                ...state,
                registerErrors: {
                    ...registerErrors,
                    ...action.errors,
                },
            }

        case AUTHORIZATION_ERRORS:
            return {
                ...state,
                authErrors: {
                    ...authErrors,
                    ...action.errors,
                },
            }

        case AUTHORIZATION_FAILED:
            return {
                ...state,
                authFailed: action.authFailed,
            }

        default:
            return state;
    }
}