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
import { Box, InputLabel, Select, MenuItem } from '@mui/material';
import {
    FormInitialValuesOpening,
    FormInitialValuesEstablishment,
} from '../../utils/FormInitialValue';
import { useFormik } from 'formik';
import { FormOpening } from '../../Components/CommonComponents/FormsComponent/FormOpening';
import { FormEstablishment } from '../../Components/CommonComponents/FormsComponent/FormEstablishment';
import { sendFormDataPost } from '../../utils/AxiosModel';
import { ToastForm } from '../../Components/CommonComponents/Toast/ToastForm';
import Axios from '../../utils/axiosUrl';
import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

export default function EstablishmentCreatePage() {
    const [allCategories, setAllCategories] = useState([]);
    const [establishmentCategories, setEstablishmentCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);

    const [openSnackbarOpening, setOpenSnackbarOpening] = useState(false);
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
        setOpenSnackbarOpening(false);
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
            alert('Vous avez droit à 4 categories maximum');
        }
    };
    // This const is for formik shema and action to form Opening
    const formikCategories = useFormik({
        initialValues: {
            options: [],
        },
        enableReinitialize: true,
        validationSchema: selectCategoriesSchema,
        onSubmit: (values) => handleFormSubmitCategories(values),
    });

    const handleFormSubmitCategories = (values) => {
        //toast MUI
        setOpenSnackbarOpening(true);

        // Mettre à jour les catégories de l'établissement
        const updatedCategories = allCategories.filter((category) =>
            values.options.includes(category.category_id),
        );
        const updatedCategoryIds = updatedCategories.map((category) => category.category_id);

        // avoir la liste des categories selectionner en state pour les lister
        setCategoriesSelected(updatedCategories);

        // Créer l'objet avec la propriété "option"
        // const optionObj = { option: updatedCategoryIds };
        setEstablishmentCategories(updatedCategoryIds);

        // Mettre à jour les options sélectionnées dans formikCategories.values
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
        console.log('categorie :', establishmentCategories);
    }, [establishmentCategories]);

    // ------------------------  ESTABLISHMENT ------------------------------------------
    const formikEstablishment = useFormik({
        initialValues: FormInitialValuesEstablishment,
        enableReinitialize: true,
        validationSchema: establishmentSchema(true),
        onSubmit: (values) => handleFormSubmit(values),
    });

    // ------------------------  OPENING ------------------------------------------
    const formikOpening = useFormik({
        initialValues: FormInitialValuesOpening,
        enableReinitialize: true,
        validationSchema: EstablishmentSchemaOpening,
        //onSubmit: (values) => handleFormSubmitOpening(values),
    });

    // ------------------------  SUBMIT ------------------------------------------

    const handleFormSubmit = (values) => {
        // Include the logic from handleFormSubmitOpening to save opening hours
        const dataValuesOpening = { ...formikOpening.values };
        setOpening(dataValuesOpening);
        console.log(opening);

        // Replace openingFormat with JSON.stringify(dataValuesOpening)
        const dataValues = { ...values, opening: JSON.stringify(dataValuesOpening) };
        const urlCreate = `/pro/${ownerId}/establishment`;

        console.log('submit ', dataValues);

        // Créer un nouvel objet FormData
        const formData = new FormData();

        // Ajouter les paires clé-valeur au FormData
        for (const [key, value] of Object.entries(dataValues)) {
            if (key === 'logo' && value) {
                // Si la clé est 'logo', ajoutez le fichier image et non son chemin
                formData.append(key, value[0]);
            } else {
                formData.append(key, value);
            }
        }

        console.log('formData', formData);
        console.log('formData entries', Array.from(formData.entries()));

        // Create the establishment
        sendFormDataPost(urlCreate, token, formData) // Modifier cette ligne pour envoyer formData
            .then((response) => {
                // Get the newly created establishment ID
                const newEstablishmentId = response.data.data[0].establishment_id;

                // Associate categories to the new establishment
                const dataValuesCategories = { options: establishmentCategories };
                const urlCreateCategories = `/pro/establishment/${newEstablishmentId}/category`;

                sendFormDataPost(urlCreateCategories, token, dataValuesCategories)
                    .then(() => {
                        // Show success message
                        setOpenSnackbar(true);
                        // Navigate to the home page after a delay of 1.5 seconds
                        setTimeout(() => {
                            goBack();
                        }, 1500);
                    })
                    .catch((e) => {
                        console.error(e);
                        console.error(e.response.data);
                        alert('Une erreur ');
                    });
            })
            .catch((e) => {
                console.error(e);
                console.error(e.response.data);
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
                openSnackbar={openSnackbarOpening}
                handleSnackbarClose={handleSnackbarClose}
                title={'Bravo !'}
                message={'Bien enregisté - Continuez et enregistrez'}
                severity={'success'}
            />
            <ToastForm
                openSnackbar={openSnackbar}
                handleSnackbarClose={handleSnackbarClose}
                title={'Felicitation !'}
                message={'Bien envoyez'}
                severity={'success'}
            />

            <BasicPage title="Creer mon etablissement" icon={<BusinessIcon />} />

            <section className="container mx-auto relative sm:pt-6 md:pt-11 px-4 z-10">
                <div className="rounded-xl bg-teal-700">
                    <Box m="20px" pt="20px" pb="20px">
                        <div className="categorie-title text-2xl text-white font-bold pt-6">
                            CATEGORIES DE VOTRE ETABLISSMENT :
                        </div>
                        <div className="">
                            <form className="py-4 sm:pb-4" onSubmit={formikCategories.handleSubmit}>
                                <div className="flex py-6 flex-wrap">
                                    <div className="categories_selected-container flex flex-col py-4 mr-10">
                                        <InputLabel
                                            id="options-label"
                                            style={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                paddingBottom: '10px',
                                            }}
                                        >
                                            Categories (4 categories maximum)
                                        </InputLabel>
                                        <Select
                                            labelId="options-label"
                                            id="options"
                                            style={{
                                                minWidth: 120,
                                                color: 'white',
                                                border: '1px solid white',
                                                fontWeight: 'bold',
                                            }}
                                            multiple
                                            defaultValue={formikCategories.initialValues.options}
                                            value={formikCategories.values.options}
                                            onChange={handleCategoryChange}
                                            inputProps={{
                                                name: 'options',
                                            }}
                                        >
                                            {allCategories.map((allEstablishment) => {
                                                const categoryDetails = JSON.parse(
                                                    allEstablishment.category_details,
                                                );

                                                return (
                                                    <MenuItem
                                                        key={allEstablishment.category_id}
                                                        value={allEstablishment.category_id}
                                                    >
                                                        {categoryDetails.label}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </div>

                                    <div className="categories_selected-container flex flex-col justify-between py-4 px-6 bg-gray-200 rounded-xl ml-4">
                                        <div className="font-bold pr-4 text-base text-black">
                                            NOUVELLES CATEGORIES ENREGISTRÉES :{' '}
                                        </div>
                                        <div className="flex flex-wrap">
                                            {categoriesSelected.map((allCategoriesSelected) => {
                                                const categoryDetails = JSON.parse(
                                                    allCategoriesSelected.category_details,
                                                );
                                                return (
                                                    <div
                                                        key={allCategoriesSelected.category_id}
                                                        value={allCategoriesSelected.category_id}
                                                        className="categories_selected-list flex items-center pr-4 mt-4 lg:mt-0"
                                                    >
                                                        <div className="categories_selected-list_icon-container p-4 flex bg-white rounded-lg">
                                                            <div className="categories_selected-list_icon pr-2">
                                                                {Parser(categoryDetails.icon)}
                                                            </div>
                                                            <div className="categories_selected-list_label">
                                                                {categoryDetails.label}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:justify-end">
                                    <button
                                        type="button"
                                        className="sm:ml-7 mt-7 ml-2 sm:mt-4 mb-7 sm:mb-0 text-white bg-red-700 hover:border-solid hover:border-white-900 hover:border-2 rounded-lg font-bold"
                                        onClick={() => handleFormReset()}
                                    >
                                        Effacer ma selection
                                    </button>
                                    <button
                                        type="submit"
                                        className="sm:ml-7 mt-7 ml-2 sm:mt-4 mb-7 sm:mb-0 bg-white text-black font-bold"
                                    >
                                        Enregistrer mon/mes Categories
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Box>
                </div>

                <Box m="20px">
                    <div className="establishment-infos-title text-2xl text-teal-700 font-bold pb-6 pt-4">
                        INFORMATIONS DE VOTRE ETABLISSMENT :
                    </div>
                    <form onSubmit={formikEstablishment.handleSubmit}>
                        <FormEstablishment formik={formikEstablishment} />
                        <div className="opening-title text-2xl text-teal-700 font-bold pb-6 pt-10">
                            HORRAIRES DE VOTRE ETABLISSMENT :
                        </div>
                        <FormOpening formik={formikOpening} />
                    </form>
                </Box>
            </section>
        </Paper>
    );
}
