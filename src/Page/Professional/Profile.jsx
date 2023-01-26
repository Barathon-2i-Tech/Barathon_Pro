import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import Person from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';

export default function ProfilePage() {
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '80vh',
                width: '100%',
            }}
        >
            <BasicPage title="Profile Page" icon={<Person />} />
        </Paper>
    );
}
