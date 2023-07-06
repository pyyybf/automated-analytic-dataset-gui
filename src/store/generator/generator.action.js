import {GENERATOR_ACTION_TYPES} from "./generator.type";

export const setNumberOfRows = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_NUMBER_OF_ROWS,
        payload: newVal
    }
};

export const setShowUniqueIdentifierDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_UNIQUE_IDENTIFIER_DIALOG,
        payload: val
    }
};

export const addUniqueIdentifier = (newUniqueIdentifier) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_UNIQUE_IDENTIFIER,
        payload: newUniqueIdentifier
    }
};