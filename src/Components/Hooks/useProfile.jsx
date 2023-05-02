import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { profileSchema } from '../../utils/FormSchemaValidation';
import { FormInitialValuesProfile } from '../../utils/FormInitialValue';
import Axios from '../../utils/axiosUrl';

const UseProfile = ({ userId, token, handleFormSubmit }) => {
    const [profile, setProfile] = useState([]);
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);

    useEffect(() => {
        if (userId) {
            getProfile();
            setIsProfileLoaded(true);
        }
    }, [userId]);

    useEffect(() => {
        if (isProfileLoaded && profile) {
            formikProfile.resetForm({
                initialValues: {
                    avatar: profile.avatar || '',
                    last_name: profile.last_name || '',
                    first_name: profile.first_name || '',
                    email: profile.email || '',
                    phone: profile.phone || '',
                },
            });
        }
    }, [isProfileLoaded, profile]);

    async function getProfile() {
        try {
            const response = await Axios.api.get(`/pro/${userId}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data.data[0]);
            setIsProfileLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    const formikProfile = useFormik({
        initialValues: isProfileLoaded ? profile : FormInitialValuesProfile,
        enableReinitialize: true,
        validationSchema: profileSchema,
        onSubmit: (values) => handleFormSubmit(values),
    });

    return {
        profile,
        isProfileLoaded,
        getProfile,
        formikProfile,
    };
};

export default UseProfile;
