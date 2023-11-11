import {WEB_ACTION_TYPES} from './web.type';

const WEB_INITIAL_STATE = {
    alertOpen: false,
    alertText: '',
    alertType: 'error',
};

export const webReducer = (
    state = WEB_INITIAL_STATE,
    action = {}
) => {
    const {type, payload} = action;

    switch (type) {
        case WEB_ACTION_TYPES.SET_ALERT:
            return {...state, ...payload};
        default:
            return state;
    }
};