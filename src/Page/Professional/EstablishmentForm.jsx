import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import '../../css/Professional/Establishment.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Components/Hooks/useAuth';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

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

    const openingSchema = yup.object().shape({
        lundi: yup.string(),
        mardi: yup.string(),
        mercredi: yup.string(),
        jeudi: yup.string(),
        vendredi: yup.string(),
        samedi: yup.string(),
        dimanche: yup.string(),
    });

    const establishmentSchema = yup.object().shape({
        trade_name: yup.string().required('obligatoire'),
        address: yup.string().required('obligatoire'),
        city: yup.string().required('obligatoire'),
        postal_code: yup.string().required('obligatoire'),
        logo: yup.string().required('obligatoire'),
        phone: yup.string().required('obligatoire'),
        email: yup.string().required('obligatoire'),
        website: yup.string().required('obligatoire'),
        // opening: yup.object().required('obligatoire'),
    });

    const getEstablishment = () => {
        Axios.api
            .get(`/pro/${ownerId}/establishment/${id}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setEstablishments(response.data.data);

                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
            <Toaster />
            <BasicPage title="Modifier mon etablissement" icon={<BusinessIcon />} />

            <section className="container relative sm:pt-6 md:pt-11 px-4 z-10">
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
                                <Box display="flex" justifyContent="end" mt="20px">
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

                    {establishments.map((establishment) => (
                        <Formik
                            key={establishment.establishment_id}
                            initialValues={{
                                logo: establishment.logo || '',
                                trade_name: establishment.trade_name || '',
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
