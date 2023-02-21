import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import LanguageIcon from '@mui/icons-material/Language';
// import PhoneIcon from '@mui/icons-material/Phone';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import Divider from '@mui/material/Divider';
// import { ButtonLink } from '../../Components/CommonComponents/ButtonLink';
// import { ButtonDelete } from '../../Components/CommonComponents/ButtonDelete';
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

    // const initialValues = {
    //     logo: '',
    //     trade_name: '',
    //     address:'',
    //     city: '',
    //     postal_code:'',
    //     phone:'',
    //     opening:'',
    //     website:'',
    // };
    const establishmentSchema = yup.object().shape({
        trade_name: yup.string().required('obligatoire'),
        address: yup.string().required('obligatoire'),
        city: yup.string().required('obligatoire'),
        postal_code: yup.string().required('obligatoire'),
        logo: yup.string().required('obligatoire'),
        phone: yup.string().required('obligatoire'),
        email: yup.string().required('obligatoire'),
        website: yup.string().required('obligatoire'),
        opening: yup.object().required('obligatoire'),
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

    const handleFormSubmit = (values) => {
        const notify = () => {
            toast('✅ Bien enregistré !', {
                duration: 8000,
            });
        };

        const dataValues = { ...values };

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

            {establishments.map((establishment) => (
                <section
                    key={establishment.establishment_id}
                    className="container relative sm:pt-6 md:pt-11 px-4 z-10"
                >
                    <Box m="20px">
                        <Formik
                            initialValues={{
                                logo: establishment.logo || '',
                                trade_name: establishment.trade_name || '',
                                address: establishment.address || '',
                                city: establishment.city || '',
                                postal_code: establishment.postal_code || '',
                                phone: establishment.phone || '',
                                email: establishment.email || '',
                                opening: establishment.opening || '',
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
                                            type="json"
                                            label="Horraires"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.opening}
                                            name="opening"
                                            //convert to boolean using !! operator
                                            error={!!touched.opening && !!errors.opening}
                                            helperText={touched.opening && errors.opening}
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
                    </Box>
                </section>
            ))}
        </Paper>
    );
}
