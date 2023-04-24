import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { eventSchema } from '../../utils/FormSchemaValidation';
import { FormInitialValuesEvent } from '../../utils/FormInitialValue';
import Axios from '../../utils/axiosUrl';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

const UseEvent = ({ eventId, establishmentId, token, handleFormSubmit }) => {
    dayjs.locale('fr');
    const [posterUrl, setPosterUrl] = useState('');
    const [event, setEvent] = useState([]);
    const [isEventDataLoaded, setIsEventDataLoaded] = useState(false);
    const [startEventFormatted, setStartEventFormatted] = useState('');
    const [endEventFormatted, setEndEventFormatted] = useState('');
    const [startTimeFormatted, setStartTimeFormatted] = useState('');
    const [endTimeFormatted, setEndTimeFormatted] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const [inputValues, setInputValues] = useState({
        poster: '',
        event_name: '',
        description: '',
        capacity: '',
        price: '',
        start_event: '',
        end_event: '',
    });

    useEffect(() => {
        if (eventId) {
            getEvent();
            setIsEventDataLoaded(true);
        }
    }, [eventId]);

    useEffect(() => {
        setSelectedImage(
            posterUrl ||
                'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/Photo.png',
        );
    }, [posterUrl]);

    useEffect(() => {
        updateStartEventAndTime(inputValues.start_event);
        updateEndEventAndTime(inputValues.end_event);
    }, [inputValues.start_event, inputValues.end_event]);

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

    function updateStartEventAndTime(start_event) {
        if (start_event && dayjs(start_event, 'DD/MM/YYYY HH:mm').isValid()) {
            setStartEventFormatted(dayjs(start_event, 'DD/MM/YYYY HH:mm').format('dddd D MMMM'));
            setStartTimeFormatted(dayjs(start_event, 'DD/MM/YYYY HH:mm').format('HH:mm'));
        } else {
            setStartEventFormatted("Début de l'événement");
            setStartTimeFormatted('Heure');
        }
    }

    function updateEndEventAndTime(end_event) {
        if (end_event && dayjs(end_event, 'DD/MM/YYYY HH:mm').isValid()) {
            setEndEventFormatted(dayjs(end_event, 'DD/MM/YYYY HH:mm').format('dddd D MMMM'));
            setEndTimeFormatted(dayjs(end_event, 'DD/MM/YYYY HH:mm').format('HH:mm'));
        } else {
            setEndEventFormatted("Fin de l'événement");
            setEndTimeFormatted('Heure');
        }
    }

    const formikEvent = useFormik({
        initialValues: isEventDataLoaded ? event : FormInitialValuesEvent,
        enableReinitialize: true,
        validationSchema: eventSchema,
        onSubmit: (values) => handleFormSubmit(values),
    });

    return {
        posterUrl,
        event,
        isEventDataLoaded,
        getEvent,
        startEventFormatted,
        endEventFormatted,
        startTimeFormatted,
        endTimeFormatted,
        selectedImage,
        inputValues,
        setInputValues,
        setSelectedImage,
        formikEvent,
    };
};

export default UseEvent;
