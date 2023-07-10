import HttpRequest from '../utils/request';

const api = {
    generatorPre: '/api/generator',
};

export const generateFileAPI = (data) => {
    return HttpRequest.request({
        url: `${api.generatorPre}/${data.format}`,
        method: 'POST',
        data
    });
};