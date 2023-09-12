import HttpRequest from '@/utils/request';

const api = {
    accountPre: '/api/account',
};

export const loginAPI = (params) => {
    return HttpRequest.request({
        url: `${api.accountPre}/login`,
        method: 'GET',
        params
    });
};

export const getAllAccountsAPI = () => {
    return HttpRequest.request({
        url: `${api.accountPre}/getAll`,
        method: 'GET',
    });
};

export const saveAccountsAPI = (id, username, firstName, lastName) => {
    return HttpRequest.request({
        url: `${api.accountPre}/save`,
        method: 'POST',
        data: {id, username, firstName, lastName}
    });
};

export const updatePasswordAPI = (id, oldPassword, newPassword) => {
    return HttpRequest.request({
        url: `${api.accountPre}/updatePwd`,
        method: 'PUT',
        data: {id, oldPassword, newPassword}
    });
};

export const deleteAccountAPI = (id) => {
    return HttpRequest.request({
        url: `${api.accountPre}/delete/${id}`,
        method: 'DELETE',
    });
};