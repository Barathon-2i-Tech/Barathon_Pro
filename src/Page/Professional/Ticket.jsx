import Axios from '../../utils/axiosUrl';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/Professional/Ticket.css';
import logo from '../../assets/barathon_logo.svg';

export default function Ticket() {
    const { idEvent, idBarathonien } = useParams();
    const [book, setBook] = useState({});
    const [load, setLoad] = useState(false);

    async function getTicketInfo() {
        try {
            const response = await Axios.api.get(
                `/pro/event/${idEvent}/barathonien/${idBarathonien}`,
                {
                    headers: {
                        accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                    },
                },
            );
            setBook(response.data.data.booking);
            setLoad(true);
        } catch (error) {
            console.log(error);
        }
    }

    const validTicket = (event) => {
        Axios.api
            .post(
                '/pro/book/' + book.booking_id,
                { code: event.target.value },
                {
                    headers: {
                        accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                    },
                },
            )
            .then(() => {
                window.confirm('Ticket validé');
                window.close();
            })
            .catch((error) => {
                console.error(error.message);
                alert('Mauvais code');
                event.target.value = '';
            });
    };

    useEffect(() => {
        getTicketInfo();
    }, []);

    const handleChange = (event) => {
        // 👇 Get input value from "event"
        console.log(event.target.value);
        if (event.target.value.length == 4) {
            validTicket(event);
        }
    };

    return (
        <div className="test">
            {load == true && (
                <>
                    <img src={logo} className="logoTicket" alt="" />
                    <div className="ticketText">
                        <p className="h3">Scan des billets de l&apos;évènement</p>
                        <p className="h5">{book.event.event_name}</p>
                        <p>
                            Barathonien : {book.user.last_name} {book.user.first_name}
                        </p>
                        {book.ticket ? (
                            <p>Status du Billet : déjà utilisé</p>
                        ) : (
                            <div>
                                <p>Status du Billet : valide</p>
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    onChange={handleChange}
                                    placeholder="Saisir le code"
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
