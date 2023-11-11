import {WEB_ACTION_TYPES} from "./web.type";

export const setAlert = (open, text = '', type = 'error') => {
    let payload = {alertOpen: open, alertType: type};
    if (text !== '') payload.alertText = text;
    return {
        type: WEB_ACTION_TYPES.SET_ALERT,
        payload: payload
    };
};