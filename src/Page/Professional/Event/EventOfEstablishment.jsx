import { BasicPage } from '../../../Components/CommonComponents/BasicPage';
import Paper from '@mui/material/Paper';
import '../../../css/Professional/Event.css';
import Copyright from '../../../Components/CommonComponents/Copyright';
import Person from '@mui/icons-material/Person';

export default function EventOfEstablishmentPage() {
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
                        EVENEMENT DE ... :
                    </div>
                </div>
            </section>
            <Copyright sx={{ pt: 4, pb: 4 }} />
        </Paper>
    );
}
