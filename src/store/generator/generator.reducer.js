import {GENERATOR_ACTION_TYPES} from './generator.type';

export const GENERATOR_INITIAL_STATE = {
    numberOfRows: 1000,
    fieldList: [],
    covarianceMatrix: {},
    addressGroupNum: 1,
    multivariateNormalGroupNum: 1,
    showUniqueIdentifierDialog: false,
    showMultivariateNormalDialog: false,
    showUniformDialog: false,
    showCategoricalDialog: false,
    showCategoricalToNumericalDialog: false,
    showMulticollinearDialog: false,
    showPolynomialCategoricalDialog: false,
    showResponseVectorDialog: false,
    showCodeDialog: false,
    alertOpen: false,
    alertText: '',
    alertType: 'error',
    code: '',
    importCode: '',
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
        case GENERATOR_ACTION_TYPES.SET_COVARIANCE_MATRIX:
            return {...state, covarianceMatrix: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_UNIQUE_IDENTIFIER_DIALOG:
            return {...state, showUniqueIdentifierDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_MULTIVARIATE_NORMAL_DIALOG:
            return {...state, showMultivariateNormalDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_UNIFORM_DIALOG:
            return {...state, showUniformDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_CATEGORICAL_DIALOG:
            return {...state, showCategoricalDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_CATEGORICAL_TO_NUMERICAL_DIALOG:
            return {...state, showCategoricalToNumericalDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_MULTICOLLINEAR_DIALOG:
            return {...state, showMulticollinearDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_POLYNOMIAL_CATEGORICAL_DIALOG:
            return {...state, showPolynomialCategoricalDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_RESPONSE_VECTOR_DIALOG:
            return {...state, showResponseVectorDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_SHOW_CODE_DIALOG:
            return {...state, showCodeDialog: payload};
        case GENERATOR_ACTION_TYPES.SET_ALERT:
            return {...state, ...payload};
        case GENERATOR_ACTION_TYPES.SET_CODE:
            return {...state, ...payload};
        case GENERATOR_ACTION_TYPES.ADD_UNIQUE_IDENTIFIER:
        case GENERATOR_ACTION_TYPES.ADD_NAME:
        case GENERATOR_ACTION_TYPES.ADD_UNIFORM:
        case GENERATOR_ACTION_TYPES.ADD_CATEGORICAL:
        case GENERATOR_ACTION_TYPES.ADD_CATEGORICAL_TO_NUMERICAL:
        case GENERATOR_ACTION_TYPES.ADD_MULTICOLLINEAR:
        case GENERATOR_ACTION_TYPES.ADD_POLYNOMIAL_CATEGORICAL:
        case GENERATOR_ACTION_TYPES.ADD_RESPONSE_VECTOR:
            return {...state, fieldList: [...state.fieldList, ...payload]};
        case GENERATOR_ACTION_TYPES.ADD_ADDRESS:
            return {...state, fieldList: [...state.fieldList, ...payload], addressGroupNum: state.addressGroupNum + 1};
        case GENERATOR_ACTION_TYPES.ADD_MULTIVARIATE_NORMAL:
            return {
                ...state,
                fieldList: [...state.fieldList, ...payload.multivariateNormal],
                covarianceMatrix: {
                    ...state.covarianceMatrix,
                    ...payload.covarianceMatrix,
                },
                multivariateNormalGroupNum: state.multivariateNormalGroupNum + 1,
            };
        case GENERATOR_ACTION_TYPES.CLEAR_GRAPH:
            return {...GENERATOR_INITIAL_STATE};
        default:
            return state;
    }
};