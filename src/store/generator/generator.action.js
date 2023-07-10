import {GENERATOR_ACTION_TYPES} from "./generator.type";
import {generateFileAPI} from "../../api/generator";

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

export const addAddress = () => {
    return {
        type: GENERATOR_ACTION_TYPES.ADD_ADDRESS,
        payload: [
            {type: 'ADDRESS_ADDRESS', name: 'Address'},
            {type: 'ADDRESS_CITY', name: 'City'},
            {type: 'ADDRESS_STATE', name: 'State'}
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

export const generateFile = (data) => {
    return new Promise((resolve, reject) => {
        generateFileAPI(data).then(response => {
            if (response.data.hasOwnProperty('success') && !response.data.success) {
                reject(response.data.message);
            } else {
                resolve(response.data);
            }
        }).catch(error => {
            reject(error);
        });
    });
};
