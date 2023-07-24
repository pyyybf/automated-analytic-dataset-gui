import {GENERATOR_ACTION_TYPES} from "./generator.type";
import {generateFileAPI} from "../../api/generator";
import generate from "../../utils/codeGenerator";

export const setNumberOfRows = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_NUMBER_OF_ROWS,
        payload: newVal
    }
};

export const setFieldList = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_FIELD_LIST,
        payload: newVal
    }
};

export const setShowUniqueIdentifierDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_UNIQUE_IDENTIFIER_DIALOG,
        payload: val
    }
};

export const setShowMultivariateNormalDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_MULTIVARIATE_NORMAL_DIALOG,
        payload: val
    }
};

export const setShowUniformDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_UNIFORM_DIALOG,
        payload: val
    }
};

export const setShowCategoricalDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_CATEGORICAL_DIALOG,
        payload: val
    }
};

export const setShowCategoricalToNumericalDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_CATEGORICAL_TO_NUMERICAL_DIALOG,
        payload: val
    }
};

export const setShowResponseVectorDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_RESPONSE_VECTOR_DIALOG,
        payload: val
    }
};

export const setShowCodeDialog = (val) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_SHOW_CODE_DIALOG,
        payload: val
    }
};

export const setAlert = (open, text = '', type = 'error') => {
    let payload = {alertOpen: open, alertType: type};
    if (text !== '') payload.alertText = text;
    return {
        type: GENERATOR_ACTION_TYPES.SET_ALERT,
        payload: payload
    }
};

export const setCode = (newVal) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_CODE,
        payload: {
            code: newVal
        }
    }
};

export const addUniqueIdentifier = (newUniqueIdentifier) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_UNIQUE_IDENTIFIER,
        payload: [newUniqueIdentifier]
    }
};

export const addName = () => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_NAME,
        payload: [{type: 'NAME', name: 'Name'}]
    }
};

export const addAddress = (number) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_ADDRESS,
        payload: [
            {type: 'ADDRESS_ADDRESS', name: 'Address', groupNum: number},
            {type: 'ADDRESS_CITY', name: 'City', groupNum: number},
            {type: 'ADDRESS_STATE', name: 'State', groupNum: number}
        ]
    }
};

export const addMultivariateNormal = (newMultivariateNormal, newCovarianceMatrix) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_MULTIVARIATE_NORMAL,
        payload: {
            multivariateNormal: newMultivariateNormal,
            covarianceMatrix: newCovarianceMatrix
        }
    }
};

export const addUniform = (newUniform) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_UNIFORM,
        payload: [newUniform]
    }
};

export const addCategorical = (newCategorical) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_CATEGORICAL,
        payload: [newCategorical]
    }
};

export const addCategoricalToNumerical = (newCategoricalToNumerical) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_CATEGORICAL_TO_NUMERICAL,
        payload: [newCategoricalToNumerical]
    }
};

export const addResponseVector = (responseVector) => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_RESPONSE_VECTOR,
        payload: [responseVector]
    }
};

export const generateFile = (data, format) => {
    return new Promise((resolve, reject) => {
        generateFileAPI(data, format).then(response => {
            if (response.data.hasOwnProperty('success') && !response.data.success) {
                reject(response.data.message);
            } else {
                resolve(response.data);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const generateCode = (numberOfRows = 1000, fieldList = [], covarianceMatrix = []) => {
    return {
        type: GENERATOR_ACTION_TYPES.SET_CODE,
        payload: generate(numberOfRows, fieldList, covarianceMatrix)
    };
};

export const clearGraph = (numberOfRows = 1000, fieldList = [], covarianceMatrix = []) => {
    return {
        type: GENERATOR_ACTION_TYPES.CLEAR_GRAPH,
    };
};
