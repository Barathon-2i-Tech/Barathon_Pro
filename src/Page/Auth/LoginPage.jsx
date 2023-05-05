import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import ApplicationLogo from '../../Components/CommonComponents/SvgComponent/ApplicationLogo';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAuth } from '../../Components/Hooks/useAuth';
import Axios from '../../utils/axiosUrl';
import toast, { Toaster } from 'react-hot-toast';
import { ForgetPasswordDialog } from '../../Components/CommonComponents/DialogComponent/ForgetPasswordDialog';

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
                    "🛑 Vous n'avez pas creer de compte ou vos identifiants / mots de passe sont invalides.",
                    {
                        duration: 8000,
                    },
                );
            });
    };
    const handleSubmitForgetPassword = (values) => {
        console.log(values);
        Axios.api
            .post(
                '/mail/change/password',
                {
                    email: values.email,
                },
                {
                    headers: {
                        accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                    },
                },
            )
            .then(() => {
                console.log('bien envoyé');
                toast(
                    '✅ Votre demande a bien été prise en compte, vous allez recevoir votre nouveau mot de passe par e-mail',
                    {
                        duration: 8000,
                    },
                );
            })
            .catch((e) => {
                console.error(e);
                toast(
                    "🛑 Vous n'avez pas creer de compte ou vos identifiants / mots de passe sont invalides.",
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
                <div className="w-full sm:max-w-xl sm:mt-6 sm:px-6 py-4 bg-white md:shadow-lg overflow-hidden sm:rounded-lg z-10">
                    <div className="z-10 flex justify-center items-center">
                        <Link href={`/`}>
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
                                            autoComplete="username"
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
                                            autoComplete="current-password"
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                    </Box>
                                    <Box display="flex flex-wrap" justifyContent="end" mt="20px">
                                        <ForgetPasswordDialog
                                            handleSubmitForgetPassword={handleSubmitForgetPassword}
                                            variant={'text'}
                                            buttonOpenContent={"J'ai oublié mon mot de passe"}
                                            dialogTitle={'Demander un nouveau mot de passe'}
                                            dialogContentText={
                                                'Ajoutez votre email et nous vous enverrons un nouveau mot de passe'
                                            }
                                            textFieldLabel={'E-mail de votre compte'}
                                            textFieldType={'email'}
                                        />

                                        <div className="flex justify-end mt-3">
                                            <Button
                                                onClick={goBack}
                                                color="secondary"
                                                variant="contained"
                                                sx={{ color: 'white', mr: 2 }}
                                            >
                                                Accueil
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className=" bg-cyan-800 text-base lg:text-xl"
                                            >
                                                Se connecter
                                            </Button>
                                        </div>
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
