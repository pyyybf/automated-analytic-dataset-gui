import HttpRequest from '@/utils/request';

const api = {
    accountPre: '/api/account',
};

export const loginAPI = (username, password) => {
    return HttpRequest.request({
        url: `${api.accountPre}/login`,
        method: 'POST',
        data: {username, password}
    });
};

export const getAllAccountsAPI = () => {
    return HttpRequest.request({
        url: `${api.accountPre}/getAll`,
        method: 'GET',
    });
};

export const saveAccountAPI = (id, username, firstName, lastName) => {
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

export const parseAccountFileAPI = (data) => {
    return HttpRequest.request({
        url: `${api.accountPre}/parseAccountFile`,
        method: 'POST',
        headers: {
            "Content-Type": false
        },
        data
    })
};

export const saveAccountListAPI = (accountList) => {
    return HttpRequest.request({
        url: `${api.accountPre}/saveAll`,
        method: 'POST',
        data: {accountList}
    })
};
