import {GENERATOR_ACTION_TYPES} from './generator.type';

export const GENERATOR_INITIAL_STATE = {
    numberOfRows: 1000
};

export const generatorReducer = (
    state = GENERATOR_INITIAL_STATE,
    action = {}
) => {
    const {type, payload} = action;

    switch (type) {
        case GENERATOR_ACTION_TYPES.SET_NUMBER_OF_ROWS:
            return {...state, numberOfRows: payload};
        default:
            return state;
    }
};