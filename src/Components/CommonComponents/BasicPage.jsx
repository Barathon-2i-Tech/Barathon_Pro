import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export const BasicPage = ({ title, icon }) => {
    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'black' }}>{icon}</Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
            </Box>
        </Container>
    );
};

BasicPage.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.object,
};
