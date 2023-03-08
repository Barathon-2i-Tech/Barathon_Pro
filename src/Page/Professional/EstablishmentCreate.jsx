import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import '../../css/Professional/Establishment.css';
import '../../css/Professional/Loader.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Components/Hooks/useAuth';
import { EstablishmentSchemaOpening, establishmentSchema } from '../../utils/FormSchemaValidation';
import { Box } from '@mui/material';
import {
    FormInitialValuesOpening,
    FormInitialValuesEstablishment,
} from '../../utils/FormInitialValue';
import { useFormik } from 'formik';
import { FormOpening } from '../../Components/CommonComponents/FormsComponent/FormOpening';
import { FormEstablishment } from '../../Components/CommonComponents/FormsComponent/FormEstablishment';
import { sendFormDataPost } from '../../utils/AxiosModel';
import { ToastForm } from '../../Components/CommonComponents/Toast/ToastForm';

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
        setOpeningFormat(openingJson);
    }, [opening]);

    const handleFormSubmit = (values) => {
        //toast MUI
        const dataValues = { ...values, opening: openingFormat };
        const urlCreate = `/pro/${ownerId}/establishment/create`;

        sendFormDataPost(urlCreate, token, dataValues) // Appel de la fonction
            .then(() => {
                setOpenSnackbar(true);
                console.log(dataValues);
            })
            .catch((e) => {
                console.error(e);
                alert('Une erreur est survenue. Merci de réessayer');
                console.log(dataValues);
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
