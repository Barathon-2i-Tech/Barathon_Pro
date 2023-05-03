import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { sendFormDataPut } from '../../../utils/AxiosModel';
import { useAuth } from '../../../Components/Hooks/useAuth';

import { Box, TextField, Grid } from '@mui/material';
// import Link from '@mui/material/Link';
import { FormInitialValuesNewPassword } from '../../../utils/FormInitialValue';
import { newPasswordSchema } from '../../../utils/FormSchemaValidation';

export const FormPassword = () => {
    const { user } = useAuth();
    const token = user.token;
    const userId = user.userLogged.user_id;
    // const labelMap = {
    //     avatar: 'Photo de profil',
    //     last_name: 'Nom',
    //     first_name: 'Prénom',
    //     email: 'E-mail',
    //     phone: 'telephone',
    // };

    // const handleFormSubmit = (values) => {
    //     const data = { ...values };
    //     console.log(data);
    // };
    // ------------------------  SUBMIT ------------------------------------------
    const handleFormSubmit = (values) => {
        const dataValues = { ...values };
        console.log(dataValues);
        const urlCreate = `/pro/${userId}/password`;

        sendFormDataPut(urlCreate, token, dataValues) // Appel de la fonction
            .then((response) => {
                //toast MUI
                // setOpenSnackbar(true);
                // // Navigate to the home page after a delay of 1.5 seconds
                // setTimeout(() => {
                //     goBack();
                // }, 1500);
                console.log(response.data.data);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
            });
    };

    return (
        <>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0,1 fr))">
                <Formik
                    initialValues={FormInitialValuesNewPassword}
                    onSubmit={handleFormSubmit}
                    validationSchema={newPasswordSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0,1 fr))"
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={9}>
                                        <TextField
                                            fullWidth
                                            autoComplete="current-password"
                                            variant="filled"
                                            type="password"
                                            label="Mot de passe actuel"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            //convert to boolean using !! operator
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField
                                            fullWidth
                                            autoComplete="new-password"
                                            variant="filled"
                                            type="password"
                                            label="Nouveau mot de passe"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.new_password}
                                            name="new_password"
                                            //convert to boolean using !! operator
                                            error={!!touched.new_password && !!errors.new_password}
                                            helperText={touched.new_password && errors.new_password}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                    </Grid>

                                    <Grid item xs={9}>
                                        <TextField
                                            fullWidth
                                            autoComplete="new-password"
                                            variant="filled"
                                            type="password"
                                            label="Confirmation du nouveau mot de passe"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.new_password_confirmation}
                                            name="new_password_confirmation"
                                            //convert to boolean using !! operator
                                            error={
                                                !!touched.new_password_confirmation &&
                                                !!errors.new_password_confirmation
                                            }
                                            helperText={
                                                touched.new_password_confirmation &&
                                                errors.new_password_confirmation
                                            }
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box display="flex" justifyContent="center" mt="20px">
                                <button
                                    type="submit"
                                    className="sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                                >
                                    Enregister
                                </button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

FormPassword.propTypes = {
    formik: PropTypes.object,
};
