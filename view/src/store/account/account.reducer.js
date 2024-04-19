import {ACCOUNT_ACTION_TYPES} from './account.type';

const ACCOUNT_INITIAL_STATE = {
    showLoginDialog: false,
    showChangePwdDialog: false,
    showConfirmResetPwdDialog: false,
    showAddTADialog: false,
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    username: '',
    firstName: localStorage.getItem('firstName') || '',
    lastName: '',
    currentAccountId: '',
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
        case ACCOUNT_ACTION_TYPES.SET_SHOW_CONFIRM_RESET_PWD_DIALOG:
            return {...state, showConfirmResetPwdDialog: payload};
        case ACCOUNT_ACTION_TYPES.SET_SHOW_ADD_TA_DIALOG:
            return {...state, showAddTADialog: payload};
        case ACCOUNT_ACTION_TYPES.SET_CURRENT_ACCOUNT_ID:
            return {...state, currentAccountId: payload};
        case ACCOUNT_ACTION_TYPES.SET_USER_INFO:
            if (payload.token) {
                localStorage.setItem('userId', payload.userId);
                localStorage.setItem('token', payload.token);
                localStorage.setItem('firstName', payload.firstName);
            } else {
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                localStorage.removeItem('firstName');
            }
            return {...state, ...payload};
        default:
            return state;
    }
};