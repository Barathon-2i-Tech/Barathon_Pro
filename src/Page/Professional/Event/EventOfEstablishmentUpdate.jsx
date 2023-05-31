import '../../../css/Professional/Loader.css';
import { useEffect } from 'react'; //,
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

    // ------------------------  CATEGORY ------------------------------------------
    // Destructure the needed values and functions from UseCategories hook
    const {
        allCategories,
        categoriesSelected,
        formikCategories,
        handleCategoryChange,

        getAllCategoriesEvent,
        getEventCategories,
        openSnackbarCategoryError,
        setOpenSnackbarCategoryError,
        openSnackbar,
        setOpenSnackbar,
        handleSnackbarClose,
    } = UseCategories(token, eventId);

    // ------------------------  ESTABLISHMENT ------------------------------------------
    // Destructure the needed values and functions from UseEstablishment hook
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

    // ------------------------  SUBMIT ------------------------------------------

    // This function handles the form submission
    const handleFormSubmit = (values) => {
        // Check if there are selected categories
        if (!formikCategories.values.options.length) {
            setOpenSnackbarCategoryError(true);
        } else {
            const categoryIds = formikCategories.values.options;

            const dataValues = { ...values, user_id: userId, establishment_id: establishmentId };
            const urlCreate = `pro/establishment/${establishmentId}/event/${eventId}`;

            // Create a new FormData object
            const formData = new FormData();

            // Add key-value pairs to FormData
            for (const [key, value] of Object.entries(dataValues)) {
                if (key === 'poster' && value) {
                    // If the key is 'poster', add the image file instead of its path
                    formData.append(key, value[0]);
                } else {
                    formData.append(key, value);
                }
            }
            // Update the event
            sendFormDataPutMultipart(urlCreate, token, formData)
                .then((response) => {
                    // Get the updated event's ID
                    const newEventId = response.data.data.event.event_id;

                    // Send formatted category data
                    const urlCreateCategories = `/pro/event/${newEventId}/category`;
                    const dataValuesCategories = { options: categoryIds };

                    sendFormDataPutCategory(urlCreateCategories, token, dataValuesCategories)
                        .then(() => {
                            // Show success message
                            setOpenSnackbar(true);
                        })
                        .catch((error) => {
                            console.log(error);
                            alert("Une erreur est arrivé avec l'enregistrement de vos categories");
                        });
                    // Navigate to the home page after a delay of 1.5 seconds
                    setTimeout(() => {
                        goBack();
                    }, 1500);
                })
                .catch((error) => {
                    console.log(error);
                    alert("Une erreur est arrivé avec l'envoi de vos informations, ressayez");
                });
        }
    };

    // ------------------------  EVENT ------------------------------------------
    // Destructure the needed values and functions from UseEvent hook
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
    } = UseEvent({ establishmentId, eventId, token, handleFormSubmit });

    // Call API methods on component mount
    useEffect(() => {
        getAllCategoriesEvent();
        getEstablishment();
        getEventCategories();
    }, []);

    // Combine the two useEffects into one

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
