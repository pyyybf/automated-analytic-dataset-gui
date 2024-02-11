import HttpRequest from '@/utils/request';

const api = {
    assignmentPre: '/api/assignment',
};

export const saveAssignmentAPI = (id, name, dataset, template) => {
    return HttpRequest.request({
        url: `${api.assignmentPre}/save`,
        method: 'POST',
        data: {id, name, dataset, template}
    });
};

export const getAllAssignmentsAPI = (role) => {
    return HttpRequest.request({
        url: `${api.assignmentPre}/getAll`,
        method: 'GET',
        params: {role}
    });
};

export const getAssignmentByIdAPI = (id) => {
    return HttpRequest.request({
        url: `${api.assignmentPre}/get/${id}`,
        method: 'GET',
    });
};

export const downloadDataAPI = (id, format, uscID) => {
    return HttpRequest.request({
        url: `${api.assignmentPre}/data`,
        method: 'POST',
        data: {id, format, uscID}
    });
};

export const updateAssignmentStateAPI = (id, state) => {
    return HttpRequest.request({
        url: `${api.assignmentPre}/updateState/${id}`,
        method: 'PUT',
        data: {state}
    });
};

export const deleteAssignmentAPI = (id) => {
    return HttpRequest.request({
        url: `${api.assignmentPre}/delete/${id}`,
        method: 'DELETE',
    });
};