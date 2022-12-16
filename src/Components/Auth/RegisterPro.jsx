import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, TextField } from '@mui/material';
import { useContext } from 'react';
import { FormContext } from '../../Page/Auth/RegisterHome';
import { useAuth } from '../Hooks/useAuth';
import Axios from '../../utils/axiosUrl';

const initialValues = {
    siren: '',
    kbis: '',
};

const barathonienSchema = yup.object().shape({
    siren: yup.string().required('Siren obligatoire'),
    kbis: yup.string().required('Kbis obligatoire'),
});

export default function RegisterPro() {
    const { formData, setFormData } = useContext(FormContext);

    const { login } = useAuth();

    const handleFormSubmit = (values) => {
        const dataValues = { ...formData, ...values };
        setFormData(dataValues);

        Axios.api
            .post('/register/owner', dataValues, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                },
            })
            .then((response) => {
                if (response.data.data.user.owner_id != null) {
                    login(response.data.data);
                } else {
                    alert("Vous n'etes pas autorisé à accéder à l'administration");
                }
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
            });
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center sm:pt-0 registerWrapper">
            <div className="w-full sm:max-w-lg sm:mt-6 sm:px-6 py-4 bg-white md:shadow-lg overflow-hidden sm:rounded-lg z-10">
                <Box m="20px">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleFormSubmit}
                        validationSchema={barathonienSchema}
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
                                        label="Siren"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.siren}
                                        name="siren"
                                        //convert to boolean using !! operator
                                        error={!!touched.siren && !!errors.siren}
                                        helperText={touched.siren && errors.siren}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="file"
                                        label="K-bis"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.kbis}
                                        name="kbis"
                                        //convert to boolean using !! operator
                                        error={!!touched.kbis && !!errors.kbis}
                                        helperText={touched.kbis && errors.kbis}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px">
                                    <button
                                        type="submit"
                                        className="button-style bg-orange-400 text-white sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0  text-base"
                                    >
                                        S inscrire
                                    </button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </div>
        </div>
    );
}
