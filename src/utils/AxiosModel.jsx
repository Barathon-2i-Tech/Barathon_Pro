import Axios from './axiosUrl';

export const sendFormDataPost = (url, token, dataValues) => {
    return Axios.api.post(url, dataValues, {
        headers: {
            accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
        },
    });
};
