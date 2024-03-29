import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, TextField } from '@mui/material';
import { useContext } from 'react';
import { FormContext } from '../../Page/Auth/RegisterHome';
import Axios from '../../utils/axiosUrl';
import toast, { Toaster } from 'react-hot-toast';

const initialValues = {
    address: '',
    postal_code: '',
    city: '',
};

const barathonienSchema = yup.object().shape({
    address: yup.string().required('adresse obligatoire'),
    postal_code: yup.string().required('code postal obligatoire'),
    city: yup.string().required('Ville Obligatoire'),
});

export default function RegisterBarathonien() {
    const { formData, setFormData } = useContext(FormContext);

    const notify = () => {
        toast.success('Bien enregistré !');
    };

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const sucessRegister = () => {
        navigate('/registersucess');
    };

    const handleFormSubmit = (values) => {
        const dataValues = { ...formData, ...values };
        setFormData(dataValues);

        Axios.api
            .post(
                '/register/barathonien',
                {
                    address: dataValues.address,
                    birthday: dataValues.birthday,
                    city: dataValues.city,
                    email: dataValues.email,
                    first_name: dataValues.first_name,
                    last_name: dataValues.last_name,
                    password: dataValues.password,
                    password_confirmation: dataValues.password_confirmation,
                    postal_code: dataValues.postal_code,
                },
                {
                    headers: {
                        accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                    },
                },
            )
            .then(() => {
                notify();
                sucessRegister();
            })
            .catch((e) => {
                console.error(e);
                toast.error("Cela n'a pas abouti. \n\n Retournez à l'acceuil et ressayez");
            });
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center sm:pt-0 registerWrapper">
            <Toaster />
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
                                        variant="outlined"
                                        type="text"
                                        label="Adresse"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address}
                                        name="address"
                                        //convert to boolean using !! operator
                                        error={!!touched.address && !!errors.address}
                                        helperText={touched.address && errors.address}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Code Postal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.postal_code}
                                        name="postal_code"
                                        //convert to boolean using !! operator
                                        error={!!touched.postal_code && !!errors.postal_code}
                                        helperText={touched.postal_code && errors.postal_code}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Ville"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.city}
                                        name="city"
                                        //convert to boolean using !! operator
                                        error={!!touched.city && !!errors.city}
                                        helperText={touched.city && errors.city}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px">
                                    <button
                                        type="submit"
                                        className=" bg-orange-400 text-white sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 text-base"
                                    >
                                        {/*eslint-disable-next-line react/no-unescaped-entities*/}
                                        S'inscrire
                                        {/*TODO @Simon remove disable eslint*/}
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
