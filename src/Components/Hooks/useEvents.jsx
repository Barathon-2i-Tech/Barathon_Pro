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

    //phone demo
    const [inputValues, setInputValues] = useState({
        poster: '',
        event_name: '',
        description: '',
        capacity: '',
        price: '',
        start_event: '',
        end_event: '',
    });

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
