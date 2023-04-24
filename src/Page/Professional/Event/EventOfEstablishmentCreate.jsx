import '../../../css/Professional/Loader.css';
import { useEffect } from 'react'; //,
import { useAuth } from '../../../Components/Hooks/useAuth';
import { sendFormDataPost, sendFormDataPutCategory } from '../../../utils/AxiosModel';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalFormEvent } from '../../../Components/CommonComponents/FormsComponent/GlobalFormEvent';
import UseCategories from '../../../Components/Hooks/useCategory';
import UseEstablishment from '../../../Components/Hooks/useEstablishments';
import UseEvent from '../../../Components/Hooks/useEvents';

export default function EventOfEstablishmentCreatePage() {
    // Retrieve user information and token from the useAuth hook
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const userId = user.userLogged.user_id;
    // Get the establishment ID from the URL
    const { id } = useParams();
    const establishmentId = parseInt(id);

    // ------------------------  CATEGORY ------------------------------------------
    // Destructure the needed values and functions from UseCategories hook
    const {
        allCategories,
        categoriesSelected,
        formikCategories,
        handleCategoryChange,
        getAllCategories,
        openSnackbarCategoryError,
        setOpenSnackbarCategoryError,
        openSnackbar,
        handleSnackbarClose,
        setOpenSnackbar,
    } = UseCategories(token);

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

    // ------------------------  SUBMIT ------------------------------------------
    // Handle form submission for event creation
    const handleFormSubmit = (values) => {
        if (!formikCategories.values.options.length) {
            setOpenSnackbarCategoryError(true);
        } else {
            const categoryIds = formikCategories.values.options;

            const dataValues = { ...values, user_id: userId, establishment_id: establishmentId };
            const urlCreate = `pro/events`;

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

            // Create the event
            sendFormDataPost(urlCreate, token, formData) // Modify this line to send formData
                .then((response) => {
                    const newEventId = response.data.data[0].event_id;
                    // Associate categories to the new event
                    const dataValuesCategories = { options: categoryIds };
                    const urlCreateCategories = `/pro/event/${newEventId}/category`;

                    sendFormDataPutCategory(urlCreateCategories, token, dataValuesCategories)
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
                            alert('An error occurred with your categories.');
                        });
                })
                .catch((e) => {
                    console.error(e);
                    alert('An error occurred while creating the event.');
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
    } = UseEvent({ establishmentId, token, handleFormSubmit });

    // Fetch categories and establishment data when the component mounts
    useEffect(() => {
        getAllCategories();
        getEstablishment();
    }, []);

    return (
        <>
            <GlobalFormEvent
                formikEvent={formikEvent}
                formikCategories={formikCategories}
                handleCategoryChange={handleCategoryChange}
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
