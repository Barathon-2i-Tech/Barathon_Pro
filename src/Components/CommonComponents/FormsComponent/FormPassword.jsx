import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { Box, TextField, Grid } from '@mui/material';
// import Link from '@mui/material/Link';
import { FormInitialValuesNewPassword } from '../../../utils/FormInitialValue';
import { newPasswordSchema } from '../../../utils/FormSchemaValidation';

export const FormPassword = () => {
    // const labelMap = {
    //     avatar: 'Photo de profil',
    //     last_name: 'Nom',
    //     first_name: 'Prénom',
    //     email: 'E-mail',
    //     phone: 'telephone',
    // };

    const handleFormSubmit = (values) => {
        const data = { ...values };
        console.log(data);
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
                                            variant="filled"
                                            type="password"
                                            label="Nouveau mot de passe"
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
                                            variant="filled"
                                            type="password"
                                            label="Confirmation du nouveau mot de passe"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password_confirmation}
                                            name="password_confirmation"
                                            //convert to boolean using !! operator
                                            error={
                                                !!touched.password_confirmation &&
                                                !!errors.password_confirmation
                                            }
                                            helperText={
                                                touched.password_confirmation &&
                                                errors.password_confirmation
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
