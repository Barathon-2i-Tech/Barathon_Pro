import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import Person from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';

export default function EventPage() {
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '80vh',
                width: '100%',
            }}
        >
            <BasicPage title="Event Page" icon={<Person />} />
            <section className="relative z-10">
            <div className="container mx-auto max-w-screen-xl sm:py-11 md:py-20 lg:items-center grid grid-cols-6 md:grid-cols-6 gap-10 px-4">
                
                    <div className="XXX__card flex justify-center flex-wrap">
                        
                        <div className="XXX__content">
                            <div className="pb-22 w-full font-bold text-center">
                                TEST Niv DESCRIPTION
                            </div>
                        </div>
                    </div>
               
            </div>
        </section>
        </Paper>
    );
}
