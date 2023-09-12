import {ACCOUNT_ACTION_TYPES} from './account.type';

const ACCOUNT_INITIAL_STATE = {
    showLoginDialog: false,
    showChangePwdDialog: false,
    showConfirmDeleteAccountDialog: false,
    token: localStorage.getItem('token') || '',
    username: '',
    firstName: localStorage.getItem('firstName') || '',
    lastName: '',
    accountList: [],
    accountId: '',
};

export const accountReducer = (
    state = ACCOUNT_INITIAL_STATE,
    action = {}
) => {
    const {type, payload} = action;

    switch (type) {
        case ACCOUNT_ACTION_TYPES.SET_SHOW_LOGIN_DIALOG:
            return {...state, showLoginDialog: payload};
        case ACCOUNT_ACTION_TYPES.SET_SHOW_CHANGE_PWD_DIALOG:
            return {...state, showChangePwdDialog: payload};
        case ACCOUNT_ACTION_TYPES.SET_SHOW_CONFIRM_DELETE_ACCOUNT_DIALOG:
            return {...state, showConfirmDeleteAccountDialog: payload};
        case ACCOUNT_ACTION_TYPES.SET_ACCOUNT_LIST:
            return {...state, accountList: [...payload]};
        case ACCOUNT_ACTION_TYPES.SET_ACCOUNT_ID:
            return {...state, accountId: payload};
        case ACCOUNT_ACTION_TYPES.SET_USER_INFO:
            if (payload.token) {
                localStorage.setItem('token', payload.token);
                localStorage.setItem('firstName', payload.firstName);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('firstName');
            }
            return {...state, ...payload};
        default:
            return state;
    }
};