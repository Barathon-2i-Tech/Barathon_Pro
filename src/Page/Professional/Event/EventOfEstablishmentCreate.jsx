import { BasicPage } from '../../../Components/CommonComponents/BasicPage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import '../../../css/Professional/Loader.css';
import { useState, useEffect } from 'react'; //,
import { useAuth } from '../../../Components/Hooks/useAuth';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

import { eventSchema } from '../../../utils/FormSchemaValidation';
import { Box, Button, Grid } from '@mui/material';
import { FormInitialValuesEvent } from '../../../utils/FormInitialValue';
import { useFormik } from 'formik';

// import { sendFormDataPost } from '../../utils/AxiosModel';
import { ToastForm } from '../../../Components/CommonComponents/Toast/ToastForm';
import { FormEvent } from '../../../Components/CommonComponents/FormsComponent/FormEvent';
import Axios from '../../../utils/axiosUrl';
// import { useNavigate } from 'react-router-dom';

import { FormSelect } from '../../../Components/CommonComponents/FormsComponent/FormSelect';
import { selectCategoriesSchema } from '../../../utils/FormSchemaValidation';

export default function EventOfEstablishmentCreatePage() {
    const [allCategories, setAllCategories] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [openSnackbarCategoryError, setOpenSnackbarCategoryError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { user } = useAuth();
    const token = user.token;
    // const ownerId = user.userLogged.owner_id;
    const [startEventFormatted, setStartEventFormatted] = useState('');
    const [endEventFormatted, setEndEventFormatted] = useState('');
    const [startTimeFormatted, setStartTimeFormatted] = useState('');
    const [endTimeFormatted, setEndTimeFormatted] = useState('');

    //phone demo
    const [inputValues, setInputValues] = useState({
        poster: '',
        event_name: '',
        description: '',
        capacity: '',
        price: '',
        start_event: '',
        end_event: '',
        // Ajoutez d'autres champs si nécessaire
    });
    dayjs.locale('fr');

    const { id } = useParams();
    const establishmentId = parseInt(id);

    // ------------------------  go home after submit ------------------------------------------
    // Use this hook to programmatically navigate to another page
    // const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    // const goBack = () => {
    //     navigate('/');
    // };

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
            const response = await Axios.api.get(`/categories/event`, {
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
    //This const is for formik shema and action to form Opening
    const formikCategories = useFormik({
        initialValues: {
            options: [],
        },
        enableReinitialize: true,
        validationSchema: selectCategoriesSchema,
        onSubmit: (values) => handleFormSubmitCategories(values),
    });

    const handleFormSubmitCategories = (values) => {
        //     //toast MUI
        //setOpenSnackbarOpening(true);

        //     // Mettre à jour les catégories de l'établissement
        const updatedCategories = allCategories.filter((category) =>
            values.options.includes(category.category_id),
        );
        const updatedCategoryIds = updatedCategories.map((category) => category.category_id);

        //     // avoir la liste des categories selectionner en state pour les lister
        setCategoriesSelected(updatedCategories);

        //     // Créer l'objet avec la propriété "option"
        // const optionObj = { option: updatedCategoryIds };
        setEventCategories(updatedCategoryIds);

        //     // Mettre à jour les options sélectionnées dans formikCategories.values
        const newOptions = values.options.concat(updatedCategoryIds);
        formikCategories.setValues({
            ...formikCategories.values,
            options: newOptions,
        });
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        console.log('categorie :', eventCategories);
    }, [eventCategories]);

    useEffect(() => {
        if (
            inputValues.start_event &&
            dayjs(inputValues.start_event, 'DD/MM/YYYY HH:mm').isValid()
        ) {
            setStartEventFormatted(
                dayjs(inputValues.start_event, 'DD/MM/YYYY HH:mm').format('dddd D MMMM'),
            );
            setStartTimeFormatted(
                dayjs(inputValues.start_event, 'DD/MM/YYYY HH:mm').format('HH:mm'),
            );
        } else {
            setStartEventFormatted("Début de l'événement");
            setStartTimeFormatted('Heure');
        }

        if (inputValues.end_event && dayjs(inputValues.end_event, 'DD/MM/YYYY HH:mm').isValid()) {
            setEndEventFormatted(
                dayjs(inputValues.end_event, 'DD/MM/YYYY HH:mm').format('dddd D MMMM'),
            );
            setEndTimeFormatted(dayjs(inputValues.end_event, 'DD/MM/YYYY HH:mm').format('HH:mm'));
        } else {
            setEndEventFormatted("Fin de l'événement");
            setEndTimeFormatted('Heure');
        }
    }, [inputValues.start_event, inputValues.end_event]);

    // ------------------------  EVENT ------------------------------------------
    const formikEvent = useFormik({
        initialValues: FormInitialValuesEvent,
        enableReinitialize: true,
        validationSchema: eventSchema,
        // onSubmit: (values) => handleFormSubmit(values),
    });

    // ------------------------  SUBMIT ------------------------------------------

    // const handleFormSubmit = (values) => {
    //     // Include the logic from handleFormSubmitOpening to save opening hours
    //     const dataValuesOpening = { ...formikOpening.values };
    //     setOpening(dataValuesOpening);
    //     console.log(opening);

    //     // Replace openingFormat with JSON.stringify(dataValuesOpening)
    //     const dataValues = { ...values, opening: JSON.stringify(dataValuesOpening) };
    //     const urlCreate = `/pro/${ownerId}/establishment`;

    //     // Créer un nouvel objet FormData
    //     const formData = new FormData();

    //     // Ajouter les paires clé-valeur au FormData
    //     for (const [key, value] of Object.entries(dataValues)) {
    //         if (key === 'logo' && value) {
    //             // Si la clé est 'logo', ajoutez le fichier image et non son chemin
    //             formData.append(key, value[0]);
    //         } else {
    //             formData.append(key, value);
    //         }
    //     }

    //     // Create the establishment
    //     sendFormDataPost(urlCreate, token, formData) // Modifier cette ligne pour envoyer formData
    //         .then((response) => {
    //             // Get the newly created establishment ID
    //             const newEstablishmentId = response.data.data[0].establishment_id;

    //             // Associate categories to the new establishment
    //             const dataValuesCategories = { options: establishmentCategories };
    //             const urlCreateCategories = `/pro/establishment/${newEstablishmentId}/category`;

    //             sendFormDataPost(urlCreateCategories, token, dataValuesCategories)
    //                 .then(() => {
    //                     // Show success message
    //                     setOpenSnackbar(true);
    //                     // Navigate to the home page after a delay of 1.5 seconds
    //                     setTimeout(() => {
    //                         goBack();
    //                     }, 1500);
    //                 })
    //                 .catch((e) => {
    //                     console.error(e);
    //                     console.error(e.response.data);
    //                     alert('Une erreur ');
    //                 });
    //         })
    //         .catch((e) => {
    //             console.error(e);
    //             console.error(e.response.data);
    //             alert(
    //                 "Une erreur est survenue lors de la création de l'établissement. Merci de réessayer",
    //             );
    //         });
    // };

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
                message={'Bien envoyez'}
                severity={'success'}
            />

            <BasicPage title="Creer mon évènement" icon={<BusinessIcon />} />

            <section className="container mx-auto relative sm:pt-6 md:pt-11 px-4 z-10">
                <Link href={`/pro/establishment/${establishmentId}/event/list`}>
                    <Button
                        sx={{ marginRight: '10px', px: '10px' }}
                        variant="contained"
                        color="info"
                        size="small"
                    >
                        Retour aux événements
                    </Button>
                </Link>

                <FormSelect
                    allCategories={allCategories}
                    formikCategories={formikCategories}
                    handleCategoryChange={handleCategoryChange}
                    categoriesSelected={categoriesSelected}
                    handleFormReset={handleFormReset}
                    handleSubmit={formikCategories.handleSubmit}
                />

                <Box mt={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <form onSubmit={formikEvent.handleSubmit}>
                                <FormEvent formik={formikEvent} setInputValues={setInputValues} />
                            </form>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="container-iphone">
                                <div className="phone-iphone">
                                    <div className="camera-iphone"></div>
                                    <div className="speaker-iphone"></div>
                                    <div className="sleep-button-iphone"></div>
                                    <div className="silent-switch-iphone"></div>
                                    <div className="volume-iphone up"></div>
                                    <div className="volume-iphone down"></div>
                                    <div className="screen-iphone">
                                        <div className="container-event">
                                            <div className="poster-event relative">
                                                <img
                                                    className="fit-picture"
                                                    src="https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/cocktail-bibliotheque-comptoir-du-bar-lounge-boisson-relaxante_482257-24605.jpeg"
                                                    alt="poster"
                                                />

                                                <div className="name-event text-white absolute bottom-0 right-0 left-0 text-center font-bold pb-4 bck-black-gradient">
                                                    {inputValues.event_name}
                                                </div>
                                            </div>

                                            <div className="m-2">
                                                <div className="start-event flex">
                                                    <div>
                                                        <CalendarMonthIcon
                                                            style={{ color: 'white', fontSize: 15 }}
                                                        />
                                                    </div>
                                                    <div className="text-white">
                                                        {startEventFormatted}
                                                    </div>
                                                    <div>
                                                        <AccessTimeIcon
                                                            style={{
                                                                color: 'white',
                                                                fontSize: 15,
                                                                marginLeft: 8,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="text-white">
                                                        {startTimeFormatted}
                                                    </div>
                                                </div>
                                                <div className="end-event flex">
                                                    <div>
                                                        <CalendarMonthIcon
                                                            style={{ color: 'white', fontSize: 15 }}
                                                        />
                                                    </div>
                                                    <div className="text-white">
                                                        {endEventFormatted}
                                                    </div>
                                                    <div>
                                                        <AccessTimeIcon
                                                            style={{
                                                                color: 'white',
                                                                fontSize: 15,
                                                                marginLeft: 8,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="text-white">
                                                        {endTimeFormatted}
                                                    </div>
                                                </div>

                                                <div className="price-event">
                                                    {inputValues.price}
                                                </div>

                                                <div className="description p-2 rounded-xl bg-white">
                                                    <div className="font-bold">Details :</div>
                                                    <div>{inputValues.description}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="home-button"></div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </section>
        </Paper>
    );
}
