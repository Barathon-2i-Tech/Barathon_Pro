import PropTypes from 'prop-types';
import CalendarMonthIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EuroIcon from '@mui/icons-material/Euro';
import Parser from 'html-react-parser';

export const EventPhoneDemo = ({
    selectedImage,
    inputValues,
    startEventFormatted,
    startTimeFormatted,
    endEventFormatted,
    endTimeFormatted,
    establishmentName,
    establishmentAddress,
    establishmentPostalCode,
    categoriesSelected,
}) => {
    // Le code pour la démonstration du téléphone portable
    // ...

    return (
        <div className="container-iphone">
            <div className="container-iphone">
                <div className="phone-iphone">
                    <div className="camera-iphone"></div>
                    <div className="speaker-iphone"></div>
                    <div className="sleep-button-iphone"></div>
                    <div className="silent-switch-iphone"></div>
                    <div className="volume-iphone up"></div>
                    <div className="volume-iphone down"></div>
                    <div className="screen-iphone">
                        <div className="container-event">
                            <div className="poster-event relative">
                                <img
                                    className="fit-picture object-cover	object-top"
                                    src={selectedImage}
                                    alt="poster"
                                />

                                <div className="name-event text-xl text-white absolute bottom-0 right-0 left-0 text-center font-bold pb-4 bck-black-gradient">
                                    {inputValues.event_name
                                        ? inputValues.event_name
                                        : "Nom de l'événement"}
                                </div>
                            </div>

                            <div className="mx-2 mt-3">
                                <div className="start-event flex items-center">
                                    <div>
                                        <CalendarMonthIcon
                                            style={{ color: 'white', fontSize: 15 }}
                                        />
                                    </div>
                                    <div className="text-white text-xs ml-1">
                                        {startEventFormatted}
                                    </div>
                                    <div>
                                        <AccessTimeIcon
                                            style={{
                                                color: 'white',
                                                fontSize: 15,
                                                marginLeft: 8,
                                            }}
                                        />
                                    </div>
                                    <div className="text-white text-xs ml-1">
                                        {startTimeFormatted}
                                    </div>
                                </div>
                                <div className="end-event flex items-center mt-1">
                                    <div>
                                        <CalendarMonthIcon
                                            style={{ color: 'white', fontSize: 15 }}
                                        />
                                    </div>
                                    <div className="text-white text-xs ml-1">
                                        {endEventFormatted}
                                    </div>
                                    <div>
                                        <AccessTimeIcon
                                            style={{
                                                color: 'white',
                                                fontSize: 15,
                                                marginLeft: 8,
                                            }}
                                        />
                                    </div>
                                    <div className="text-white text-xs ml-1">
                                        {endTimeFormatted}
                                    </div>
                                </div>

                                <div className="text-white text-xs flex  mt-3">
                                    <div>
                                        <FmdGoodIcon
                                            style={{
                                                color: 'white',
                                                fontSize: 15,
                                            }}
                                        />
                                    </div>

                                    <div className="ml-1">
                                        <div className="establishment-name font-bold">
                                            {establishmentName}
                                        </div>
                                        <div className="establishment-address flex ">
                                            <div className="">{establishmentAddress}</div>
                                            <div className="ml-1">- {establishmentPostalCode}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tags-event mt-3">
                                    <div className="categories-event flex flex-wrap">
                                        {categoriesSelected.map((category) => {
                                            const categoryDetails = JSON.parse(
                                                category.category_details,
                                            );
                                            return (
                                                <div
                                                    key={category.category_id}
                                                    className="category-item flex flex-wrap"
                                                >
                                                    <div className="categories_selected-list_icon-container w-fit flex flex-wrap text-white text-xs rounded-lg">
                                                        <div className="categories_selected-list_icon categories_selected-list_icon-svg pr-2 w-fit">
                                                            {Parser(categoryDetails.icon)}
                                                        </div>
                                                        <div className="categories_selected-list_label w-fit pr-2">
                                                            {categoryDetails.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="price-event flex mt-1">
                                    <div>
                                        <ConfirmationNumberIcon
                                            style={{ color: 'white', fontSize: 15 }}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-white text-sm ml-1">
                                            {inputValues.price ? `${inputValues.price}` : '0'}
                                        </div>
                                        <div className="ml-1">
                                            <EuroIcon
                                                style={{
                                                    color: 'white',
                                                    fontSize: 13,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="description-event p-2 mt-4 rounded-xl bg-white">
                                <div className="font-bold">Details :</div>
                                <div>
                                    {inputValues.description
                                        ? inputValues.description
                                        : `Description de l'événement... Entrez les détails importants ici. Informations sur les horaires, les intervenants, etc.`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

EventPhoneDemo.propTypes = {
    selectedImage: PropTypes.string,
    inputValues: PropTypes.object,
    startEventFormatted: PropTypes.string,
    startTimeFormatted: PropTypes.string,
    endEventFormatted: PropTypes.string,
    endTimeFormatted: PropTypes.string,
    establishmentName: PropTypes.string,
    establishmentAddress: PropTypes.string,
    establishmentPostalCode: PropTypes.string,
    categoriesSelected: PropTypes.array,
};
