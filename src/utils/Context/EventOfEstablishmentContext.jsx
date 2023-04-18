import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const EventOfEstablishmentContext = createContext();

export const EventOfEstablishmentProvider = ({ children }) => {
    const [allCategories, setAllCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [posterUrl, setPosterUrl] = useState('');
    const [openSnackbarCategoryError, setOpenSnackbarCategoryError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [startEventFormatted, setStartEventFormatted] = useState('');
    const [endEventFormatted, setEndEventFormatted] = useState('');
    const [startTimeFormatted, setStartTimeFormatted] = useState('');
    const [endTimeFormatted, setEndTimeFormatted] = useState('');
    const [selectedImage, setSelectedImage] = useState(
        'https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/Photo.png',
    );
    const [inputValues, setInputValues] = useState({
        poster: '',
        event_name: '',
        description: '',
        capacity: '',
        price: '',
        start_event: '',
        end_event: '',
    });

    const contextValue = {
        allCategories,
        setAllCategories,
        categoriesSelected,
        setCategoriesSelected,
        eventCategories,
        setEventCategories,
        posterUrl,
        setPosterUrl,
        openSnackbarCategoryError,
        setOpenSnackbarCategoryError,
        openSnackbar,
        setOpenSnackbar,
        startEventFormatted,
        setStartEventFormatted,
        endEventFormatted,
        setEndEventFormatted,
        startTimeFormatted,
        setStartTimeFormatted,
        endTimeFormatted,
        setEndTimeFormatted,
        selectedImage,
        setSelectedImage,
        inputValues,
        setInputValues,
    };

    return (
        <EventOfEstablishmentContext.Provider value={contextValue}>
            {children}
        </EventOfEstablishmentContext.Provider>
    );
};

EventOfEstablishmentProvider.propTypes = {
    children: PropTypes.node,
};
