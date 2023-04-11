import PropTypes from 'prop-types';
import { FormFieldModel } from './FormFieldModel';
import { Box, Grid } from '@mui/material';

export const FormEvent = ({ formik, setInputValues }) => {
    const labelMap = {
        poster: 'Affiche de votre évènement',
        event_name: 'Nom de lévènement',
        description: 'Déscription',
        capacity: 'Capacité',
        price: 'Prix',
        start_event: "Début de l'évènement",
        end_event: "Fin de l'évènement",
    };

    return (
        <>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0,1 fr))">
                <Grid container spacing={2}>
                    {[
                        'poster',
                        'event_name',
                        'description',
                        'capacity',
                        'price',
                        'start_event',
                        'end_event',
                    ].map((formFieldValue) => (
                        <FormFieldModel
                            key={formFieldValue}
                            grid={
                                formFieldValue === 'poster' || formFieldValue === 'description'
                                    ? 12
                                    : 6
                            }
                            label={labelMap[formFieldValue]}
                            onBlur={formik.handleBlur}
                            onChange={(event, fileList) => {
                                if (fileList) {
                                    formik.setFieldValue(formFieldValue, fileList);
                                } else {
                                    if (
                                        formFieldValue === 'start_event' ||
                                        formFieldValue === 'end_event'
                                    ) {
                                        formik.setFieldValue(formFieldValue, event.target.value);
                                        setInputValues((prevValues) => ({
                                            ...prevValues,
                                            [formFieldValue]: event.target.value,
                                        }));
                                    } else {
                                        formik.handleChange(event);
                                        setInputValues((prevValues) => ({
                                            ...prevValues,
                                            [formFieldValue]: event.target.value,
                                        }));
                                    }
                                }
                            }}
                            value={formFieldValue === 'poster' ? '' : formik.values[formFieldValue]} // Modifiez cette ligne
                            name={formFieldValue}
                            error={
                                !!formik.touched[formFieldValue] && !!formik.errors[formFieldValue]
                            }
                            helperText={
                                formik.touched[formFieldValue] && formik.errors[formFieldValue]
                            }
                        />
                    ))}
                </Grid>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px"></Box>
        </>
    );
};

FormEvent.propTypes = {
    formik: PropTypes.object,
    setInputValues: PropTypes.func,
};
