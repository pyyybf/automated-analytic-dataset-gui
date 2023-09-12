import {ASSIGNMENT_ACTION_TYPES} from "./assignment.type";
import {
    downloadDataAPI,
    getAllAssignmentsAPI,
    getAssignmentByIdAPI,
    saveAssignmentAPI,
    updateAssignmentStateAPI
} from "@/api/assignment";

export const setUscID = (newVal) => {
    return {
        type: ASSIGNMENT_ACTION_TYPES.SET_USC_ID,
        payload: newVal
    };
};

export const setAssignmentName = (newVal) => {
    return {
        type: ASSIGNMENT_ACTION_TYPES.SET_ASSIGNMENT_NAME,
        payload: newVal
    };
};

export const setAssignmentId = (newVal) => {
    return {
        type: ASSIGNMENT_ACTION_TYPES.SET_ASSIGNMENT_ID,
        payload: newVal
    };
};

export const getAllAssignments = (role) => {
    return new Promise((resolve, reject) => {
        getAllAssignmentsAPI(role).then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const getAssignmentById = (id) => {
    return new Promise((resolve, reject) => {
        getAssignmentByIdAPI(id).then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const saveAssignment = (id, name, code, importCode, fieldList) => {
    return new Promise((resolve, reject) => {
        saveAssignmentAPI(id, name, code, importCode, fieldList).then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const downloadData = (id, format, uscID) => {
    return new Promise((resolve, reject) => {
        downloadDataAPI(id, format, uscID).then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const updateAssignmentState = (id, state) => {
    return new Promise((resolve, reject) => {
        updateAssignmentStateAPI(id, state).then(response => {
            if (response.data.success) {
                resolve(response.data.content);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};
