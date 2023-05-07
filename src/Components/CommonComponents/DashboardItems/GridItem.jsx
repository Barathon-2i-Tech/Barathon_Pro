import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link as RouterLink } from 'react-router-dom';

export const GridItem = ({ href, icon, label, disabled }) => {
    return (
        <ListItemButton
            disabled={disabled}
            component={RouterLink}
            to={href}
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.300',
                borderRadius: 7,
                height: { xs: 100, sm: 130, md: 200 },
                width: '100%',
                maxWidth: { xs: 100, sm: 130, md: 200 },
                margin: 'auto',
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center',
                '&:hover': {
                    backgroundColor: disabled ? 'grey.300' : 'grey.400',
                },
            }}
        >
            <ListItemIcon sx={{ justifyContent: 'center' }}>{icon}</ListItemIcon>
            <Typography
                sx={{
                    mt: 1,
                    color: disabled ? 'grey' : 'teal.700',
                    fontSize: { xs: '0.8rem', md: '1.25rem' },
                }}
            >
                {label}
            </Typography>
        </ListItemButton>
    );
};

GridItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};
