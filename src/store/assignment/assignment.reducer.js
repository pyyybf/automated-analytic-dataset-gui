import {ASSIGNMENT_ACTION_TYPES} from './assignment.type';

const ASSIGNMENT_INITIAL_STATE = {
    uscID: '',
    assignmentName: '',
    assignmentId: '',
    questions: [{
        title: '',
        description: '',
        subquestions: [{
            description: '',
            code: 'q_1_1 = ...\nq_1_1',
            outputType: 'number',
            tolerance: 0,
            points: 10,
        }],
    }],
    importCode: '# Please import all the necessary Python packages in this cell\nimport pandas as pd',
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
        case ASSIGNMENT_ACTION_TYPES.CLEAR_ASSIGNMENT:
            return {...ASSIGNMENT_INITIAL_STATE};
        default:
            return state;
    }
};