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

export default function EstablishmentCreatePage() {
    const [openSnackbarOpening, setOpenSnackbarOpening] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const [opening, setOpening] = useState({});
    const [openingFormat, setOpeningFormat] = useState({});
    const openingJson = JSON.stringify(
        Object.entries(opening).reduce(
            (acc, [key, value]) => ({ ...acc, [key.toLowerCase()]: value }),
            {},
        ),
    );

    const [allEstablishmentsCategories, setAllEstablishmentsCategories] = useState([]);

    const [establishmentsCategories, setEstablishmentsCategories] = useState([]);

    async function getEstablishmentsCategories() {
        console.log('coucou');
        try {
            const response = await Axios.api.get(`/categories/establishment`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllEstablishmentsCategories(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpenSnackbarOpening(false);
    };

    const formikOpening = useFormik({
        initialValues: FormInitialValuesOpening,
        enableReinitialize: true,
        validationSchema: EstablishmentSchemaOpening,
        onSubmit: (values) => handleFormSubmitOpening(values),
    });

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

        const dataValuesCategories = { ...values };
        setEstablishmentsCategories(dataValuesCategories);
        console.log(establishmentsCategories);
    };

    const formikEstablishment = useFormik({
        initialValues: FormInitialValuesEstablishment,
        enableReinitialize: true,
        validationSchema: establishmentSchema,
        onSubmit: (values) => handleFormSubmit(values),
    });

    const handleFormSubmitOpening = (values) => {
        //toast MUI
        setOpenSnackbarOpening(true);

        const dataValuesOpening = { ...values };
        setOpening(dataValuesOpening);
    };

    useEffect(() => {
        getEstablishmentsCategories();
        setOpeningFormat(openingJson);
        console.log(establishmentsCategories);
    }, [opening]);

    const handleFormSubmit = (values) => {
        const dataValues = { ...values, opening: openingFormat };
        const urlCreate = `/pro/${ownerId}/establishment`;

        const dataValuesCategories = { establishmentsCategories };
        const urlCreateCategories = `/pro/${ownerId}/categories/test`;

        sendFormDataPost(urlCreate, token, dataValues) // Appel de la fonction
            .then(() => {
                //toast MUI
                setOpenSnackbar(true);
                console.log(dataValues);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                console.log(dataValues);
            });

        sendFormDataPost(urlCreateCategories, token, dataValuesCategories) // Appel de la fonction
            .then(() => {
                //toast MUI
                setOpenSnackbar(true);
                console.log(dataValuesCategories);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                console.log(dataValuesCategories);
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

            <section className="container relative sm:pt-6 md:pt-11 px-4 z-10">
                <div className="mx-6 font-bold">
                    1ere ETAPE (facultative): modifier tous les champs de la semaine et enregister,
                    puis sauvegarder si vous modifiez uniquement les horaires, sinon passez à la
                    prochaine étape.
                </div>
                <Box m="20px">
                    <form className="py-4" onSubmit={formikCategories.handleSubmit}>
                        <InputLabel id="options-label">Options</InputLabel>
                        <Select
                            labelId="options-label"
                            id="options"
                            multiple
                            value={formikCategories.values.options}
                            onChange={formikCategories.handleChange}
                            inputProps={{
                                name: 'options',
                            }}
                        >
                            {allEstablishmentsCategories.map((allEstablishment) => {
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
                            className=" sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                        >
                            Enregistrer mon/mes Labels
                        </button>
                    </form>
                    <FormOpening formik={formikOpening} />
                    <div className="pb-4 font-bold">
                        ETAPE 2 : modifier tous les champs puis envoyez votre demande de création.
                    </div>
                    <FormEstablishment formik={formikEstablishment} />
                </Box>
            </section>
        </Paper>
    );
}
