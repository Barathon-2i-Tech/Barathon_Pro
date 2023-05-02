import '../../../css/Professional/Loader.css';
// import { useState, useEffect } from 'react';
import { useAuth } from '../../../Components/Hooks/useAuth';
// import Axios from '../../../utils/axiosUrl';
import { FormProfile } from '../../../Components/CommonComponents/FormsComponent/FormProfile';
// import { useFormik } from 'formik';
// import { profileSchema } from '../../../utils/FormSchemaValidation';
import { BasicPage } from '../../../Components/CommonComponents/BasicPage';
import Person from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import UseProfile from '../../../Components/Hooks/useProfile';

export default function ProfileUpdatePage() {
    const { user } = useAuth();
    const token = user.token;
    const userId = user.userLogged.user_id;

    const { profile, isProfileLoaded, formikProfile } = UseProfile({
        userId,
        token,
        // handleFormSubmit,
    });

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80vh',
                    width: '100%',
                }}
            >
                <BasicPage title="Profile Page" icon={<Person />} />
                {isProfileLoaded && Object.keys(profile).length > 0 && (
                    <FormProfile formik={formikProfile} />
                )}
            </Paper>
        </>
    );
}
