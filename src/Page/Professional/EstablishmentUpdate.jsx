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
import { Grid, Box } from '@mui/material';
import { FormInitialValuesOpening } from '../../utils/FormInitialValue';
import { useFormik, Formik } from 'formik';
import { FormSelectEstablishment } from '../../Components/CommonComponents/FormsComponent/FormSelectEstablishment';
import { FormOpening } from '../../Components/CommonComponents/FormsComponent/FormOpening';
import { FormFieldModel } from '../../Components/CommonComponents/FormsComponent/FormFieldModel';
import { sendFormDataPutCategory, sendFormDataPutMultipart } from '../../utils/AxiosModel';
import { ToastForm } from '../../Components/CommonComponents/Toast/ToastForm';
import Axios from '../../utils/axiosUrl';
import { useParams } from 'react-router-dom';
import { Loader } from '../../Components/CommonComponents/Loader';
import { useNavigate } from 'react-router-dom';
import '../../css/WelcomePage/TypoHome.css';

export default function EstablishmentCreatePage() {
    const [openSnackbarOpening, setOpenSnackbarOpening] = useState(false);
    const [openSnackbarCategoryError, setOpenSnackbarCategoryError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const [establishment, setEstablishment] = useState([]);
    const [isOpeningInitialized, setIsOpeningInitialized] = useState(false);
    const [opening, setOpening] = useState({});

    const [allCategories, setAllCategories] = useState([]);
    const [establishmentCategories, setEstablishmentCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);

    const { id } = useParams();
    const establishmentId = parseInt(id);

    // ------------------------  go home after submit ------------------------------------------
    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate('/pro/establishment');
    };

    // ------------------------  TOAST ------------------------------------------
    // This function is used to close toast
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpenSnackbarOpening(false);
        setOpenSnackbarCategoryError(false);
    };

    // ------------------------  ESTABLISHMENT ------------------------------------------
    // AXIOS GET
    // This function is used to get the establishment to update by his ID
    async function getEstablishment() {
        try {
            const response = await Axios.api.get(`/pro/${ownerId}/establishment/${id}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setEstablishment(response.data.data);

            await new Promise((resolve) => setTimeout(resolve)); // Attendre un tick pour laisser le temps à React de mettre à jour l'interface utilisateur
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('display');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // ------------------------  CATEGORY ------------------------------------------

    // This function is used to get All categories in database (who has sub_category ALL and Establishment)
    async function getAllCategories() {
        try {
            const response = await Axios.api.get(`/categories/establishment`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllCategories(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    // This function is used to get All categories of The establishment to update
    async function getEstablishmentCategory() {
        try {
            const response = await Axios.api.get(`/categories/establishment/${establishmentId}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setEstablishmentCategories(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    //function to reset selection
    const handleFormReset = () => {
        formikCategories.resetForm();
        setCategoriesSelected([]);
    };

    //function no add more 4 categories
    const handleCategoryChange = (event) => {
        if (event.target.value.length <= 4) {
            formikCategories.handleChange(event);
        } else {
            setOpenSnackbarCategoryError(true);
        }
    };

    // This const is to initialize initial option value with the categories of establishment in DB
    const getInitialOptions = (categories) => {
        return categories && categories.length > 0
            ? categories.map((category) => category.category_id)
            : [];
    };
    // FORMIK
    // This const is for formik shema and action to form Opening
    const formikCategories = useFormik({
        initialValues: {
            options: [],
        },
        enableReinitialize: true,
        validationSchema: selectCategoriesSchema,
        onSubmit: (values) => handleFormSubmitCategories(values),
    });
    // This const is to save in state establishmentsCategories the news categories

    const formatCategories = (categories) => {
        const formattedCategoryIds = categories.map((category) => category.category_id);
        return { options: formattedCategoryIds };
    };

    const handleFormSubmitCategories = (values) => {
        //toast MUI
        setOpenSnackbarOpening(true);

        // Mettre à jour les catégories de l'établissement
        const updatedCategories = allCategories.filter((category) =>
            values.options.includes(category.category_id),
        );
        const updatedCategoryIds = updatedCategories.map((category) => category.category_id);

        // avoir la liste des categories selectionner en state pour les lister
        setCategoriesSelected(updatedCategories);

        setEstablishmentCategories(updatedCategoryIds);

        // Mettre à jour les options sélectionnées dans formikCategories.values
        const newOptions = values.options.concat(updatedCategoryIds);
        formikCategories.setValues({
            ...formikCategories.values,
            options: newOptions,
        });
    };

    // ------------------------  OPENING ------------------------------------------

    const getInitialOpening = (establishment) => {
        if (establishment && establishment.length > 0) {
            const openingObj = establishment[0].opening;
            return Object.entries(openingObj).reduce(
                (acc, [key, value]) => ({ ...acc, [key.toLowerCase()]: value }),
                FormInitialValuesOpening,
            );
        }
        return FormInitialValuesOpening;
    };

    // This const is for formik shema and action to form Opening
    const formikOpening = useFormik({
        initialValues: isOpeningInitialized ? opening : getInitialOpening(),
        enableReinitialize: true,
        validationSchema: EstablishmentSchemaOpening,
        // onSubmit: (values) => handleFormSubmitOpening(values),
    });

    // ------------------------  USEEFFECT ------------------------------------------
    useEffect(() => {
        getEstablishment();
        getAllCategories();
    }, []);
    //Assurer que l'état opening est mis à jour lorsque l'on recois les données de l'établissement.
    useEffect(() => {
        setOpening(getInitialOpening(establishment));
        setIsOpeningInitialized(true);
        console.log(establishment);
    }, [establishment]);

    useEffect(() => {
        getEstablishmentCategory();
        getInitialOptions(establishmentCategories);
    }, []);

    useEffect(() => {
        formikCategories.setValues({
            options: getInitialOptions(establishmentCategories),
        });
    }, [establishmentCategories]);

    // ------------------------  SUBMIT ------------------------------------------
    const handleFormSubmit = (values) => {
        // Include the logic from handleFormSubmitOpening to save opening hours
        const dataValuesOpening = { ...formikOpening.values };
        setOpening(dataValuesOpening);
        console.log(opening);

        // Replace openingFormat with JSON.stringify(dataValuesOpening)
        const dataValues = { ...values, opening: JSON.stringify(dataValuesOpening) };

        const urlCreate = `/pro/${ownerId}/establishment/${id}`;

        const formData = new FormData();
        for (const [key, value] of Object.entries(dataValues)) {
            if (key === 'logo' && value) {
                // Si la clé est 'logo', ajoutez le fichier image et non son chemin
                formData.append(key, value[0]);
            } else {
                formData.append(key, value);
            }
        }
        // Formater les catégories si elles ne sont pas déjà formatées
        const formattedCategories =
            Array.isArray(establishmentCategories) && typeof establishmentCategories[0] === 'object'
                ? formatCategories(establishmentCategories)
                : { options: establishmentCategories };

        const dataValuesCategories = formattedCategories;
        const urlCreateCategories = `/pro/establishment/${id}/category`;

        console.log('dataValues', dataValues);
        console.log('dataValuesCategories :', dataValuesCategories);
        console.log('formData', formData);
        console.log('formData', Array.from(formData.entries()));

        sendFormDataPutMultipart(urlCreate, token, formData) // Appel de la fonction
            .then(() => {
                //toast MUI
                setOpenSnackbar(true);
                // Navigate to the home page after a delay of 1.5 seconds
                setTimeout(() => {
                    goBack();
                }, 1500);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                //console.table(dataValues);
            });

        sendFormDataPutCategory(urlCreateCategories, token, dataValuesCategories) // Appel de la fonction
            .then(() => {
                //toast MUI
                // setOpenSnackbar(true);
                // console.table(dataValuesCategories);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                // console.table(dataValuesCategories);
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
                severity={'success'}
            />
            <ToastForm
                openSnackbar={openSnackbarCategoryError}
                handleSnackbarClose={handleSnackbarClose}
                title={'Attention!'}
                message={'Vous avez droit à 4 categories maximum'}
                severity={'error'}
            />
            <ToastForm
                openSnackbar={openSnackbar}
                handleSnackbarClose={handleSnackbarClose}
                title={'Felicitation !'}
                message={'Bien envoyez'}
                severity={'success'}
            />

            <BasicPage title="Modifier mon etablissement" icon={<BusinessIcon />} />

            <section className="container mx-auto relative sm:pt-6 md:pt-11 px-4 z-10">
                <FormSelectEstablishment
                    allCategories={allCategories}
                    formikCategories={formikCategories}
                    handleCategoryChange={handleCategoryChange}
                    categoriesSelected={categoriesSelected}
                    handleFormReset={handleFormReset}
                    handleSubmit={formikCategories.handleSubmit}
                />

                <Box m="20px">
                    <div className="establishment-infos-title text-2xl text-teal-700 font-bold pb-6 pt-4">
                        INFORMATIONS DE VOTRE ETABLISSMENT :
                    </div>
                    <Loader allClass={'loading display'} />
                    {establishment.map((establishment) => (
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
                            validationSchema={establishmentSchema(false)}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                setFieldValue,
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
                                                onChange={(event, fileList) => {
                                                    if (fileList) {
                                                        setFieldValue('logo', event.target.files);
                                                    } else {
                                                        handleChange(event);
                                                    }
                                                }}
                                                value={values.logo}
                                                name={'logo'}
                                                // Convert to boolean using !! operator
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
                                    <div className="opening-title text-2xl text-teal-700 font-bold pb-6 pt-10">
                                        HORRAIRES DE VOTRE ETABLISSMENT :
                                    </div>
                                    <FormOpening formik={formikOpening} />
                                </form>
                            )}
                        </Formik>
                    ))}
                </Box>
            </section>
        </Paper>
    );
}
