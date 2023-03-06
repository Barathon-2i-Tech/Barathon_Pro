import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import { Loader } from '../../Components/CommonComponents/Loader';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import '../../css/Professional/Establishment.css';
import '../../css/Professional/Loader.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Components/Hooks/useAuth';
import { Formik } from 'formik';
import { Box, Grid } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { EstablishmentSchemaOpening } from '../../utils/FormSchemaValidation';
import { establishmentSchema } from '../../utils/FormSchemaValidation';
import { FormFieldModel } from '../../Components/CommonComponents/FormFieldModel';

export default function EstablishmentFormPage() {
    const { user } = useAuth();
    const [establishments, setEstablishments] = useState([]);
    const { id } = useParams();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const [opening, setOpening] = useState({});
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

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate('/pro/establishment');
    };

    async function getEstablishment() {
        try {
            const response = await Axios.api.get(`/pro/${ownerId}/establishment/${id}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setEstablishments(response.data.data);
            await new Promise((resolve) => setTimeout(resolve)); // Attendre un tick pour laisser le temps à React de mettre à jour l'interface utilisateur
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('display');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEstablishment();
    }, []);

    const handleFormSubmitOpening = (values) => {
        const notify = () => {
            toast('✅ Horraire Bien enregistré ! SAUVEGARDER pour valider vos modifications !!', {
                duration: 8000,
            });
        };

        const dataValuesOpening = { ...values };
        setOpening(dataValuesOpening);
        notify();
        console.log(opening);
        console.log(establishments);
        console.log(openingJson);
    };
    useEffect(() => {
        console.log(opening);
    }, [opening]);

    const handleFormSubmit = (values) => {
        const notify = () => {
            toast('✅ Bien enregistré !', {
                duration: 8000,
            });
        };

        const dataValues = { ...values, opening: openingJson };

        Axios.api
            .post(`/pro/${ownerId}/establishment/${id}/update`, dataValues, {
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
            <BasicPage title="Modifier mon etablissement" icon={<BusinessIcon />} />

            <section className="container relative sm:pt-6 md:pt-11 px-4 z-10">
                <Toaster />
                <div className="mx-6 font-bold">
                    ETAPE 1 (facultative): modifier tous les champs de la semaine et enregister,
                    puis sauvegarder si vous modifiez uniquement les horaires, sinon passez à la
                    prochaine étape.
                </div>
                <Box m="20px">
                    <Formik
                        initialValues={initialValuesOpening}
                        onSubmit={handleFormSubmitOpening}
                        validationSchema={EstablishmentSchemaOpening}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0,1 fr))"
                                >
                                    <Grid container spacing={2}>
                                        <FormFieldModel
                                            grid={6}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lundi}
                                            name={'lundi'}
                                            //convert to boolean using !! operator
                                            error={!!touched.lundi && !!errors.lundi}
                                            helperText={touched.lundi && errors.lundi}
                                        />
                                        <FormFieldModel
                                            grid={6}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.mardi}
                                            name={'mardi'}
                                            //convert to boolean using !! operator
                                            error={!!touched.mardi && !!errors.mardi}
                                            helperText={touched.mardi && errors.mardi}
                                        />
                                        <FormFieldModel
                                            grid={6}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.mercredi}
                                            name={'mercredi'}
                                            //convert to boolean using !! operator
                                            error={!!touched.mercredi && !!errors.mercredi}
                                            helperText={touched.mercredi && errors.mercredi}
                                        />
                                        <FormFieldModel
                                            grid={6}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.jeudi}
                                            name={'jeudi'}
                                            //convert to boolean using !! operator
                                            error={!!touched.jeudi && !!errors.jeudi}
                                            helperText={touched.jeudi && errors.jeudi}
                                        />
                                        <FormFieldModel
                                            grid={6}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.vendredi}
                                            name={'vendredi'}
                                            //convert to boolean using !! operator
                                            error={!!touched.vendredi && !!errors.vendredi}
                                            helperText={touched.vendredi && errors.vendredi}
                                        />
                                        <FormFieldModel
                                            grid={6}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.samedi}
                                            name={'samedi'}
                                            //convert to boolean using !! operator
                                            error={!!touched.samedi && !!errors.samedi}
                                            helperText={touched.samedi && errors.samedi}
                                        />
                                        <FormFieldModel
                                            grid={12}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.dimanche}
                                            name={'dimanche'}
                                            //convert to boolean using !! operator
                                            error={!!touched.dimanche && !!errors.dimanche}
                                            helperText={touched.dimanche && errors.dimanche}
                                        />
                                    </Grid>
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

                    <div className="pb-4 font-bold">
                        ETAPE 2 (facultative): modifier tous les champs puis sauvegarder.
                    </div>

                    <Loader allClass={'loading display'} />
                    {establishments.map((establishment) => (
                        <Formik
                            key={establishment.establishment_id}
                            initialValues={{
                                logo: establishment.logo || '',
                                trade_name: establishment.trade_name || '',
                                siret: establishment.siret || '',
                                address: establishment.address || '',
                                city: establishment.city || '',
                                postal_code: establishment.postal_code || '',
                                phone: establishment.phone || '',
                                email: establishment.email || '',
                                website: establishment.website || '',
                            }}
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
                                        <Grid container spacing={2}>
                                            <FormFieldModel
                                                grid={12}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.logo}
                                                name={'logo'}
                                                //convert to boolean using !! operator
                                                error={!!touched.logo && !!errors.logo}
                                                helperText={touched.logo && errors.logo}
                                            />
                                            <FormFieldModel
                                                grid={6}
                                                label="Nom de l'etablissement"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.trade_name}
                                                name={'trade_name'}
                                                //convert to boolean using !! operator
                                                error={!!touched.trade_name && !!errors.trade_name}
                                                helperText={touched.trade_name && errors.trade_name}
                                            />
                                            <FormFieldModel
                                                grid={6}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.siret}
                                                name={'siret'}
                                                //convert to boolean using !! operator
                                                error={!!touched.siret && !!errors.siret}
                                                helperText={touched.siret && errors.siret}
                                            />
                                            <FormFieldModel
                                                grid={6}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address}
                                                name={'address'}
                                                //convert to boolean using !! operator
                                                error={!!touched.address && !!errors.address}
                                                helperText={touched.address && errors.address}
                                            />
                                            <FormFieldModel
                                                grid={6}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.city}
                                                name={'city'}
                                                //convert to boolean using !! operator
                                                error={!!touched.city && !!errors.city}
                                                helperText={touched.city && errors.city}
                                            />
                                            <FormFieldModel
                                                grid={6}
                                                label="Code postal"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.postal_code}
                                                name={'postal_code'}
                                                //convert to boolean using !! operator
                                                error={
                                                    !!touched.postal_code && !!errors.postal_code
                                                }
                                                helperText={
                                                    touched.postal_code && errors.postal_code
                                                }
                                            />
                                            <FormFieldModel
                                                grid={6}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phone}
                                                name={'phone'}
                                                //convert to boolean using !! operator
                                                error={!!touched.phone && !!errors.phone}
                                                helperText={touched.phone && errors.phone}
                                            />
                                            <FormFieldModel
                                                grid={6}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                name={'email'}
                                                //convert to boolean using !! operator
                                                error={!!touched.email && !!errors.email}
                                                helperText={touched.email && errors.email}
                                            />

                                            <FormFieldModel
                                                grid={6}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.website}
                                                name={'website'}
                                                //convert to boolean using !! operator
                                                error={!!touched.website && !!errors.website}
                                                helperText={touched.website && errors.website}
                                            />
                                        </Grid>
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
                                            Sauvegarder
                                        </button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    ))}
                </Box>
            </section>
        </Paper>
    );
}
