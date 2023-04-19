import { useState, useEffect } from 'react';
import Axios from '../../utils/axiosUrl';

const UseEstablishment = (ownerId, establishmentId, token) => {
    const [establishment, setEstablishment] = useState([]);
    const [establishmentName, setEstablishmentName] = useState('');
    const [establishmentAddress, setEstablishmentAddress] = useState('');
    const [establishmentPostalCode, setEstablishmentPostalCode] = useState('');
    const [isEventDataLoaded, setIsEventDataLoaded] = useState(false);

    // This function is used to get All categories in database (who has sub_category ALL and Establishment)
    const getEstablishment = async () => {
        try {
            const response = await Axios.api.get(
                `/pro/${ownerId}/establishment/${establishmentId}`,
                {
                    headers: {
                        accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setEstablishment(response.data.data);
            setIsEventDataLoaded(true);

            const myEstablishmentAddress = establishment.map((is) => is.address);
            setEstablishmentAddress(myEstablishmentAddress[0] || '');

            const myEstablishmentPostalCode = establishment.map((is) => is.postal_code);
            setEstablishmentPostalCode(myEstablishmentPostalCode[0] || '');

            const myEstablishmentName = establishment.map((is) => is.trade_name);
            setEstablishmentName(myEstablishmentName[0] || '');

            await new Promise((resolve) => setTimeout(resolve)); // Attendre un tick pour laisser le temps à React de mettre à jour l'interface utilisateur
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('display');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEstablishment();
    }, []);

    return {
        establishment,
        establishmentName,
        establishmentAddress,
        establishmentPostalCode,
        isEventDataLoaded,
        getEstablishment,
    };
};

export default UseEstablishment;
