import '../../../css/Professional/Loader.css';
import { useState, useEffect } from 'react'; //,
import { useAuth } from '../../../Components/Hooks/useAuth';
import { sendFormDataPutMultipart, sendFormDataPutCategory } from '../../../utils/AxiosModel';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalFormEvent } from '../../../Components/CommonComponents/FormsComponent/GlobalFormEvent';
import UseCategories from '../../../Components/Hooks/useCategory';
import UseEstablishment from '../../../Components/Hooks/useEstablishments';
import UseEvent from '../../../Components/Hooks/useEvents';

export default function EventOfEstablishmentUpdatePage() {
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const userId = user.userLogged.user_id;
    const { establishmentIdParam, eventIdParam } = useParams();
    const establishmentId = parseInt(establishmentIdParam);
    const eventId = parseInt(eventIdParam);
    const [reloading, setReloading] = useState(false);
    // ------------------------  CATEGORY ------------------------------------------
    const {
        allCategories,
        categoriesSelected,
        formikCategories,
        handleCategoryChange,
        eventCategories,
        getAllCategories,
        getEventCategories,
        openSnackbarCategoryError,
        setOpenSnackbarCategoryError,
        openSnackbar,
        setOpenSnackbar,
        handleSnackbarClose,
    } = UseCategories(token, eventId);
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

    // ------------------------  CATEGORY ------------------------------------------

    // This const is to initialize initial option value with the categories of establishment in DB
    const getInitialOptions = (categories) => {
        return categories && categories.length > 0
            ? categories.map((category) => category.category_id)
            : [];
    };

    // ------------------------  SUBMIT ------------------------------------------

    const handleFormSubmit = (values) => {
        if (!formikCategories.values.options.length) {
            setOpenSnackbarCategoryError(true);
        } else {
            const categoryIds = formikCategories.values.options;

            const dataValues = { ...values, user_id: userId, establishment_id: establishmentId };
            const urlCreate = `pro/establishment/${establishmentId}/event/${eventId}`;

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

            //Create the establishment
            sendFormDataPutMultipart(urlCreate, token, formData) // Modifier cette ligne pour envoyer formData
                .then((response) => {
                    // take new id event
                    const newEventId = response.data.data[0].event_id;
                    // Envoi des données de catégories formatées
                    const urlCreateCategories = `/pro/event/${newEventId}/category`;

                    const dataValuesCategories = { options: categoryIds };

                    sendFormDataPutCategory(urlCreateCategories, token, dataValuesCategories)
                        .then(() => {
                            console.log('mise a jours des category');
                            // Show success message
                            setOpenSnackbar(true);
                        })
                        .catch((error) => {
                            console.log(error);
                            alert('Une erreur est survenue. Merci de réessayer');
                        });
                    // Navigate to the home page after a delay of 1.5 seconds
                    setTimeout(() => {
                        goBack();
                    }, 1500);
                })
                .catch((error) => {
                    console.log(error);
                    alert(
                        "Une erreur est survenue lors de la création de l'évenemnt. Merci de réessayer",
                    );
                });
        }
    };

    // ------------------------  EVENT ------------------------------------------
    const {
        getEvent,
        startEventFormatted,
        endEventFormatted,
        startTimeFormatted,
        endTimeFormatted,
        selectedImage,
        formikEvent,
        inputValues,
        setInputValues,
        setSelectedImage,
    } = UseEvent({ establishmentId, eventId, token, handleFormSubmit });

    useEffect(() => {
        getAllCategories();
        getEstablishment();
        getEvent();
        getEventCategories();
        setReloading(false);
    }, [reloading]);

    // Combiner les deux autres useEffect en un seul
    useEffect(() => {
        if (eventCategories && eventCategories.length > 0) {
            const initialOptions = getInitialOptions(eventCategories);
            formikCategories.setValues({
                options: initialOptions,
            });
        }
    }, [eventCategories]);

    return (
        <>
            <GlobalFormEvent
                formikEvent={formikEvent}
                formikCategories={formikCategories}
                categoriesSelected={categoriesSelected}
                handleCategoryChange={handleCategoryChange}
                handleSnackbarClose={handleSnackbarClose}
                openSnackbar={openSnackbar}
                openSnackbarCategoryError={openSnackbarCategoryError}
                allCategories={allCategories}
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
                title={'Modifier mon évènement'}
            />
        </>
    );
}
