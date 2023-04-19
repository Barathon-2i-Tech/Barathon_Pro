import { useState, useEffect } from 'react';
import Axios from '../../utils/axiosUrl';
import { useFormik } from 'formik';
import { selectCategoriesSchema } from '../../utils/FormSchemaValidation';

const UseCategories = (token, eventId) => {
    const [allCategories, setAllCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);

    // This function is used to get All categories in database (who has sub_category ALL and Establishment)
    const getAllCategories = async () => {
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
        } else {
            // Replace this with your setOpenSnackbarCategoryError setter function
            console.log('Error: Cannot add more than 4 categories');
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
        const updatedCategories = allCategories.filter((category) =>
            values.options.includes(category.category_id),
        );
        const updatedCategoryIds = updatedCategories.map((category) => category.category_id);

        setCategoriesSelected(updatedCategories);

        // udpate categories with the ids
        setEventCategories(updatedCategoryIds);

        const newOptions = values.options.concat(updatedCategoryIds);
        formikCategories.setValues({
            ...formikCategories.values,
            options: newOptions,
        });
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return {
        allCategories,
        categoriesSelected,
        eventCategories,
        formikCategories,
        handleFormReset,
        handleCategoryChange,
        getAllCategories,
        getEventCategories,
    };
};

export default UseCategories;
