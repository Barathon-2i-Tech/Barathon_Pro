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
            setPosterUrl(response.data.data.poster);

            await new Promise((resolve) => setTimeout(resolve));
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('display');
            }
        } catch (error) {
            console.log(error);
        }
    }

    function updateStartEventAndTime(start_event) {
        updateEventAndTime(
            start_event,
            setStartEventFormatted,
            setStartTimeFormatted,
            "Début de l'événement",
            'Heure',
        );
    }

    function updateEndEventAndTime(end_event) {
        updateEventAndTime(
            end_event,
            setEndEventFormatted,
            setEndTimeFormatted,
            "Fin de l'événement",
            'Heure',
        );
    }

    function updateEventAndTime(
        eventDateTime,
        setEventFormatted,
        setTimeFormatted,
        defaultEventText,
        defaultTimeText,
    ) {
        if (eventDateTime && dayjs(eventDateTime, 'DD/MM/YYYY HH:mm').isValid()) {
            setEventFormatted(dayjs(eventDateTime, 'DD/MM/YYYY HH:mm').format('dddd D MMMM'));
            setTimeFormatted(dayjs(eventDateTime, 'DD/MM/YYYY HH:mm').format('HH:mm'));
        } else {
            setEventFormatted(defaultEventText);
            setTimeFormatted(defaultTimeText);
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
