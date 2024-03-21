import {GENERATOR_ACTION_TYPES} from "./generator.type";
import generate, {FIELD_TYPE_LIST} from "@/utils/codeGenerator";

export const setNumberOfRows = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_NUMBER_OF_ROWS,
        payload: newVal
    };
};

export const setFieldList = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_FIELD_LIST,
        payload: newVal
    };
};

export const setCovarianceMatrix = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_COVARIANCE_MATRIX,
        payload: newVal
    };
};

export const setShowUniqueIdentifierDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_UNIQUE_IDENTIFIER_DIALOG,
        payload: val
    };
};

export const setShowNameDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_NAME_DIALOG,
        payload: val
    };
};

export const setShowAddressDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_ADDRESS_DIALOG,
        payload: val
    };
};

export const setShowDateDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_DATE_DIALOG,
        payload: val
    };
};

export const setShowMultivariateNormalDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_MULTIVARIATE_NORMAL_DIALOG,
        payload: val
    };
};

export const setShowUniformDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_UNIFORM_DIALOG,
        payload: val
    };
};

export const setShowBetaDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_BETA_DIALOG,
        payload: val
    };
};

export const setShowCategoricalDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_CATEGORICAL_DIALOG,
        payload: val
    };
};

export const setShowCategoricalToNumericalDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_CATEGORICAL_TO_NUMERICAL_DIALOG,
        payload: val
    };
};

export const setShowMultiCollinearDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_MULTICOLLINEAR_DIALOG,
        payload: val
    };
};

export const setShowPolynomialCategoricalDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_POLYNOMIAL_CATEGORICAL_DIALOG,
        payload: val
    };
};

export const setShowResponseVectorDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_RESPONSE_VECTOR_DIALOG,
        payload: val
    };
};

export const setShowCodeDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_CODE_DIALOG,
        payload: val
    };
};

export const setCode = (newCode, newImportCode) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_CODE,
        payload: {
            code: newCode,
            importCode: newImportCode,
        }
    };
};

export const addUniqueIdentifier = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_UNIQUE_IDENTIFIER,
        payload: [newVal]
    };
};

export const addName = () => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_NAME,
        payload: [{type: FIELD_TYPE_LIST.NAME, name: 'Name'}]
    };
};

export const addAddress = (number) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_ADDRESS,
        payload: [
            {type: FIELD_TYPE_LIST.ADDRESS_ADDRESS, name: 'Address', groupNum: number},
            {type: FIELD_TYPE_LIST.ADDRESS_CITY, name: 'City', groupNum: number},
            {type: FIELD_TYPE_LIST.ADDRESS_STATE, name: 'State', groupNum: number}
        ]
    };
};

export const addDate = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_DATE,
        payload: [newVal]
    };
};

export const addMultivariateNormal = (newMultivariateNormal, newCovarianceMatrix) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_MULTIVARIATE_NORMAL,
        payload: {
            multivariateNormal: newMultivariateNormal,
            covarianceMatrix: newCovarianceMatrix
        }
    };
};

export const addUniform = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_UNIFORM,
        payload: [newVal]
    };
};

export const addBeta = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_BETA,
        payload: newVal
    };
};

export const addCategorical = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_CATEGORICAL,
        payload: [newVal]
    };
};

export const addCategoricalToNumerical = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_CATEGORICAL_TO_NUMERICAL,
        payload: [newVal]
    };
};

export const addMulticollinear = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_MULTICOLLINEAR,
        payload: [newVal]
    };
};

export const addPolynomialCategorical = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_POLYNOMIAL_CATEGORICAL,
        payload: [newVal]
    };
};

export const addResponseVector = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_RESPONSE_VECTOR,
        payload: [newVal]
    };
};

export const generateCode = (numberOfRows = 1000, fieldList = [], covarianceMatrix = {}) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_CODE,
        payload: generate(numberOfRows, fieldList, covarianceMatrix)
    };
};

export const clearGraph = () => {
    return {
        type: GENERATOR_ACTION_TYPES.CLEAR_GRAPH,
    };
};
