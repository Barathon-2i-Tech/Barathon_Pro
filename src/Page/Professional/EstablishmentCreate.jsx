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
        validationSchema: establishmentSchema,
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
            />
            <ToastForm
                openSnackbar={openSnackbar}
                handleSnackbarClose={handleSnackbarClose}
                title={'Felicitation !'}
                message={'Bien envoyez'}
            />

            <BasicPage title="Creer mon etablissement" icon={<BusinessIcon />} />

            <section className="container mx-auto relative sm:pt-6 md:pt-11 px-4 z-10">
                <div className="mx-6 font-bold">
                    1ere ETAPE (facultative): modifier tous les champs de la semaine et enregister,
                    puis sauvegarder si vous modifiez uniquement les horaires, sinon passez à la
                    prochaine étape.
                </div>
                <Box m="20px">
                    <div className="categorie-title text-2xl text-teal-700 font-bold pt-10">
                        CATEGORIES DE VOTRE ETABLISSMENT :
                    </div>
                    <form className="py-4 sm:pb-4" onSubmit={formikCategories.handleSubmit}>
                        <InputLabel id="options-label">Categories</InputLabel>
                        <Select
                            labelId="options-label"
                            id="options"
                            style={{ minWidth: 120 }}
                            multiple
                            defaultValue={formikCategories.initialValues.options}
                            value={formikCategories.values.options}
                            onChange={formikCategories.handleChange}
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
                        <button
                            type="submit"
                            className="sm:ml-7 mt-7 ml-2 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                        >
                            Enregistrer mon/mes Categories
                        </button>
                    </form>
                    <div className="categories_selected-container flex items-center sm:pb-10">
                        <div className="font-bold pr-4 text-base">CATEGORIES ENREGISTRÉES : </div>
                        {categoriesSelected.map((allCategoriesSelected) => {
                            const categoryDetails = JSON.parse(
                                allCategoriesSelected.category_details,
                            );
                            return (
                                <div
                                    key={allCategoriesSelected.category_id}
                                    value={allCategoriesSelected.category_id}
                                    className="categories_selected-list flex items-center pr-4"
                                >
                                    <div className="categories_selected-list_icon-container p-4 flex bg-gray-100 rounded-lg">
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

                    <div className="pb-4 font-bold">
                        ETAPE 2 : modifier tous les champs puis envoyez votre demande de création.
                    </div>
                    <div className="establishment-infos-title text-2xl text-teal-700 font-bold pb-6">
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
