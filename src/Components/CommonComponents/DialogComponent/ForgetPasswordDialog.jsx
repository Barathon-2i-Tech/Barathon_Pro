import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { FormInitialValuesForgotPassword } from '../../../utils/FormInitialValue';
import { forgotPasswordSchema } from '../../../utils/FormSchemaValidation';

export const ForgetPasswordDialog = ({
    handleSubmitForgetPassword,
    variant,
    buttonOpenContent,
    dialogTitle,
    dialogContentText,
    textFieldLabel,
    textFieldType,
}) => {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formikForgetPassword = useFormik({
        initialValues: FormInitialValuesForgotPassword,
        enableReinitialize: true,
        validationSchema: forgotPasswordSchema,
        onSubmit: (values) => handleSubmitForgetPassword(values),
    });
    useEffect(() => {
        if (submitted) {
            handleClose();
            setSubmitted(false);
        }
    }, [submitted, handleClose]);

    return (
        <>
            <div className="w-full flex justify-start">
                <Button
                    variant={variant}
                    onClick={handleClickOpen}
                    sx={{ '&:focus': { outline: 'none' } }}
                >
                    {buttonOpenContent}
                </Button>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogContentText}</DialogContentText>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmitForgetPassword(formikForgetPassword.values);
                            setSubmitted(true);
                        }}
                    >
                        <TextField
                            autoFocus
                            fullWidth
                            variant="filled"
                            label={textFieldLabel}
                            type={textFieldType}
                            onBlur={formikForgetPassword.handleBlur}
                            onChange={(event) => {
                                formikForgetPassword.handleChange(event);
                            }}
                            value={formikForgetPassword.values.email}
                            name="email"
                            error={
                                formikForgetPassword.touched.email &&
                                !!formikForgetPassword.errors.email
                            }
                            helperText={
                                formikForgetPassword.touched.email
                                    ? formikForgetPassword.errors.email
                                    : null
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Annuler</Button>
                            <Button type="submit">Envoyer</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

ForgetPasswordDialog.propTypes = {
    handleSubmitForgetPassword: PropTypes.func,
    variant: PropTypes.string,
    buttonOpenContent: PropTypes.string,
    dialogTitle: PropTypes.string,
    dialogContentText: PropTypes.string,
    textFieldLabel: PropTypes.string,
    textFieldType: PropTypes.string,
};
