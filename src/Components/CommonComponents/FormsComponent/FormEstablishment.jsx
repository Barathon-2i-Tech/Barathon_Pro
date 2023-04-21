import PropTypes from 'prop-types';
import { FormFieldModel } from './FormFieldModel';
import { Box, Grid } from '@mui/material';

export const FormEstablishment = ({ formik }) => {
    const labelMap = {
        logo: 'Logo',
        siret: 'Numéro de SIRET',
        trade_name: "Nom de l'établissement",
        address: 'Adresse',
        city: 'Ville',
        postal_code: 'Code postal',
        phone: 'Téléphone',
        email: 'E-mail',
        website: 'Site web',
    };

    return (
        <>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0,1 fr))">
                <Grid container spacing={2}>
                    {[
                        'logo',
                        'siret',
                        'trade_name',
                        'address',
                        'city',
                        'postal_code',
                        'phone',
                        'email',
                        'website',
                    ].map((formFieldValue) => (
                        <FormFieldModel
                            key={formFieldValue}
                            grid={formFieldValue === 'logo' ? 12 : 6}
                            label={labelMap[formFieldValue]}
                            buttonTextDownload={'Importez votre logo'}
                            onBlur={formik.handleBlur}
                            onChange={(event, fileList) => {
                                if (fileList) {
                                    formik.setFieldValue(formFieldValue, fileList);
                                } else {
                                    formik.handleChange(event);
                                }
                            }}
                            value={formFieldValue === 'logo' ? '' : formik.values[formFieldValue]} // Modifiez cette ligne
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

FormEstablishment.propTypes = {
    formik: PropTypes.object,
};
