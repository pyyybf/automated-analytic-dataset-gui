import {GENERATOR_ACTION_TYPES} from "./generator.type";

export const setNumberOfRows = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_NUMBER_OF_ROWS,
        payload: newVal
    }
};