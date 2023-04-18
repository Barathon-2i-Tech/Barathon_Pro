import '../../../css/Professional/Loader.css';
import { useState, useEffect } from 'react'; //,
import { useAuth } from '../../../Components/Hooks/useAuth';
import { sendFormDataPutMultipart, sendFormDataPutCategory } from '../../../utils/AxiosModel';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { eventSchema } from '../../../utils/FormSchemaValidation';
import { FormInitialValuesEvent } from '../../../utils/FormInitialValue';
import { useFormik } from 'formik';
import Axios from '../../../utils/axiosUrl';
import { GlobalFormEvent } from '../../../Components/CommonComponents/FormsComponent/GlobalFormEvent';
import UseCategories from '../../../utils/UseCategories';

export default function EventOfEstablishmentUpdatePage() {
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const userId = user.userLogged.user_id;
    const { establishmentIdParam, eventIdParam } = useParams();
    const establishmentId = parseInt(establishmentIdParam);
    const eventId = parseInt(eventIdParam);
    const [posterUrl, setPosterUrl] = useState('');
    const [openSnackbarCategoryError, setOpenSnackbarCategoryError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
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

    const {
        allCategories,
        categoriesSelected,
        formikCategories,
        handleFormReset,
        handleCategoryChange,
        eventCategories,
        getAllCategories,
        getEventCategories,
    } = UseCategories(token, eventId);

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

            const myEstablishmentAddress = establishment.map((is) => is.address);
            setEstablishmentAddress(myEstablishmentAddress[0] || '');

            const myEstablishmentPostalCode = establishment.map((is) => is.postal_code);
            setEstablishmentPostalCode(myEstablishmentPostalCode[0] || '');

            const myEstablishmentName = establishment.map((is) => is.trade_name);
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

            // Récupérer l'URL du poster et la stocker dans l'état posterUrl
            const poster = response.data.data.poster; // Remplacez "poster" par la clé appropriée pour récupérer l'URL du poster
            setPosterUrl(poster);

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

    // This const is to initialize initial option value with the categories of establishment in DB
    const getInitialOptions = (categories) => {
        return categories && categories.length > 0
            ? categories.map((category) => category.category_id)
            : [];
    };

    useEffect(() => {
        getAllCategories();
        getEstablishment();
        getEvent();
        setReloading(false);
    }, [reloading]);

    useEffect(() => {
        setSelectedImage(
            posterUrl ||
                'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/Photo.png',
        );
    }, [posterUrl]);

    useEffect(() => {
        getEventCategories();
        getInitialOptions(eventCategories);
        console.log(eventCategories);
    }, []);

    useEffect(() => {
        formikCategories.setValues({
            options: getInitialOptions(eventCategories),
        });
        console.log(eventCategories);
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

        // Create the establishment
        sendFormDataPutMultipart(urlCreate, token, formData) // Modifier cette ligne pour envoyer formData
            .then((response) => {
                // take new id event
                const newEventId = response.data.data[0].event_id;
                // Envoi des données de catégories formatées
                const urlCreateCategories = `/pro/event/${newEventId}/category`;
                const dataValuesCategories = { options: eventCategories };

                sendFormDataPutCategory(urlCreateCategories, token, dataValuesCategories)
                    .then(() => {
                        console.log('mise a jours des category');
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('Une erreur est survenue. Merci de réessayer');
                    });
                // Navigate to the home page after a delay of 1.5 seconds
                setTimeout(() => {
                    goBack();
                }, 1500);
            })
            .catch((error) => {
                console.log(error);
                alert(
                    "Une erreur est survenue lors de la création de l'évenemnt. Merci de réessayer",
                );
            });
    };

    return (
        <>
            <GlobalFormEvent
                formikEvent={formikEvent}
                formikCategories={formikCategories}
                handleCategoryChange={handleCategoryChange}
                handleFormReset={handleFormReset}
                handleSnackbarClose={handleSnackbarClose}
                openSnackbar={openSnackbar}
                openSnackbarCategoryError={openSnackbarCategoryError}
                allCategories={allCategories}
                categoriesSelected={categoriesSelected}
                setInputValues={setInputValues}
                setSelectedImage={setSelectedImage}
                establishmentId={establishmentId}
                selectedImage={selectedImage}
                inputValues={inputValues}
                startEventFormatted={startEventFormatted}
                startTimeFormatted={startTimeFormatted}
                endEventFormatted={endEventFormatted}
                endTimeFormatted={endTimeFormatted}
                establishmentName={establishmentName}
                establishmentAddress={establishmentAddress}
                establishmentPostalCode={establishmentPostalCode}
            />
        </>
    );
}
