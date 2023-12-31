import {ACCOUNT_ACTION_TYPES} from "./account.type";
import {
    loginAPI,
    getAllAccountsAPI,
    updatePasswordAPI,
    deleteAccountAPI,
    parseAccountFileAPI,
    saveAccountListAPI,
    resetPasswordAPI,
} from "@/api/account";

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

export const setShowConfirmResetPwdDialog = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_SHOW_CONFIRM_RESET_PWD_DIALOG,
        payload: newVal
    };
};

export const setShowAddTADialog = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_SHOW_ADD_TA_DIALOG,
        payload: newVal
    };
};

export const setCurrentAccountId = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_CURRENT_ACCOUNT_ID,
        payload: newVal
    };
};

export const setUserInfo = (newVal) => {
    return {
        type: ACCOUNT_ACTION_TYPES.SET_USER_INFO,
        payload: newVal
    };
};

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        loginAPI(username, password).then(response => {
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

export const resetPwd = (id) => {
    return new Promise((resolve, reject) => {
        resetPasswordAPI(id).then(response => {
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

export const parseAccountFile = (data) => {
    return new Promise((resolve, reject) => {
        parseAccountFileAPI(data).then(response => {
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

export const saveAccountList = (accountList) => {
    return new Promise((resolve, reject) => {
        saveAccountListAPI(accountList).then(response => {
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
