import {toaster} from "evergreen-ui";

import {
    ADD_USER_TO_NEW_GROUP,
    CLEAR_NEW_GROUP_DATA,
    REMOVE_USER_FROM_NEW_GROUP,
    UPDATE_GROUPS,
    UPDATE_NEW_GROUP_DATA
} from "../types";
import {findUserAPI, getGroupsAPI} from "../../api";


export function changeNewGroupAccounts(accounts) {
    return {
        type: UPDATE_NEW_GROUP_DATA,
        fieldName: 'accounts',
        value: accounts,
    }
}

export function changeNewGroupDescription(text) {
    return {
        type: UPDATE_NEW_GROUP_DATA,
        fieldName: 'description',
        value: text,
    }
}

export function findUser(name) {
    return async dispatch => {
        try {
            const responseData = await findUserAPI(name);
            switch (responseData.status) {
                case 'success':
                    const user = responseData.user;
                    dispatch({
                        type: ADD_USER_TO_NEW_GROUP,
                        user,
                    })
                    toaster.success(responseData.message, {
                        id: 'user found'
                    });
                    break;
                case 'user not found':
                    toaster.danger(responseData.message, {
                        id: 'user not found'
                    });
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log('Ошибка при поиске: ', e)
        }
    }
}

export function removeUser(name) {
    return {
        type: REMOVE_USER_FROM_NEW_GROUP,
        userName: name,
    }
}

export function clearNewGroupData() {
    return {
        type: CLEAR_NEW_GROUP_DATA,
    }
}

export function getGroups() {
    return async dispatch => {
        try {
            const responseData = await getGroupsAPI();
            const groups = responseData.data.groups;
            dispatch({
                type: UPDATE_GROUPS,
                groups
            })
        } catch (e) {
            console.log('Ошибка при поиске: ', e)
        }
    }
}
