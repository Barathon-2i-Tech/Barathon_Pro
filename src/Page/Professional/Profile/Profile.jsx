import '../../../css/Professional/Loader.css';
// import { useState, useEffect } from 'react';
import { useAuth } from '../../../Components/Hooks/useAuth';
// import Axios from '../../../utils/axiosUrl';
import { FormProfile } from '../../../Components/CommonComponents/FormsComponent/FormProfile';
// import { useFormik } from 'formik';
// import { profileSchema } from '../../../utils/FormSchemaValidation';
// import { BasicPage } from '../../../Components/CommonComponents/BasicPage';
import Paper from '@mui/material/Paper';
import UseProfile from '../../../Components/Hooks/useProfile';

export default function ProfileUpdatePage() {
    const { user } = useAuth();
    const token = user.token;
    const userId = user.userLogged.user_id;

    // ------------------------  SUBMIT ------------------------------------------

    // This function handles the form submission
    const handleFormSubmit = (values) => {
        // const categoryIds = formikCategories.values.options;

        const dataValues = { ...values }; //, user_id: userId, establishment_id: establishmentId
        //const urlUpdate = `pro/establishment/${establishmentId}/event/${eventId}`;

        // Create a new FormData object
        const formData = new FormData();

        // Add key-value pairs to FormData
        for (const [key, value] of Object.entries(dataValues)) {
            if (key === 'poster' && value) {
                // If the key is 'poster', add the image file instead of its path
                formData.append(key, value[0]);
            } else {
                formData.append(key, value);
            }
        }

        console.log(formData);
        console.log(dataValues);
        console.log('coucou');
        // Update the event
        // sendFormDataPutMultipart(urlUpdate, token, formData)
        //     .then(() => {
        //         // Navigate to the home page after a delay of 1.5 seconds
        //         setTimeout(() => {
        //             goBack();
        //         }, 1500);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         alert('An error occurred while updating the event. Please try again');
        //     });
    };

    const { profile, isProfileLoaded, formikProfile, selectedImage, setSelectedImage } = UseProfile(
        {
            userId,
            token,
            handleFormSubmit,
        },
    );

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    minHeight: '80vh',
                    width: '100%',
                }}
            >
                <section className="container max-w-2xl m-auto relative sm:pt-6 md:pt-0 px-4 z-10">
                    <div className="flex justify-center pb-4">
                        <img
                            className=" rounded-full h-60 w-60 object-cover	object-top"
                            src={selectedImage}
                            alt="poster"
                            height={30}
                        />
                    </div>

                    {isProfileLoaded && Object.keys(profile).length > 0 && (
                        <FormProfile formik={formikProfile} setSelectedImage={setSelectedImage} />
                    )}
                </section>
            </Paper>
        </>
    );
}
