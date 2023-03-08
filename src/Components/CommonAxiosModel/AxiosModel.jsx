import Axios from '../../utils/axiosUrl';

const apiBaseUrl = 'http://example.com/api/';

export const sendApiRequest = async (url, data, token) => {
    const headers = {
        accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
    };
    const response = await Axios.api.post(apiBaseUrl + url, data, { headers });
    return response.data;
};
