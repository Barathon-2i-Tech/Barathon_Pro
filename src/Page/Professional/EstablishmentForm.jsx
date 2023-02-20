import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import LanguageIcon from '@mui/icons-material/Language';
// import PhoneIcon from '@mui/icons-material/Phone';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import Divider from '@mui/material/Divider';
// import { ButtonLink } from '../../Components/CommonComponents/ButtonLink';
// import { ButtonDelete } from '../../Components/CommonComponents/ButtonDelete';
import '../../css/Professional/Establishment.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Components/Hooks/useAuth';

export default function EstablishmentFormPage() {
    const { user } = useAuth();
    const [establishments, setEstablishments] = useState([]);
    const { id } = useParams();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;

    const getEstablishment = () => {
        Axios.api
            .get(`/pro/${ownerId}/establishment/${id}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setEstablishments(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getEstablishment();
    }, []);

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
            <BasicPage title="Tous mes etablissements" icon={<BusinessIcon />} />

            {establishments.map((establishment) => (
                <section
                    key={establishment.establishment_id}
                    className="container relative sm:pt-6 md:pt-11 px-4 z-10"
                >
                    <div></div>
                </section>
            ))}
        </Paper>
    );
}
