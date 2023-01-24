import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const EstablishmentsPage = () => {
    return (
        <Container sx={{ mt: 2, mb: 2 }}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80vh',
                }}
            >
                <Typography component="h1" variant="h5">
                    Etablissements
                </Typography>
            </Paper>
        </Container>
    );
};
