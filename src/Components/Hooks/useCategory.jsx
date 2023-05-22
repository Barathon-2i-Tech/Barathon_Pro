import { useState, useEffect } from 'react';
import Axios from '../../utils/axiosUrl';
import { useFormik } from 'formik';
import { selectCategoriesSchema } from '../../utils/FormSchemaValidation';

const UseCategories = (token, eventId) => {
    const [allCategories, setAllCategories] = useState([]);
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [openSnackbarCategoryError, setOpenSnackbarCategoryError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // ------------------------  TOAST ------------------------------------------
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpenSnackbarCategoryError(false);
    };

    // This function is used to get All categories in database (who has sub_category ALL and Establishment)
    const getAllCategoriesEvent = async () => {
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
    };

    const getEventCategories = async () => {
        try {
            const response = await Axios.api.get(`/pro/event/${eventId}/category`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setEventCategories(response.data.data);
            setFetchedCategories(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    //function to reset selection
    const handleFormReset = () => {
        formikCategories.resetForm();
        setCategoriesSelected([]);
    };
    //function no add more 4 categories
    const handleCategoryChange = (event) => {
        if (event.target.value.length <= 4) {
            formikCategories.handleChange(event);

            const selected = event.target.value.map((value) => {
                return allCategories.find((category) => category.category_id === value);
            });
            setCategoriesSelected(selected);
        } else {
            // Replace this with your setOpenSnackbarCategoryError setter function
            setOpenSnackbarCategoryError(true);
        }
    };

    // This function returns an array of initial category option values
    const getInitialOptions = (categories) => {
        return categories && categories.length > 0
            ? categories.map((category) => category.category_id)
            : [];
    };

    //This const is for formik shema and action to form Opening
    const formikCategories = useFormik({
        initialValues: {
            options: [],
        },
        enableReinitialize: true,
        validationSchema: selectCategoriesSchema,
    });

    useEffect(() => {
        if (eventCategories && eventCategories.length > 0) {
            const initialOptions = getInitialOptions(eventCategories);
            formikCategories.setValues({
                options: initialOptions,
            });
        }
    }, [eventCategories]);

    useEffect(() => {
        getAllCategoriesEvent();
    }, []);

    useEffect(() => {
        if (fetchedCategories.length > 0) {
            setCategoriesSelected(fetchedCategories);
        }
    }, [fetchedCategories]);

    return {
        allCategories,
        categoriesSelected,
        eventCategories,
        formikCategories,
        handleFormReset,
        handleCategoryChange,
        getAllCategoriesEvent,
        getEventCategories,
        setEventCategories,
        openSnackbarCategoryError,
        openSnackbar,
        handleSnackbarClose,
        setOpenSnackbar,
        setOpenSnackbarCategoryError,
    };
};

export default UseCategories;
