import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { profileSchema } from '../../utils/FormSchemaValidation';
import { FormInitialValuesProfile } from '../../utils/FormInitialValue';
import Axios from '../../utils/axiosUrl';

const UseProfile = ({ userId, token, handleFormSubmit }) => {
    const [profile, setProfile] = useState([]);
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(
        'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/Photo.png',
    );
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        if (userId) {
            (async () => {
                await getProfile();
                setIsProfileLoaded(true);
            })();
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
            // Filtrez les champs souhaités à partir de la réponse
            const fields = ['avatar', 'last_name', 'first_name', 'email', 'phone', 'avatar'];
            const filteredProfile = fields.reduce((result, field) => {
                result[field] = response.data.data[0][field] || '';
                return result;
            }, {});

            // Affectez les données filtrées à `setProfile`
            setProfile(filteredProfile);
            setAvatarUrl(filteredProfile.avatar);
            setIsProfileLoaded(true);
        } catch (error) {
            console.error('Error getting profile:', error);
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
        avatarUrl,
        isProfileLoaded,
        getProfile,
        formikProfile,
        selectedImage,
        setSelectedImage,
    };
};

export default UseProfile;
