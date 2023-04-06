import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, TextField, Button } from '@mui/material';
import { useContext } from 'react';
import { FormContext } from '../../Page/Auth/RegisterHome';
import { useAuth } from '../Hooks/useAuth';
import Axios from '../../utils/axiosUrl';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';

// Define the initial values for the form's fields.
const initialValues = {
    siren: '',
    kbis: '',
};

// Define a Yup validation schema for the form.
const barathonienSchema = yup.object().shape({
    siren: yup.string().required('Siren obligatoire'),
    kbis: yup.string().default(''),
});

// Define the RegisterPro component that will render the form.
export default function RegisterPro() {
    // Set up some state variables for tracking the selected file and form data.
    const [fileName, setFileName] = useState('');
    const { formData } = useContext(FormContext);
    const [kbis, setKbis] = useState('');

    // Import the login function from the useAuth hook.
    const { login } = useAuth();

    // Define a function to handle changes to the file input.
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setKbis(file); // Update kbis directly.
        setFileName(file.name);
    };

    // Define a function to handle form submission.
    const handleFormSubmit = async (values) => {
        const dataToSend = { ...formData, ...values };
        const formDataToSend = new FormData();
        for (const key in dataToSend) {
            formDataToSend.append(key, dataToSend[key]);
        }
        formDataToSend.append('kbis', kbis);

        // Send the form data to the server using Axios.
        Axios.api
            .post('/register/owner', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if (response.data.data.userLogged.owner_id != null) {
                    login(response.data.data);
                } else {
                    alert("Vous n'etes pas autorisé à accéder à l'espace professionel");
                }
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
            });
    };

    // Render the form using Formik.
    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center sm:pt-0 registerWrapper">
            <div className="w-full sm:max-w-lg sm:mt-6 sm:px-6 py-4 bg-white md:shadow-lg overflow-hidden sm:rounded-lg z-10">
                <Box m="20px">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleFormSubmit}
                        validationSchema={barathonienSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            helperText,
                            error,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0,1 fr))"
                                >
                                    <Box gridColumn="1 / span 2">
                                        <Button variant="contained" component="label">
                                            <UploadIcon style={{ marginRight: '8px' }} />
                                            Téléchargez votre K-bis
                                            <input
                                                hidden
                                                accept=".pdf"
                                                type="file"
                                                name="kbis"
                                                onChange={handleFileChange}
                                            />
                                        </Button>
                                    </Box>
                                    <Box ml={2} gridColumn="1 / span 2" gridRow="2">
                                        <span>{fileName}</span>
                                        {error && (
                                            <div style={{ color: 'red', marginLeft: '8px' }}>
                                                {helperText}
                                            </div>
                                        )}
                                    </Box>
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
