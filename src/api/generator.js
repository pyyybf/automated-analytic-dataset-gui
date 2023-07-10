import HttpRequest from '../utils/request';

const api = {
    generatorPre: '/api/generator',
};

export const generateFileAPI = (data, format) => {
    return HttpRequest.request({
        url: `${api.generatorPre}/${format}`,
        method: 'POST',
        data
    });
};