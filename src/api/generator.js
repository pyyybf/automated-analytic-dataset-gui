import HttpRequest from '@/utils/request';

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

export const generateDataAPI = (code, importCode, format) => {
    return HttpRequest.request({
        url: `${api.generatorPre}/run`,
        method: 'POST',
        data: {code, importCode, format}
    });
};