import { BasicPage } from '../../Components/CommonComponents/BasicPage';
// import { Loader } from '../../Components/CommonComponents/Loader';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import '../../css/Professional/Establishment.css';
import '../../css/Professional/Loader.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useAuth } from '../../Components/Hooks/useAuth';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function EstablishmentCreatePage() {
    const { user } = useAuth();
    //const [establishments, setEstablishments] = useState([]);
    //const { id } = useParams();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const [opening, setOpening] = useState({});
    const [openingFormat, setOpeningFormat] = useState({});
    const openingJson = JSON.stringify(
        Object.entries(opening).reduce(
            (acc, [key, value]) => ({ ...acc, [key.toLowerCase()]: value }),
            {},
        ),
    );

    const initialValuesOpening = {
        lundi: '',
        mardi: '',
        mercredi: '',
        jeudi: '',
        vendredi: '',
        samedi: '',
        dimanche: '',
    };
    const initialValuesForm = {
        logo: '',
        siret: '',
        trade_name: '',
        address: '',
        city: '',
        postal_code: '',
        phone: '',
        email: '',
        website: '',
    };

    const openingSchema = yup.object().shape({
        lundi: yup.string().required('obligatoire'),
        mardi: yup.string().required('obligatoire'),
        mercredi: yup.string().required('obligatoire'),
        jeudi: yup.string().required('obligatoire'),
        vendredi: yup.string().required('obligatoire'),
        samedi: yup.string().required('obligatoire'),
        dimanche: yup.string().required('obligatoire'),
    });

    const establishmentSchema = yup.object().shape({
        trade_name: yup.string().required('obligatoire'),
        siret: yup.string().required('obligatoire'),
        address: yup.string().required('obligatoire'),
        city: yup.string().required('obligatoire'),
        postal_code: yup.string().required('obligatoire'),
        logo: yup.string().required('obligatoire'),
        phone: yup.string().required('obligatoire'),
        email: yup.string().required('obligatoire'),
        website: yup.string().required('obligatoire'),
        // opening: yup.object().required('obligatoire'),
    });

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate('/pro/establishment');
    };

    //LOADER
    //  const loader = document.getElementById('loader');
    //  function hideLoading() {
    //     if (loader) {
    //         loader.classList.remove('display');
    //       } else {
    //         setTimeout(hideLoading, 100);
    //       }
    //  }

    // async function getEstablishment() {
    //     try {
    //         const response = await Axios.api.get(`/pro/${ownerId}/establishment/${id}`, {
    //             headers: {
    //                 accept: 'application/vnd.api+json',
    //                 'Content-Type': 'application/vnd.api+json',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         setEstablishments(response.data.data);
    //         await new Promise((resolve) => setTimeout(resolve)); // Attendre un tick pour laisser le temps à React de mettre à jour l'interface utilisateur
    //         const loader = document.getElementById('loader');
    //         if (loader) {
    //             loader.classList.remove('display');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getEstablishment();
    // }, []);

    const handleFormSubmitOpening = (values) => {
        const notify = () => {
            toast('✅ Horraire Bien enregistré ! SAUVEGARDER pour valider vos modifications !!', {
                duration: 8000,
            });
        };

        const dataValuesOpening = { ...values };
        setOpening(dataValuesOpening);
        notify();
        //console.log(opening);
        //console.log(establishments);
        //console.log(openingJson);
    };
    useEffect(() => {
        console.log(opening);
        setOpeningFormat(openingJson);
        console.log(openingJson);
    }, [opening]);

    const handleFormSubmit = (values) => {
        const notify = () => {
            toast('✅ Votre demande a bien été envoyé ! Votre etablissement sera en attente le temps de validation des documents fournis', {
                duration: 8000,
            });
        };

        const dataValues = { ...values, opening: openingFormat };

        Axios.api
            .post(`/pro/${ownerId}/establishment/create`, dataValues, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                notify();
                console.log(dataValues);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                console.log(dataValues);
            });
    };

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: '80vh',
                width: '100%',
            }}
        >
            <Toaster />
            <BasicPage title="Creer mon etablissement" icon={<BusinessIcon />} />

            <section className="container relative sm:pt-6 md:pt-11 px-4 z-10">
                
                <div className="mx-6 font-bold">
                    1ere ETAPE (facultative): modifier tous les champs de
                    la semaine et enregister, puis sauvegarder si vous modifiez uniquement les horaires, sinon passez à la prochaine étape.
                </div>
                <Box m="20px">
                    <Formik
                        initialValues={initialValuesOpening}
                        onSubmit={handleFormSubmitOpening}
                        validationSchema={openingSchema}
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
                                        label="Lundi"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lundi}
                                        name="lundi"
                                        //convert to boolean using !! operator
                                        error={!!touched.lundi && !!errors.lundi}
                                        helperText={touched.lundi && errors.lundi}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="mardi"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.mardi}
                                        name="mardi"
                                        //convert to boolean using !! operator
                                        error={!!touched.mardi && !!errors.mardi}
                                        helperText={touched.mardi && errors.mardi}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="mercredi"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.mercredi}
                                        name="mercredi"
                                        //convert to boolean using !! operator
                                        error={!!touched.mercredi && !!errors.mercredi}
                                        helperText={touched.mercredi && errors.mercredi}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="jeudi"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.jeudi}
                                        name="jeudi"
                                        //convert to boolean using !! operator
                                        error={!!touched.jeudi && !!errors.jeudi}
                                        helperText={touched.jeudi && errors.jeudi}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="vendredi"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.vendredi}
                                        name="vendredi"
                                        //convert to boolean using !! operator
                                        error={!!touched.vendredi && !!errors.vendredi}
                                        helperText={touched.vendredi && errors.vendredi}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="samedi"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.samedi}
                                        name="samedi"
                                        //convert to boolean using !! operator
                                        error={!!touched.samedi && !!errors.samedi}
                                        helperText={touched.samedi && errors.samedi}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="dimanche"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.dimanche}
                                        name="dimanche"
                                        //convert to boolean using !! operator
                                        error={!!touched.dimanche && !!errors.dimanche}
                                        helperText={touched.dimanche && errors.dimanche}
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px" mb="20px">
                                    <button
                                        type="submit"
                                        className=" sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                                    >
                                        Enregistrer mes nouveaux horraires
                                    </button>
                                </Box>
                            </form>
                        )}
                    </Formik>

                    {/* <Loader allClass={'loading display'} /> */}

                    <div className="pb-4 font-bold">
                ETAPE 2 : modifier tous les champs puis envoyez votre demande de création.
                </div>
                        <Formik
                            initialValues={{initialValuesForm}}
                            onSubmit={handleFormSubmit}
                            validationSchema={establishmentSchema}
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
                                            type="text"
                                            label="Logo"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.logo}
                                            name="logo"
                                            //convert to boolean using !! operator
                                            error={!!touched.logo && !!errors.logo}
                                            helperText={touched.logo && errors.logo}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Nom de l'etablissement"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.trade_name}
                                            name="trade_name"
                                            //convert to boolean using !! operator
                                            error={!!touched.trade_name && !!errors.trade_name}
                                            helperText={touched.trade_name && errors.trade_name}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Siret"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.siret}
                                            name="siret"
                                            //convert to boolean using !! operator
                                            error={!!touched.siret && !!errors.siret}
                                            helperText={touched.siret && errors.siret}
                                            sx={{ gridColumn: 'span 4' }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
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
                                            variant="filled"
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
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Code postal"
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
                                            variant="filled"
                                            type="text"
                                            label="Telephone"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.phone}
                                            name="phone"
                                            //convert to boolean using !! operator
                                            error={!!touched.phone && !!errors.phone}
                                            helperText={touched.phone && errors.phone}
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
                                            sx={{ gridColumn: 'span 2' }}
                                        />

                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Site Web"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.website}
                                            name="website"
                                            //convert to boolean using !! operator
                                            error={!!touched.website && !!errors.website}
                                            helperText={touched.website && errors.website}
                                            sx={{ gridColumn: 'span 2' }}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <div className="w-fit inline-block text-white lg:text-xl">
                                            <button
                                                onClick={goBack}
                                                className="w-fit mr-2 bg-red-700 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            className=" sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                                        >
                                            Envoyer ma demande
                                        </button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                </Box>
            </section>
        </Paper>
    );
}
