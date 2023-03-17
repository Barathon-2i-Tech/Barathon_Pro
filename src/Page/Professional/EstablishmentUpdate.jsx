import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import '../../css/Professional/Establishment.css';
import '../../css/Professional/Loader.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Components/Hooks/useAuth';
import {
    EstablishmentSchemaOpening,
    establishmentSchema,
    selectCategoriesSchema,
} from '../../utils/FormSchemaValidation';
import { Grid, Box, InputLabel, Select, MenuItem } from '@mui/material';
import { FormInitialValuesOpening } from '../../utils/FormInitialValue';
import { useFormik, Formik } from 'formik';
import { FormOpening } from '../../Components/CommonComponents/FormsComponent/FormOpening';
import { FormFieldModel } from '../../Components/CommonComponents/FormsComponent/FormFieldModel';
import { sendFormDataPost, sendFormDataPut } from '../../utils/AxiosModel';
import { ToastForm } from '../../Components/CommonComponents/Toast/ToastForm';
import Axios from '../../utils/axiosUrl';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '../../Components/CommonComponents/Loader';

export default function EstablishmentCreatePage() {
    const [openSnackbarOpening, setOpenSnackbarOpening] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const [establishments, setEstablishments] = useState([]);
    const [opening, setOpening] = useState({});
    const [openingFormat, setOpeningFormat] = useState({});
    const [allEstablishmentsCategories, setAllEstablishmentsCategories] = useState([]);
    const [establishmentsCategories, setEstablishmentsCategories] = useState([]);
    const openingJson = JSON.stringify(
        Object.entries(opening).reduce(
            (acc, [key, value]) => ({ ...acc, [key.toLowerCase()]: value }),
            {},
        ),
    );
    const { id } = useParams();
    const establishmentId = parseInt(id);
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

    async function getEstablishmentsCategories() {
        try {
            const response = await Axios.api.get(`/categories/establishment`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllEstablishmentsCategories(response.data.data);
            console.table(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getEstablishmentCategory() {
        try {
            const response = await Axios.api.get(`/categories/establishment/${establishmentId}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setEstablishmentsCategories(response.data.data);
            console.table(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpenSnackbarOpening(false);
    };

    const formikOpening = useFormik({
        initialValues: FormInitialValuesOpening,
        enableReinitialize: true,
        validationSchema: EstablishmentSchemaOpening,
        onSubmit: (values) => handleFormSubmitOpening(values),
    });

    const formikCategories = useFormik({
        initialValues: {
            options: [],
        },
        enableReinitialize: true,
        validationSchema: selectCategoriesSchema,
        onSubmit: (values) => handleFormSubmitCategories(values),
    });

    const handleFormSubmitCategories = (values) => {
        //toast MUI
        setOpenSnackbarOpening(true);

        const dataValuesCategories = {
            options: values.options.map((option) => ({
                establishment_id: establishmentId,
                category_id: option,
            })),
        };
        setEstablishmentsCategories(dataValuesCategories);
        console.table(establishmentsCategories);
    };

    const handleFormSubmitOpening = (values) => {
        //toast MUI
        setOpenSnackbarOpening(true);

        const dataValuesOpening = { ...values };
        setOpening(dataValuesOpening);
    };

    useEffect(() => {
        getEstablishment();
        getEstablishmentsCategories();
        getEstablishmentCategory();
        setOpeningFormat(openingJson);
        console.table(establishmentsCategories);
    }, [opening]);

    const handleFormSubmit = (values) => {
        const dataValues = { ...values, opening: openingFormat };
        const urlCreate = `/pro/${ownerId}/establishment/${id}`;

        const dataValuesCategories = { establishmentsCategories };
        const urlCreateCategories = `/pro/${ownerId}/categories/test`;

        sendFormDataPut(urlCreate, token, dataValues) // Appel de la fonction
            .then(() => {
                //toast MUI
                setOpenSnackbar(true);
                console.table(dataValues);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                console.table(dataValues);
            });

        sendFormDataPost(urlCreateCategories, token, dataValuesCategories) // Appel de la fonction
            .then(() => {
                //toast MUI
                setOpenSnackbar(true);
                console.table(dataValuesCategories);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                console.table(dataValuesCategories);
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
            <ToastForm
                openSnackbar={openSnackbarOpening}
                handleSnackbarClose={handleSnackbarClose}
                title={'Bravo !'}
                message={'Bien enregisté - Continuez et enregistrez'}
            />
            <ToastForm
                openSnackbar={openSnackbar}
                handleSnackbarClose={handleSnackbarClose}
                title={'Felicitation !'}
                message={'Bien envoyez'}
            />

            <BasicPage title="Creer mon etablissement" icon={<BusinessIcon />} />

            <section className="container mx-auto relative sm:pt-6 md:pt-11 px-4 z-10">
                <div className="mx-6 font-bold">
                    1ere ETAPE (facultative): modifier tous les champs de la semaine et enregister,
                    puis sauvegarder si vous modifiez uniquement les horaires, sinon passez à la
                    prochaine étape.
                </div>
                <Box m="20px">
                    <form className="py-4 sm:pb-10" onSubmit={formikCategories.handleSubmit}>
                        <InputLabel id="options-label">Categories</InputLabel>
                        <Select
                            labelId="options-label"
                            id="options"
                            style={{ minWidth: 120 }}
                            multiple
                            value={formikCategories.values.options}
                            onChange={formikCategories.handleChange}
                            inputProps={{
                                name: 'options',
                            }}
                        >
                            {allEstablishmentsCategories.map((allEstablishment) => {
                                const categoryDetails = JSON.parse(
                                    allEstablishment.category_details,
                                );
                                return (
                                    <MenuItem
                                        key={allEstablishment.category_id}
                                        value={allEstablishment.category_id}
                                    >
                                        {categoryDetails.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <button
                            type="submit"
                            className="sm:ml-7 mt-7 ml-2 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                        >
                            Enregistrer mon/mes Labels
                        </button>
                    </form>
                    <FormOpening formik={formikOpening} />
                    <div className="pb-4 font-bold">
                        ETAPE 2 : modifier tous les champs puis envoyez votre demande de création.
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
