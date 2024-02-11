import {ASSIGNMENT_ACTION_TYPES} from './assignment.type';

const ASSIGNMENT_INITIAL_STATE = {
    uscID: '',
    assignmentName: '',
    assignmentId: '',
    questions: [],
    importCode: '',
};

export const assignmentReducer = (
    state = ASSIGNMENT_INITIAL_STATE,
    action = {}
) => {
    const {type, payload} = action;

    switch (type) {
        case ASSIGNMENT_ACTION_TYPES.SET_USC_ID:
            return {...state, uscID: payload};
        case ASSIGNMENT_ACTION_TYPES.SET_QUESTIONS:
            return {...state, questions: payload};
        case ASSIGNMENT_ACTION_TYPES.SET_IMPORT_CODE:
            return {...state, importCode: payload};
        case ASSIGNMENT_ACTION_TYPES.SET_ASSIGNMENT_NAME:
            return {...state, assignmentName: payload};
        case ASSIGNMENT_ACTION_TYPES.SET_ASSIGNMENT_ID:
            return {...state, assignmentId: payload};
        default:
            return state;
    }
};