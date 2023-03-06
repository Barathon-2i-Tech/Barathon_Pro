import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import '../../css/Professional/Establishment.css';
import '../../css/Professional/Loader.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Components/Hooks/useAuth';
import { Formik } from 'formik';
import { EstablishmentSchemaOpening, establishmentSchema } from '../../utils/FormSchemaValidation';
import { Box, Grid } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FormFieldModel } from '../../Components/CommonComponents/FormFieldModel';
import {
    FormInitialValuesOpening,
    FormInitialValuesEstablishment,
} from '../../utils/FormInitialValue';

export default function EstablishmentCreatePage() {
    const { user } = useAuth();
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

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate('/pro/establishment');
    };

    const handleFormSubmitOpening = (values) => {
        const notify = () => {
            toast('✅ Horraire Bien enregistré ! SAUVEGARDER pour valider vos modifications !!', {
                duration: 8000,
            });
        };

        const dataValuesOpening = { ...values };
        setOpening(dataValuesOpening);
        notify();
    };
    useEffect(() => {
        setOpeningFormat(openingJson);
    }, [opening]);

    const handleFormSubmit = (values) => {
        const notify = () => {
            toast(
                '✅ Votre demande a bien été envoyé ! Votre etablissement sera en attente le temps de validation des documents fournis',
                {
                    duration: 8000,
                },
            );
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
                    1ere ETAPE (facultative): modifier tous les champs de la semaine et enregister,
                    puis sauvegarder si vous modifiez uniquement les horaires, sinon passez à la
                    prochaine étape.
                </div>
                <Box m="20px">
                    <Formik
                        initialValues={FormInitialValuesOpening}
                        onSubmit={handleFormSubmitOpening}
                        validationSchema={EstablishmentSchemaOpening}
                        enableReinitialize={true}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0,1 fr))"
                                >
                                    <Grid container spacing={2}>
                                        {[
                                            'lundi',
                                            'mardi',
                                            'mercredi',
                                            'jeudi',
                                            'vendredi',
                                            'samedi',
                                            'dimanche',
                                        ].map((day) => (
                                            <FormFieldModel
                                                key={day}
                                                grid={6}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values[day]}
                                                name={day}
                                                error={!!touched[day] && !!errors[day]}
                                                helperText={touched[day] && errors[day]}
                                            />
                                        ))}
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
                        ETAPE 2 : modifier tous les champs puis envoyez votre demande de création.
                    </div>
                    <Formik
                        initialValues={FormInitialValuesEstablishment}
                        onSubmit={handleFormSubmit}
                        validationSchema={establishmentSchema}
                        enableReinitialize={true}
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
                                            error={!!touched.postal_code && !!errors.postal_code}
                                            helperText={touched.postal_code && errors.postal_code}
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
