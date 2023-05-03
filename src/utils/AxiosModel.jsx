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

export const sendFormDataPutCategory = (url, token, dataValues) => {
    return Axios.api.put(url, dataValues, {
        headers: {
            accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const sendFormDataPutMultipart = (url, token, formData) => {
    // Ajoutez le champ _method avec la valeur PUT
    formData.append('_method', 'PUT');

    // Utilisez la méthode POST au lieu de PUT
    return Axios.api.post(url, formData, {
        headers: {
            accept: 'application/vnd.api+json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const sendFormDataPutApplication = (url, token, formData) => {
    return Axios.api.put(url, formData, {
        headers: {
            accept: 'application/vnd.api+json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const sendFormDataPut = (url, token, dataValues) => {
    return Axios.api.put(url, dataValues, {
        headers: {
            accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
        },
    });
};
