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


export default function EstablishmentPage() {
return (
<Paper
    sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        width: '100%',
    }}
>
    <BasicPage title="Tous mes etablissements" icon={<BusinessIcon />} />
    <section className="container relative sm:py-11 md:py-20 px-4 z-10">

        <div className="flex swipe items-center">
            <div className=" text-sm flex mr-3">
                <div className="min-100px-min">
                    <img className="" src="https://7482495.fs1.hubspotusercontent-na1.net/hubfs/7482495/Julien%20folder/Frame%20201.jpg" alt="" width="100" height="100" />
                </div>
                <div className="pl-3">
                    <div className="font-bold">Titre</div>
                    <div className="">adresse</div>
                    <div className="">69000</div>
                </div>
            </div>
            <ButtonLink link="/" allClass="swipe-item min-100px-min text-center flex align-center justify-center flex-wrap card-shadow p-2.5 my-1 mr-3 max-w-xs" text="Modifier" icon={<EditIcon />}/>
            <ButtonLink link="/" allClass="swipe-item min-100px-min text-center flex align-center justify-center flex-wrap card-shadow p-2.5 my-1 mr-3" text="www.openBar.com" icon={<LanguageIcon />}/>
            
            <div className="swipe-item text-center min-100px-min flex items-center justify-center flex-wrap card-shadow p-2.5 my-1 mr-3" >
                <div className="w-full">
                    <PhoneIcon />
                </div>
                <div className="w-full font-bold">
                    0688007700
                </div>
            </div>
            <div className="swipe-item text-center min-100px-min flex items-center justify-center flex-wrap card-shadow p-2.5 my-1 mr-3" >
                <div className="w-full">
                    <BookmarkBorderIcon />
                </div>
                <div className="w-full font-bold">
                    bar à vin
                </div>
            </div>
            
            <ButtonDelete allClass="swipe-item w-fit m-2  min-100px-min text-white bg-red-700 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg"/>
            


        </div>

        <Divider sx={{ my: 3 }} />

    </section>
</Paper>
);
}
