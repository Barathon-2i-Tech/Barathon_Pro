import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
//import axios from 'axios';
//import Stepper from "../CommonComponents/Stepper";
import { useContext } from 'react';
import { FormContext } from './Register';
import '../../css/Auth/Register.css';

export default function Register() {
    const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

    const initialValues = {
        last_name: '',
        first_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };

    const userSchema = yup.object().shape({
        last_name: yup.string().required('Nom obligatoire'),
        first_name: yup.string().required('Prénom obligatoire'),
        email: yup.string().email('Invalid Email').required('Email est obligatoire'),
        password: yup.string().min(8, 'Minimum 8 characteres').required('obligatoire'),
        password_confirmation: yup
            .string()
            .min(8, 'Minimum 8 characteres')
            .required('obligatoire')
            .oneOf([yup.ref('password'), null], 'mot de passe doivent etre identiques'),
    });

    const handleFormSubmit = (values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
    };

    return (
        <div className="min-h-screen flex flex-col justify-start items-center sm:pt-0 registerWrapper">
            <div className="w-full sm:max-w-lg sm:mt-6 sm:px-6 py-4 bg-white md:shadow-lg overflow-hidden sm:rounded-lg z-10">
                <Box m="20px">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleFormSubmit}
                        validationSchema={userSchema}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0,1 fr))"
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Prénom"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.first_name}
                                        name="first_name"
                                        //convert to boolean using !! operator
                                        error={!!touched.first_name && !!errors.first_name}
                                        helperText={touched.first_name && errors.first_name}
                                        //color="primary"
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Nom"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.last_name}
                                        name="last_name"
                                        //convert to boolean using !! operator
                                        error={!!touched.last_name && !!errors.last_name}
                                        helperText={touched.last_name && errors.last_name}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="email"
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        //convert to boolean using !! operator
                                        error={!!touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="password"
                                        label="Mot de passe"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        //convert to boolean using !! operator
                                        error={!!touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="password"
                                        label="Confirmation du mot de passe"
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
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className="sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-cyan-800 text-base"
                                    >
                                        Etape suivante
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </div>
        </div>
    );
}
