import {
    ADD_USER_TO_NEW_GROUP,
    CLEAR_NEW_GROUP_DATA,
    REMOVE_USER_FROM_NEW_GROUP,
    UPDATE_GROUPS, UPDATE_INVITATIONS,
    UPDATE_NEW_GROUP_DATA
} from "../types";

const newGroupData = {
    description: '',
    invited: [],
    accounts: [],
}

const initialState = {
    newGroupData,
    groups: [],
    invitations: [],
}

export default function groupReducer(state = initialState, action) {
    let invited;
    switch (action.type) {

        case UPDATE_NEW_GROUP_DATA:
            return {
                ...state,
                newGroupData: {
                    ...state.newGroupData,
                    [action.fieldName]: action.value,
                }
            }

        case ADD_USER_TO_NEW_GROUP:
            invited = state.newGroupData.invited.slice();
            invited.push(action.user)
            return {
                ...state,
                newGroupData: {
                    ...state.newGroupData,
                    invited,
                }
            }

        case REMOVE_USER_FROM_NEW_GROUP:
            invited = state.newGroupData.invited.filter(user => user.name !== action.userName)
            return {
                ...state,
                newGroupData: {
                    ...state.newGroupData,
                    invited,
                }
            }

        case CLEAR_NEW_GROUP_DATA:
            return {
                ...state,
                newGroupData,
            }

        case UPDATE_GROUPS:
            return {
                ...state,
                groups: action.groups,
            }

        case UPDATE_INVITATIONS:
            return {
                ...state,
                invitations: action.invitations,
            }

        default:
            return state;
    }
}