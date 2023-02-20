import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Divider from '@mui/material/Divider';
import { ButtonLink } from '../../Components/CommonComponents/ButtonLink';
import { ButtonDelete } from '../../Components/CommonComponents/ButtonDelete';
import '../../css/Professional/Establishment.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from "react";

export default function EstablishmentPage() {

   const [establishments, setEstablishments] = useState([]);

    const getEstablishments = () => {
        Axios.api
        .get(`/pro/1/establishment`, 
        {
            headers: {
                accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                "Authorization": "Bearer " + "12|f1fsRWQX5sSyBrn7eImTPtsN22ytqphYquZiprAc",
            },
        },
        )
        .then((response) => {
            setEstablishments(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteEstablishment = (id) => {
        Axios.api
          .delete(`/pro/1/establishment/${id}/delete`, {
            headers: {
              accept: 'application/vnd.api+json',
              'Content-Type': 'application/vnd.api+json',
              Authorization: 'Bearer ' + '12|f1fsRWQX5sSyBrn7eImTPtsN22ytqphYquZiprAc',
            },
          })
          .then(() => {
            console.log('bien effacé');
            // Supprime l'établissement correspondant de la liste
            setEstablishments((prevEstablishments) =>
              prevEstablishments.filter(
                (establishment) => establishment.establishment_id !== id
              )
            );
          })
          .catch((error) => {
            console.log(error);
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
            <BasicPage title="Modifier mon etablissement" icon={<BusinessIcon />} />
            
            {establishments.map(establishment => (
            <section key={establishment.establishment_id} className="container relative sm:pt-6 md:pt-11 px-4 z-10">
                <div className="flex swipe items-center justify-between">
                    <div className=" text-sm flex mr-3">
                        <div className="min-100px-min">
                            <img
                                className=""
                                src={establishment.logo}
                                alt=""
                                width="100"
                                height="100"
                            />
                        </div>
                        <div className="pl-3">
                            <div className="font-bold">{establishment.trade_name}</div>
                            <div className="">adresse test test test</div>
                            <div className="">69000</div>
                        </div>
                    </div>
                    <ButtonLink
                        link="/pro/establishmentForm"
                        allClass="swipe-item min-100px-min min-w-button-establishement text-center flex align-center justify-center flex-wrap card-shadow p-2.5 my-1 mr-3 max-w-xs"
                        text="Modifier"
                        icon={<EditIcon />}
                    />
                    <ButtonLink
                        link="/"
                        allClass="swipe-item min-100px-min min-w-button-establishement text-center flex align-center justify-center flex-wrap card-shadow p-2.5 my-1 mr-3"
                        text={establishment.website}
                        icon={<LanguageIcon />}
                    />

                    <div className="swipe-item text-center min-100px-min min-w-button-establishement flex items-center justify-center flex-wrap card-shadow p-2.5 my-1 mr-3">
                        <div className="w-full">
                            <PhoneIcon />
                        </div>
                        <div className="w-full font-bold">{establishment.phone}</div>
                    </div>
                    <div className="swipe-item text-center min-100px-min min-w-button-establishement flex items-center justify-center flex-wrap card-shadow p-2.5 my-1 mr-3">
                        <div className="w-full">
                            <BookmarkBorderIcon />
                        </div>
                        <div className="w-full font-bold">bar à vin</div>
                    </div>

                    <ButtonDelete functionDelete={() => deleteEstablishment(establishment.establishment_id)} allClass="swipe-item w-fit m-2  min-100px-min text-white bg-red-700 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg" />
                </div>

                <Divider sx={{ my: 3 }} />
            </section>
            ))} 
        </Paper>
    );
}
