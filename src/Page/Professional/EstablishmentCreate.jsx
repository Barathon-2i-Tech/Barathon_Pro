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
import { Box, Grid } from '@mui/material';
import {
    FormInitialValuesOpening,
    FormInitialValuesEstablishment,
} from '../../utils/FormInitialValue';
import { useFormik } from 'formik';
import { FormSelect } from '../../Components/CommonComponents/FormsComponent/FormSelect';
import { FormOpening } from '../../Components/CommonComponents/FormsComponent/FormOpening';
import { FormEstablishment } from '../../Components/CommonComponents/FormsComponent/FormEstablishment';
import { sendFormDataPost } from '../../utils/AxiosModel';
import { ToastForm } from '../../Components/CommonComponents/Toast/ToastForm';
import Axios from '../../utils/axiosUrl';
import { useNavigate } from 'react-router-dom';

export default function EstablishmentCreatePage() {
    const [allCategories, setAllCategories] = useState([]);
    const [openSnackbarCategoryError, setOpenSnackbarCategoryError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const [opening, setOpening] = useState({});

    // ------------------------  go home after submit ------------------------------------------
    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate('/pro/establishment');
    };

    // ------------------------  TOAST ------------------------------------------
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpenSnackbarCategoryError(false);
    };

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

    //function no add more 4 categories
    const handleCategoryChange = (event) => {
        if (event.target.value.length <= 4) {
            formikCategories.handleChange(event);
        } else {
            setOpenSnackbarCategoryError(true);
        }
    };
    // This const is for formik shema and action to form Categories
    const formikCategories = useFormik({
        initialValues: {
            options: [],
        },
        enableReinitialize: true,
        validationSchema: selectCategoriesSchema,
    });

    useEffect(() => {
        getAllCategories();
        console.log(opening);
    }, []);

    // ------------------------  ESTABLISHMENT ------------------------------------------
    const formikEstablishment = useFormik({
        initialValues: FormInitialValuesEstablishment,
        enableReinitialize: true,
        validationSchema: establishmentSchema,
        onSubmit: (values) => handleFormSubmit(values),
    });

    // ------------------------  OPENING ------------------------------------------
    const formikOpening = useFormik({
        initialValues: FormInitialValuesOpening,
        enableReinitialize: true,
        validationSchema: EstablishmentSchemaOpening,
    });

    // ------------------------  SUBMIT ------------------------------------------

    const handleFormSubmit = (values) => {
        const categoryIds = formikCategories.values.options;

        // Include the logic from handleFormSubmitOpening to save opening hours
        const dataValuesOpening = { ...formikOpening.values };
        setOpening(dataValuesOpening);

        // Replace openingFormat with JSON.stringify(dataValuesOpening)
        const dataValues = { ...values, opening: JSON.stringify(dataValuesOpening) };
        const urlCreate = `/pro/${ownerId}/establishment`;

        // Créer un nouvel objet FormData
        const formData = new FormData();

        // Ajouter les paires clé-valeur au FormData
        for (const [key, value] of Object.entries(dataValues)) {
            if (key === 'logo' && value) {
                // if key is  'logo', add folder image et and path
                formData.append(key, value[0]);
            } else {
                formData.append(key, value);
            }
        }

        // Create the establishment
        sendFormDataPost(urlCreate, token, formData)
            .then((response) => {
                // Get the newly created establishment ID
                const newEstablishmentId = response.data.data[0].establishment_id;

                // Associate categories to the new establishment
                const dataValuesCategories = { options: categoryIds };
                const urlCreateCategories = `/pro/establishment/${newEstablishmentId}/category`;

                sendFormDataPost(urlCreateCategories, token, dataValuesCategories)
                    .then(() => {
                        // Show success message
                        setOpenSnackbar(true);
                        // Navigate to the previous page after a delay of 1.5 seconds
                        setTimeout(() => {
                            goBack();
                        }, 1500);
                    })
                    .catch((e) => {
                        console.error(e);
                        alert('Une erreur ');
                    });
            })
            .catch((e) => {
                console.error(e);
                alert(
                    "Une erreur est survenue lors de la création de l'établissement. Merci de réessayer",
                );
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
                message={'Votre établissement est bien créé, il sera bientot validé !'}
                severity={'success'}
            />

            <BasicPage title="Creer mon etablissement" icon={<BusinessIcon />} />

            <section className="container mx-auto relative sm:pt-6 md:pt-11 px-4 z-10">
                <Grid item xs={12} md={6}>
                    <FormSelect
                        allCategories={allCategories}
                        formikCategories={formikCategories}
                        handleCategoryChange={handleCategoryChange}
                        handleSubmit={formikCategories.handleSubmit}
                        submitClass={'hidden'}
                    />
                </Grid>

                <Box m="20px">
                    <div className="establishment-infos-title text-2xl text-teal-700 font-bold pb-6 pt-4">
                        INFORMATIONS DE VOTRE ETABLISSMENT :
                    </div>
                    <form onSubmit={formikEstablishment.handleSubmit}>
                        <FormEstablishment formik={formikEstablishment} />
                        <div className="opening-title text-2xl text-teal-700 font-bold pb-6 pt-10">
                            HORAIRES DE VOTRE ETABLISSMENT :
                        </div>
                        <FormOpening formik={formikOpening} />
                    </form>
                </Box>
            </section>
        </Paper>
    );
}
