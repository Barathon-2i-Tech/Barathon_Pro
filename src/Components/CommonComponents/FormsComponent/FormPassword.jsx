import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Box, TextField, Grid, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormInitialValuesNewPassword } from '../../../utils/FormInitialValue';
import { newPasswordSchema } from '../../../utils/FormSchemaValidation';
import { sendFormDataPut } from '../../../utils/AxiosModel';
import { useState } from 'react';

export const FormPassword = ({ token, userId, setOpenSnackbaPassword }) => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        new_password: false,
        new_password_confirmation: false,
    });

    const toggleShowPassword = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handleFormPasswordSubmit = (values, resetForm) => {
        const dataValues = { ...values };
        const urlCreate = `/user/${userId}/password`;
        setOpenSnackbaPassword(true);

        sendFormDataPut(urlCreate, token, dataValues) // Appel de la fonction
            .then(() => {
                //toast MUI
                setOpenSnackbaPassword(true);
                resetForm();
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
                    onSubmit={(values, { resetForm }) =>
                        handleFormPasswordSubmit(values, resetForm)
                    }
                    validationSchema={newPasswordSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="username" autoComplete="username" hidden />
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
                                            type={showPassword.password ? 'text' : 'password'}
                                            label="Mot de passe actuel"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton
                                            edge="end"
                                            onClick={() => toggleShowPassword('password')}
                                        >
                                            {showPassword.password ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField
                                            fullWidth
                                            autoComplete="new-password"
                                            variant="filled"
                                            type={showPassword.new_password ? 'text' : 'password'}
                                            label="Nouveau mot de passe"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.new_password}
                                            name="new_password"
                                            error={!!touched.new_password && !!errors.new_password}
                                            helperText={touched.new_password && errors.new_password}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton
                                            edge="end"
                                            onClick={() => toggleShowPassword('new_password')}
                                        >
                                            {showPassword.new_password ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </Grid>

                                    <Grid item xs={9}>
                                        <TextField
                                            fullWidth
                                            autoComplete="new-password"
                                            variant="filled"
                                            type={
                                                showPassword.new_password_confirmation
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            label="Confirmation du nouveau mot de passe"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.new_password_confirmation}
                                            name="new_password_confirmation"
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
                                    <Grid item xs={1}>
                                        <IconButton
                                            edge="end"
                                            onClick={() =>
                                                toggleShowPassword('new_password_confirmation')
                                            }
                                        >
                                            {showPassword.new_password_confirmation ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
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
    token: PropTypes.string,
    userId: PropTypes.number,
    setOpenSnackbaPassword: PropTypes.func,
};
