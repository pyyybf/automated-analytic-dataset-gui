import {WEB_ACTION_TYPES} from './web.type';

const WEB_INITIAL_STATE = {
    alertOpen: false,
    alertText: '',
    alertType: 'error',
    showConfirmDeleteDialog: false,
};

export const webReducer = (
    state = WEB_INITIAL_STATE,
    action = {}
) => {
    const {type, payload} = action;

    switch (type) {
        case WEB_ACTION_TYPES.SET_ALERT:
            return {...state, ...payload};
        case WEB_ACTION_TYPES.SET_SHOW_CONFIRM_DELETE_DIALOG:
            return {...state, showConfirmDeleteDialog: payload};
        default:
            return state;
    }
};