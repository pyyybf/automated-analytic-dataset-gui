import {ASSIGNMENT_ACTION_TYPES} from "./assignment.type";
import {
    deleteAssignmentAPI,
    downloadAutoGraderAPI,
    downloadDataAPI,
    getAllAssignmentsAPI,
    getAssignmentByIdAPI,
    runNotebookAPI,
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

export const setImportCode = (newVal) => {
    return {
        type: ASSIGNMENT_ACTION_TYPES.SET_IMPORT_CODE,
        payload: newVal
    };
};

export const setQuestions = (newVal) => {
    return {
        type: ASSIGNMENT_ACTION_TYPES.SET_QUESTIONS,
        payload: newVal
    };
};

export const setOutputs = (newVal) => {
    return {
        type: ASSIGNMENT_ACTION_TYPES.SET_OUTPUTS,
        payload: newVal
    };
};

export const clearAssignment = () => {
    return {
        type: ASSIGNMENT_ACTION_TYPES.CLEAR_ASSIGNMENT,
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

export const saveAssignment = (id, name, dataset, template) => {
    return new Promise((resolve, reject) => {
        saveAssignmentAPI(id, name, dataset, template).then(response => {
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

export const deleteAssignment = (id) => {
    return new Promise((resolve, reject) => {
        deleteAssignmentAPI(id).then(response => {
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

export const downloadAutoGrader = (id) => {
    return new Promise((resolve, reject) => {
        downloadAutoGraderAPI(id).then(response => {
            if (response.status === 200) {
                resolve(response.data);
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const runNotebook = (id, importCode, questions) => {
    return new Promise((resolve, reject) => {
        runNotebookAPI(id, importCode, questions).then(response => {
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

