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

export default function EstablishmentFormPage() {
    const [establishments, setEstablishments] = useState([]);

    const getEstablishments = () => {
        Axios.api
            .get(`/pro/1/establishment`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: 'Bearer ' + '12|f1fsRWQX5sSyBrn7eImTPtsN22ytqphYquZiprAc',
                },
            })
            .then((response) => {
                //console.log(response.data.data + "ceci est le premier");
                setEstablishments(response.data.data);
                console.log(establishments);
                console.log('test');
            })
            .catch((error) => {
                console.log(error);
                console.log('il y a une erreur');
            });
    };

    useEffect(() => {
        getEstablishments();
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
                ></section>
            ))}
        </Paper>
    );
}
