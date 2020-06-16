import axios from 'axios';
import {toaster} from "evergreen-ui";

const wrapHttp = () => {
    const _axios = axios.create({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    })

// _axios.interceptors.request.use(
//     (config) => {
//         if (config.method === 'put' && config.data) {
//             config.data.append('_method', 'PUT');
//             config.method = 'post';
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

//     _axios.interceptors.response.use(function (response) {
//         return response;
//     }, function (error) {
//         debugger
//         if (error.response && error.response.status === 401) {
//             localStorage.removeItem('user');
//             localStorage.removeItem('token');
//         }
//         return Promise.reject(error);
//     });

    return _axios;
}


export async function registerAPI(data) {
    try {
        const response = await wrapHttp().post('api/auth/register', data);
        return response.data;
    } catch (e) {
        if (e.response.status === 422) {
            return e.response.data;
        } else {
            throw (e);
        }
    }
}

export async function loginAPI(data) {
    try {
        const response = await wrapHttp().post('api/auth/login', data);
        return response.data;
    } catch (e) {
        if (e.response.status === 400) {
            if (e.response.data.errors && !!e.response.data.errors.length) {
                const errors = {};
                for (const err of e.response.data.errors) {
                    if (!errors[err.param]) errors[err.param] = [];
                    errors[err.param].push(err.msg);
                }
                return {
                    status: 'errors',
                    errors,
                    message: e.response.data.message,
                };
            }
            return {
                status: 'failed',
                message: e.response.data.message,
            };
        } else {
            throw (e);
        }
    }
}

export async function findUserAPI(name) {
    try {
        const response = await wrapHttp().post('api/user/show', {name})
        const user = response.data.user;
        return {
            status: 'success',
            message: `Пользователь ${user.name} получит приглашение в группу после ее создания`,
            user,
        }
    } catch (e) {
        if (e.response.status === 422) {
            return e.response.data;
        } else {
            throw (e);
        }
    }
}

export async function getGroupsAPI() {
    try {
        const responseData = await wrapHttp().get('/api/group/show');
        return responseData;
    } catch (e) {
        console.log('Ошибка при отображении списка групп:', e)
        throw (e)
    }
}

export async function createGroup(data) {
    const formattedUsers = data.invited.map(user => user.id);
    const formattedAccounts = data.accounts.map(name => ({name}));
    const formattedData = {
        ...data,
        invited: formattedUsers,
        accounts: formattedAccounts,
    }
    try {
        const responseData = await wrapHttp().post('/api/group/add', formattedData);
        return {
            success: true,
            message: `Группа "${responseData.data.name}" успешно создана`,
        }
    } catch (e) {
        if (e.response?.status === 422) {
            return {
                success: false,
                message: e.response.data.message,
            }
        }
        console.log('Ошибка при создании группы:', e)
        return {
            success: false,
            message: 'При создании группы произошла ошибка',
        }
    }
}

export async function getInvitationsAPI() {
    try {
        const responseData = await wrapHttp().get('/api/group/invitations');
        return responseData;
    } catch (e) {
        console.log('Ошибка при отображении списка приглашений:', e)
        throw (e)
    }
}

export async function respondInvitationAPI(groupId, accepted) {
    try {
        const responseData = await wrapHttp().post('/api/group/invitations', {groupId, accepted})
        return responseData
    }catch (e) {
        console.log('Ошибка при подтверждении приглашения:', e)
        throw (e)
    }
}
