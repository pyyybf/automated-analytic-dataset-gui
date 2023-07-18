import {GENERATOR_ACTION_TYPES} from './generator.type';

export const GENERATOR_INITIAL_STATE = {
    numberOfRows: 1000,
    fieldList: [],
    covarianceMatrix: [],
    showUniqueIdentifierDialog: false,
    showMultivariateNormalDialog: false,
    alertOpen: false,
    alertText: '',
    alertType: 'error',
};

export const generatorReducer = (
    state = GENERATOR_INITIAL_STATE,
    action = {}
) => {
    const {type, payload} = action;

    switch (type) {
        case GENERATOR_ACTION_TYPES.SET_NUMBER_OF_ROWS:
            return {...state, numberOfRows: payload};
        case GENERATOR_ACTION_TYPES.SET_FIELD_LIST:
            return {...state, fieldList: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_UNIQUE_IDENTIFIER_DIALOG:
            return {...state, showUniqueIdentifierDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_MULTIVARIATE_NORMAL_DIALOG:
            return {...state, showMultivariateNormalDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_ALERT:
            return {...state, ...payload};
        case GENERATOR_ACTION_TYPES.ADD_UNIQUE_IDENTIFIER:
        case GENERATOR_ACTION_TYPES.ADD_NAME:
        case GENERATOR_ACTION_TYPES.ADD_ADDRESS:
            return {...state, fieldList: [...state.fieldList, ...payload]};
        case GENERATOR_ACTION_TYPES.ADD_MULTIVARIATE_NORMAL:
            return {
                ...state,
                fieldList: [...state.fieldList, ...payload.multivariateNormal],
                covarianceMatrix: payload.covarianceMatrix
            };
        default:
            return state;
    }
};