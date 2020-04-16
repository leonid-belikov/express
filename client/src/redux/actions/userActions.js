import {AUTHORIZATION_ERRORS, AUTHORIZATION_FAILED, LOGIN, LOGOUT, REGISTER_ERRORS} from "../types";
import {toaster} from "evergreen-ui";
import {loginAPI, registerAPI} from "../../api";


export function login(token, user) {
    return {type: LOGIN, token, user}
}

export function logout() {
    return {type: LOGOUT}
}

export function register(data) {
    return async dispatch => {
        try {
            const responseData = await registerAPI(data);
            const errors = {};
            const message = responseData.message;
            switch (responseData.status) {
                case 'wrong data':
                    // TODO: вынести обработку данных в api.js
                    for (const e of responseData.errors) {
                        if (!errors[e.param]) errors[e.param] = [];
                        errors[e.param].push(e.msg);
                    }
                    toaster.danger(message, {
                        id: 'reg-failed',
                    });
                    break;
                case 'name used':
                    errors.name = ['Выбранное имя пользователя уже занято'];
                    toaster.danger(message, {
                        id: 'reg-failed',
                    });
                    break;
                case 'success':
                    dispatch(login(responseData.token, responseData.user));
                    toaster.success(message);
                    break;
                default:
                    break;
            }
            dispatch({
                type: REGISTER_ERRORS,
                errors,
            })
        } catch (e) {
            console.log('Ошибка при регистрации: ', e)
        }
    }
}

export function authorization(data) {
    return async dispatch => {
        try {
            const responseData = await loginAPI(data);
            const message = responseData.message;
            switch (responseData.status) {
                case 'failed':
                    dispatch({
                        type: AUTHORIZATION_FAILED,
                        authFailed: true,
                    })
                    toaster.danger(message, {
                        id: 'auth-failed',
                    });
                    break;
                case 'errors':
                    dispatch({
                        type: AUTHORIZATION_ERRORS,
                        errors: responseData.errors,
                    })
                    toaster.danger(message, {
                        id: 'auth-failed',
                    });
                    break;
                case 'success':
                    dispatch({
                        type: AUTHORIZATION_FAILED,
                        authFailed: false,
                    })
                    dispatch({
                        type: AUTHORIZATION_ERRORS,
                        errors: {},
                    })
                    dispatch(login(responseData.token, responseData.user));
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log('Ошибка при авторизации: ', e)
        }
    }
}
