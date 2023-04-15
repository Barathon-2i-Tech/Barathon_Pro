import { BasicPage } from '../../../Components/CommonComponents/BasicPage';
import Paper from '@mui/material/Paper';
import '../../../css/Professional/Event.css';
import Axios from '../../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../Components/Hooks/useAuth';

import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import Copyright from '../../../Components/CommonComponents/Copyright';
import Person from '@mui/icons-material/Person';

export default function EventPage() {
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;

    const [allEstablishments, setAllEstablishments] = useState([]);
    const [reloading, setReloading] = useState(false);

    async function getEstablishments() {
        try {
            const response = await Axios.api.get(`/pro/${ownerId}/establishment`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllEstablishments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEstablishments();

        setReloading(false);
    }, [reloading]);

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
            <BasicPage title="EVENEMENTS" icon={<Person />} />
            <section className="relative z-10">
                <div className="container mx-auto max-w-screen-xl">
                    <div className="establishment-infos-title text-2xl text-teal-700 font-bold pt-4">
                        CHOIX DE VOTRE ÉTABLISSMENT :
                    </div>
                    <div className=" sm:py-11 md:py-10 lg:items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-10 px-4">
                        {allEstablishments.map((establishment) => {
                            // Convertir la chaîne "comment" en objet JavaScript
                            const commentObj = JSON.parse(establishment.comment);
                            // Accéder à la propriété "code"
                            const commentCode = commentObj.code;

                            return (
                                <div
                                    key={establishment.establishment_id}
                                    className={`event-card-hover__card flex justify-center flex-wrap relative ${
                                        establishment.deleted_at !== null ? 'hidden' : ''
                                    }`}
                                >
                                    <Link
                                        className="absolute z-10 top-0 bottom-0 left-0 right-0 h-full w-full hover:no-underline text-white hover-txt-yellow cursor-pointer"
                                        href={
                                            commentCode === 'ESTABL_PENDING' ||
                                            commentCode === 'ESTABL_REFUSE'
                                                ? ''
                                                : `/pro/establishment/${establishment.establishment_id}/event/list`
                                        }
                                        component={
                                            commentCode === 'ESTABL_PENDING' ||
                                            commentCode === 'ESTABL_REFUSE'
                                                ? Box
                                                : 'a'
                                        }
                                    ></Link>

                                    <div
                                        className={`absolute-status-bg absolute top-0 bottom-0 left-0 right-0 h-full w-full z-0 opacity-20 ${
                                            commentCode === 'ESTABL_PENDING'
                                                ? 'color-filter-event is-pending'
                                                : commentCode === 'ESTABL_REFUSE'
                                                ? 'color-filter-event is-refuse'
                                                : ''
                                        }`}
                                    ></div>
                                    <div
                                        className={`status-establishment absolute z-50 top-0 left-0 p-2 text-white text-center 
                                        ${
                                            commentCode === 'ESTABL_PENDING'
                                                ? 'bg-orange-500'
                                                : commentCode === 'ESTABL_REFUSE'
                                                ? 'bg-red-500'
                                                : commentCode === 'ESTABL_VALID'
                                                ? 'bg-green-500'
                                                : ''
                                        }`}
                                    >
                                        {commentCode === 'ESTABL_PENDING'
                                            ? 'En attente de validation'
                                            : commentCode === 'ESTABL_REFUSE'
                                            ? 'Établissement refusé'
                                            : commentCode === 'ESTABL_VALID'
                                            ? 'Établissement validé'
                                            : ''}
                                    </div>

                                    <div className="event-card-hover__card-container relative w-full w-100 ">
                                        <div className="event-card-hover__card-container-img  card-event__img-transition">
                                            <img
                                                className="card-hover__img  w-full py-4"
                                                src={establishment.logo}
                                                alt="pub"
                                                width="300"
                                                height="100"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-hover__content">
                                        <div className="h5 text-teal-700 dark:text-white w-full text-center ">
                                            {establishment.trade_name}
                                        </div>
                                        <div className="h6 pb-22 text-cyan-900 dark:text-white w-full font-bold text-center">
                                            {establishment.city}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <Copyright sx={{ pt: 4, pb: 4 }} />
        </Paper>
    );
}
