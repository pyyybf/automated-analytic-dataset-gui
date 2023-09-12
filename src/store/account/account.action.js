import {ACCOUNT_ACTION_TYPES} from "./account.type";
import {loginAPI, getAllAccountsAPI, updatePasswordAPI, deleteAccountAPI} from "@/api/account";

export const setShowLoginDialog = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_SHOW_LOGIN_DIALOG,
        payload: newVal
    };
};

export const setShowChangePwdDialog = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_SHOW_CHANGE_PWD_DIALOG,
        payload: newVal
    };
};

export const setShowConfirmDeleteAccountDialog = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_SHOW_CONFIRM_DELETE_ACCOUNT_DIALOG,
        payload: newVal
    };
};

export const setAccountId = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_ID,
        payload: newVal
    };
};

export const setAccountList = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_LIST,
        payload: newVal
    };
};

export const setUserInfo = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_USER_INFO,
        payload: newVal
    };
};

export const login = (params) => {
    return new Promise((resolve, reject) => {
        loginAPI(params).then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const getAllAccounts = () => {
    return new Promise((resolve, reject) => {
        getAllAccountsAPI().then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const updatePassword = (id, oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
        updatePasswordAPI(id, oldPassword, newPassword).then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const deleteAccount = (id) => {
    return new Promise((resolve, reject) => {
        deleteAccountAPI(id).then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};
