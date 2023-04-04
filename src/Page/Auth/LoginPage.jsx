import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import ApplicationLogo from '../../Components/CommonComponents/SvgComponent/ApplicationLogo';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/Hooks/useAuth';
import Axios from '../../utils/axiosUrl';
import toast, { Toaster } from 'react-hot-toast';

const initialValues = {
    email: '',
    password: '',
};
const userSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email est obligatoire'),
    password: yup.string().min(8, 'Minimum 8 characteres').required('obligatoire'),
});

export default function LoginPage() {
    const notify = () => {
        toast(
            "🛑 Vous n'etes pas un utilisateur Professionel \n\n 📲 Veuillez télécharger l'application pour accedez à votre espace",
            {
                duration: 8000,
            },
        );
    };

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate('/');
    };
    // This function is used to the page for barathonien who can't log in website
    // const unauthorizedLog = () => {
    //     navigate('/unauthorizedlogin');
    // };

    const { login } = useAuth();

    const handleSubmitPro = (values) => {
        Axios.api
            .post(
                '/login',
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                    },
                },
            )
            .then((response) => {
                if (response.data.data.userLogged.owner_id != null) {
                    login(response.data.data);
                } else {
                    notify();
                }
            })
            .catch((e) => {
                console.error(e);
                toast(
                    "🛑 Vous n'avez pas creer de compte ou vos identifiants / mots de passe sont mauvais.",
                    {
                        duration: 8000,
                    },
                );
            });
    };

    return (
        <div className="mx-auto max-w-screen-2xl ">
            <Toaster />
            <div className="min-h-screen flex flex-col items-center justify-center sm:pt-6 sm:pt-0">
                <div className="w-full sm:max-w-lg sm:mt-6 sm:px-6 py-4 bg-white md:shadow-lg overflow-hidden sm:rounded-lg z-10">
                    <div className="z-10 flex justify-center items-center">
                        <Link href="/">
                            <ApplicationLogo className="w-28 h-28 sm:w-40 sm:h-40 fill-current z-10" />
                        </Link>
                    </div>
                    <Box m="20px">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmitPro}
                            validationSchema={userSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
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
                                    </Box>
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <div className="w-fit inline-block text-white lg:text-xl">
                                            <button
                                                onClick={goBack}
                                                className="mr-4 sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-orange-300 hover:border-white-900 rounded"
                                            >
                                                Accueil
                                            </button>
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className=" sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-cyan-800 text-base lg:text-xl"
                                        >
                                            Se connecter
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </div>
            </div>
        </div>
    );
}
