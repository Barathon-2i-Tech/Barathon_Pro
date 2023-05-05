import '../../../css/Professional/Loader.css';
import { useAuth } from '../../../Components/Hooks/useAuth';
import { FormProfile } from '../../../Components/CommonComponents/FormsComponent/FormProfile';
import Paper from '@mui/material/Paper';
import UseProfile from '../../../Components/Hooks/useProfile';
import { sendFormDataPutMultipart, sendFormDataPut } from '../../../utils/AxiosModel';
import { FormPassword } from '../../../Components/CommonComponents/FormsComponent/FormPassword';
import Divider from '@mui/material/Divider';
import { ToastForm } from '../../../Components/CommonComponents/Toast/ToastForm';
import { useState } from 'react';

export default function ProfileUpdatePage() {
    const { user } = useAuth();
    const token = user.token;
    const userId = user.userLogged.user_id;
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openSnackbarPassword, setOpenSnackbaPassword] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpenSnackbaPassword(false);
    };

    // ------------------------  SUBMIT ------------------------------------------

    // This function handles the form submission
    const handleFormSubmit = (values) => {
        // const categoryIds = formikCategories.values.options;

        const dataValues = { ...values };
        const urlUpdate = `pro/${userId}`;

        // Create a new FormData object
        const formData = new FormData();

        // Add key-value pairs to FormData
        for (const [key, value] of Object.entries(dataValues)) {
            if (key === 'avatar' && value) {
                // If the key is 'avatar', add the image file instead of its path
                formData.append(key, value[0]);
            } else {
                formData.append(key, value);
            }
        }
        // Update the event
        sendFormDataPutMultipart(urlUpdate, token, formData)
            .then(() => {
                setOpenSnackbar(true);
            })
            .catch((error) => {
                console.log(error);
                alert('An error occurred while updating the event. Please try again');
            });
    };

    const handleFormPasswordSubmit = (values) => {
        const dataValues = { ...values };
        console.log(dataValues);
        const urlCreate = `/user/${userId}/password`;
        setOpenSnackbaPassword(true);

        sendFormDataPut(urlCreate, token, dataValues) // Appel de la fonction
            .then((response) => {
                //toast MUI
                setOpenSnackbar(true);
                console.log(response.data.data);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
            });
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
                <ToastForm
                    openSnackbar={openSnackbar}
                    handleSnackbarClose={handleSnackbarClose}
                    title={'Felicitation !'}
                    message={'Votre profile a bien été modifié !'}
                    severity={'success'}
                />
                <ToastForm
                    openSnackbar={openSnackbarPassword}
                    handleSnackbarClose={handleSnackbarClose}
                    title={'Felicitation !'}
                    message={'Votre mot de passe a été modifié !'}
                    severity={'success'}
                />
                <section className="container max-w-2xl m-auto relative sm:pt-6 md:pt-0 px-4 pb-7 z-10">
                    {isProfileLoaded && Object.keys(profile).length > 0 && (
                        <>
                            <div className="text-center text-2xl text-teal-700 font-bold pb-6 sm:mt-7">
                                MODIFIER MON PROFIL :
                            </div>
                            <div className="flex justify-center pb-4">
                                <img
                                    className="rounded-full h-40 w-40 object-cover object-top"
                                    src={selectedImage}
                                    alt="avatar"
                                    height={30}
                                />
                            </div>
                            <FormProfile
                                formik={formikProfile}
                                setSelectedImage={setSelectedImage}
                            />
                            <Divider
                                sx={{
                                    my: 7,
                                }}
                            />
                            <div className="text-center text-2xl text-teal-700 font-bold pb-6 ">
                                MODIFIER MON MOT DE PASSE :
                            </div>
                            <FormPassword handleFormPasswordSubmit={handleFormPasswordSubmit} />
                        </>
                    )}
                </section>
            </Paper>
        </>
    );
}
