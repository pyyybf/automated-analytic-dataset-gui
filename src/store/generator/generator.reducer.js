import {GENERATOR_ACTION_TYPES} from './generator.type';

export const GENERATOR_INITIAL_STATE = {
    numberOfRows: 1000,
    fieldList: [],
    showUniqueIdentifierDialog: false,
};

export const generatorReducer = (
    state = GENERATOR_INITIAL_STATE,
    action = {}
) => {
    const {type, payload} = action;

    switch (type) {
        case GENERATOR_ACTION_TYPES.SET_NUMBER_OF_ROWS:
            return {...state, numberOfRows: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_UNIQUE_IDENTIFIER_DIALOG:
            return {...state, showUniqueIdentifierDialog: payload};
        case GENERATOR_ACTION_TYPES.ADD_UNIQUE_IDENTIFIER:
            return {...state, fieldList: [...state.fieldList, payload]};
        default:
            return state;
    }
};