import '../../../css/Professional/Loader.css';
import { useState, useEffect } from 'react'; //,
import { useAuth } from '../../../Components/Hooks/useAuth';
import { sendFormDataPost, sendFormDataPutCategory } from '../../../utils/AxiosModel';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalFormEvent } from '../../../Components/CommonComponents/FormsComponent/GlobalFormEvent';
import UseCategories from '../../../Components/Hooks/useCategory';
import UseEstablishment from '../../../Components/Hooks/useEstablishments';
import UseEvent from '../../../Components/Hooks/useEvents';

export default function EventOfEstablishmentCreatePage() {
    const [openSnackbarCategoryError, setOpenSnackbarCategoryError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const userId = user.userLogged.user_id;
    const [reloading, setReloading] = useState(false);
    const { id } = useParams();
    const establishmentId = parseInt(id);

    // ------------------------  CATEGORY ------------------------------------------
    const {
        allCategories,
        categoriesSelected,
        formikCategories,
        handleFormReset,
        handleCategoryChange,
        eventCategories,
        getAllCategories,
    } = UseCategories(token);

    // ------------------------  ESTABLISHMENT ------------------------------------------
    const { establishmentName, establishmentAddress, establishmentPostalCode, getEstablishment } =
        UseEstablishment(ownerId, establishmentId, token);

    // ------------------------  go home after submit ------------------------------------------
    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate(`/pro/establishment/${establishmentId}/event/list`);
    };

    // ------------------------  TOAST ------------------------------------------
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpenSnackbarCategoryError(false);
    };

    // ------------------------  SUBMIT ------------------------------------------

    const handleFormSubmit = (values) => {
        const dataValues = { ...values, user_id: userId, establishment_id: establishmentId };
        const urlCreate = `pro/events`;

        // Créer un nouvel objet FormData
        const formData = new FormData();

        // Ajouter les paires clé-valeur au FormData
        for (const [key, value] of Object.entries(dataValues)) {
            if (key === 'poster' && value) {
                // Si la clé est 'poster', ajoutez le fichier image et non son chemin
                formData.append(key, value[0]);
            } else {
                formData.append(key, value);
            }
        }

        const logFormData = (formData) => {
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
        };

        logFormData(formData);

        // Create the establishment
        sendFormDataPost(urlCreate, token, formData) // Modifier cette ligne pour envoyer formData
            .then((response) => {
                const newEventId = response.data.data[0].event_id;
                // Associate categories to the new establishment
                const dataValuesCategories = { options: eventCategories };
                const urlCreateCategories = `/pro/event/${newEventId}/category`;

                console.log('datavalues categories :' + dataValuesCategories.options);

                sendFormDataPutCategory(urlCreateCategories, token, dataValuesCategories)
                    .then(() => {
                        // Show success message
                        setOpenSnackbar(true);
                        // Navigate to the home page after a delay of 1.5 seconds
                        setTimeout(() => {
                            goBack();
                            console.log('ok');
                        }, 1500);
                    })
                    .catch((e) => {
                        console.error(e);
                        console.error(e.response.data);
                        alert('Une erreur est survenu pour vos category.');
                    });
            })
            .catch((e) => {
                console.error(e);
                console.error(e.response.data);
                alert("Une erreur est survenue lors de la création de l'évenemnt.");
            });
    };

    // ------------------------  EVENT ------------------------------------------
    const {
        startEventFormatted,
        endEventFormatted,
        startTimeFormatted,
        endTimeFormatted,
        selectedImage,
        formikEvent,
        inputValues,
        setInputValues,
        setSelectedImage,
    } = UseEvent({ establishmentId, token, handleFormSubmit });

    useEffect(() => {
        getAllCategories();
        getEstablishment();
        setReloading(false);
    }, [reloading]);

    useEffect(() => {
        console.log('categorie :', eventCategories);
    }, [eventCategories]);

    return (
        <>
            <GlobalFormEvent
                formikEvent={formikEvent}
                formikCategories={formikCategories}
                handleCategoryChange={handleCategoryChange}
                handleFormReset={handleFormReset}
                handleSnackbarClose={handleSnackbarClose}
                openSnackbar={openSnackbar}
                openSnackbarCategoryError={openSnackbarCategoryError}
                allCategories={allCategories}
                categoriesSelected={categoriesSelected}
                setInputValues={setInputValues}
                setSelectedImage={setSelectedImage}
                establishmentId={establishmentId}
                selectedImage={selectedImage}
                inputValues={inputValues}
                startEventFormatted={startEventFormatted}
                startTimeFormatted={startTimeFormatted}
                endEventFormatted={endEventFormatted}
                endTimeFormatted={endTimeFormatted}
                establishmentName={establishmentName}
                establishmentAddress={establishmentAddress}
                establishmentPostalCode={establishmentPostalCode}
                title={'Créer mon évènement'}
            />
        </>
    );
}
