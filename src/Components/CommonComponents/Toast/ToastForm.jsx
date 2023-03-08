import PropTypes from 'prop-types';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const ToastForm = ({ openSnackbar, handleSnackbarClose, title, message }) => {
    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity="success"
                sx={{ width: '100%' }}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <AlertTitle>
                    <strong>{title}</strong>
                </AlertTitle>
                <strong>{message}</strong>
            </Alert>
        </Snackbar>
    );
};

ToastForm.propTypes = {
    handleSnackbarClose: PropTypes.func,
    openSnackbar: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
};
