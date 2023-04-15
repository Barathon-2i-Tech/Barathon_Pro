import { BasicPage } from '../../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import '../../../css/Professional/Loader.css';
import { useState, useEffect } from 'react'; //,
import { useAuth } from '../../../Components/Hooks/useAuth';
import { sendFormDataPutMultipart, sendFormDataPutCategory } from '../../../utils/AxiosModel';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { eventSchema } from '../../../utils/FormSchemaValidation';
import { Box, Button, Grid } from '@mui/material';
import { FormInitialValuesEvent } from '../../../utils/FormInitialValue';
import { useFormik } from 'formik';
import { ToastForm } from '../../../Components/CommonComponents/Toast/ToastForm';
import { FormEvent } from '../../../Components/CommonComponents/FormsComponent/FormEvent';
import Axios from '../../../utils/axiosUrl';
import { FormSelect } from '../../../Components/CommonComponents/FormsComponent/FormSelect';
import { selectCategoriesSchema } from '../../../utils/FormSchemaValidation';
import { EventPhoneDemo } from '../../../Components/CommonComponents/PhoneDemo/EventPhoneDemo';

export default function EventOfEstablishmentUpdatePage() {
    const [allCategories, setAllCategories] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [posterUrl, setPosterUrl] = useState('');

    const [openSnackbarCategoryError, setOpenSnackbarCategoryError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const userId = user.userLogged.user_id;
    const [startEventFormatted, setStartEventFormatted] = useState('');
    const [endEventFormatted, setEndEventFormatted] = useState('');
    const [startTimeFormatted, setStartTimeFormatted] = useState('');
    const [endTimeFormatted, setEndTimeFormatted] = useState('');

    const [reloading, setReloading] = useState(false);
    const [isEventDataLoaded, setIsEventDataLoaded] = useState(false);
    const [event, setEvent] = useState([]);
    const [establishment, setEstablishment] = useState([]);
    const [establishmentName, setEstablishmentName] = useState('');
    const [establishmentAddress, setEstablishmentAddress] = useState('');
    const [establishmentPostalCode, setEstablishmentPostalCode] = useState('');

    const [selectedImage, setSelectedImage] = useState('');

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

    const { establishmentIdParam, eventIdParam } = useParams();

    const establishmentId = parseInt(establishmentIdParam);
    const eventId = parseInt(eventIdParam);

    // ------------------------  go home after submit ------------------------------------------
    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate(`/pro/establishment/${establishmentId}/event/list`);
    };

    // ------------------------  TOAST ------------------------------------------
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpenSnackbarCategoryError(false);
    };

    // ------------------------  ESTABLISHMENT ------------------------------------------
    // AXIOS GET
    // This function is used to get the establishment to update by his ID
    async function getEstablishment() {
        try {
            const response = await Axios.api.get(
                `/pro/${ownerId}/establishment/${establishmentId}`,
                {
                    headers: {
                        accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setEstablishment(response.data.data);

            setIsEventDataLoaded(true);

            console.log('log establishment get :', establishment);
            const myEstablishment = response.data.data;
            const myEstablishmentAddress = myEstablishment.map((is) => is.address);
            setEstablishmentAddress(myEstablishmentAddress[0] || '');

            const myEstablishmentPostalCode = myEstablishment.map((is) => is.postal_code);
            setEstablishmentPostalCode(myEstablishmentPostalCode[0] || '');

            const myEstablishmentName = myEstablishment.map((is) => is.trade_name);
            setEstablishmentName(myEstablishmentName[0] || '');

            await new Promise((resolve) => setTimeout(resolve)); // Attendre un tick pour laisser le temps à React de mettre à jour l'interface utilisateur
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('display');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // ------------------------  EVENT ------------------------------------------
    // This function is used to get the event to update by his ID
    async function getEvent() {
        try {
            const response = await Axios.api.get(
                `/pro/establishment/${establishmentId}/event/${eventId}`,
                {
                    headers: {
                        accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setEvent(response.data.data);
            console.log('log event get :', event);

            // Récupérer l'URL du poster et la stocker dans l'état posterUrl
            const poster = response.data.data.poster; // Remplacez "poster" par la clé appropriée pour récupérer l'URL du poster
            setPosterUrl(poster);
            console.log('log poster :', poster);

            await new Promise((resolve) => setTimeout(resolve)); // Attendre un tick pour laisser le temps à React de mettre à jour l'interface utilisateur
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('display');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formikEvent = useFormik({
        initialValues: isEventDataLoaded ? event : FormInitialValuesEvent,
        enableReinitialize: true,
        validationSchema: eventSchema,
        onSubmit: (values) => handleFormSubmit(values),
    });

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
    // This function is used to get All categories of The event to update ////A FAIIIRE !!!!!!!!!!!!!! BACKEND  ///////////////////////
    async function getEventCategory() {
        try {
            const response = await Axios.api.get(`/pro/event/${eventId}/category`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setEventCategories(response.data.data);
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

    //This const is for formik shema and action to form categorie
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

        // Mettre à jour les catégories de l'établissement
        const updatedCategories = allCategories.filter((category) =>
            values.options.includes(category.category_id),
        );
        const updatedCategoryIds = updatedCategories.map((category) => category.category_id);

        // avoir la liste des categories selectionner en state pour les lister
        setCategoriesSelected(updatedCategories);

        // Créer l'objet avec la propriété "option"
        // const optionObj = { option: updatedCategoryIds };
        setEventCategories(updatedCategoryIds);

        // Mettre à jour les options sélectionnées dans formikCategories.values
        const newOptions = values.options.concat(updatedCategoryIds);
        formikCategories.setValues({
            ...formikCategories.values,
            options: newOptions,
        });

        // Envoi des données de catégories formatées
        const urlCreateCategories = `/pro/event/${eventId}/category`;
        const dataValuesCategories = { options: updatedCategoryIds };

        sendFormDataPutCategory(urlCreateCategories, token, dataValuesCategories)
            .then(() => {
                console.log('mise a jours des category');
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                // console.table(dataValuesCategories);
            });
    };

    useEffect(() => {
        getAllCategories();
        getEstablishment();
        getEvent();
        setReloading(false);
    }, [reloading]);

    useEffect(() => {
        console.log('categorie :', eventCategories);
    }, [eventCategories]);

    useEffect(() => {
        setSelectedImage(
            posterUrl ||
                'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/Photo.png',
        );
    }, [posterUrl]);

    useEffect(() => {
        getEventCategory();
        getInitialOptions(eventCategories);
    }, []);

    useEffect(() => {
        formikCategories.setValues({
            options: getInitialOptions(eventCategories),
        });
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

    // ------------------------  SUBMIT ------------------------------------------

    const handleFormSubmit = (values) => {
        const dataValues = { ...values, user_id: userId, establishment_id: establishmentId };
        const urlCreate = `pro/establishment/${establishmentId}/event/${eventId}`;

        // Créer un nouvel objet FormData
        const formData = new FormData();

        // Ajouter les paires clé-valeur au FormData
        for (const [key, value] of Object.entries(dataValues)) {
            if (key === 'poster' && value) {
                // Si la clé est 'poster', ajoutez le fichier image et non son chemin
                formData.append(key, value[0]);
            } else {
                formData.append(key, value);
            }
        }

        const logFormData = (formData) => {
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
        };

        logFormData(formData);

        // Create the establishment
        sendFormDataPutMultipart(urlCreate, token, formData) // Modifier cette ligne pour envoyer formData
            .then(() => {
                console.log('ca a mit a jours');
                // Navigate to the home page after a delay of 1.5 seconds
                setTimeout(() => {
                    goBack();
                }, 1500);
            })
            .catch((e) => {
                console.error(e);
                console.error(e.response.data);
                alert(
                    "Une erreur est survenue lors de la création de l'évenemnt. Merci de réessayer",
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
                                <FormEvent
                                    formik={formikEvent}
                                    setInputValues={setInputValues}
                                    setSelectedImage={setSelectedImage}
                                    establishmentId={establishmentId}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <EventPhoneDemo
                                selectedImage={selectedImage}
                                inputValues={inputValues}
                                startEventFormatted={startEventFormatted}
                                startTimeFormatted={startTimeFormatted}
                                endEventFormatted={endEventFormatted}
                                endTimeFormatted={endTimeFormatted}
                                establishmentName={establishmentName}
                                establishmentAddress={establishmentAddress}
                                establishmentPostalCode={establishmentPostalCode}
                                categoriesSelected={categoriesSelected}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </section>
        </Paper>
    );
}