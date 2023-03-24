import PropTypes from 'prop-types';
import { FormFieldModel } from './FormFieldModel';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate('/pro/establishment');
    };

    return (
        <form onSubmit={formik.handleSubmit}>
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
                            grid={6}
                            label={labelMap[formFieldValue]}
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
            <Box display="flex" justifyContent="end" mt="20px">
                <div className="w-fit inline-block text-white lg:text-xl">
                    <button
                        onClick={goBack}
                        className="w-fit mr-2 bg-red-700 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg"
                    >
                        Annuler
                    </button>
                </div>
                <button
                    type="submit"
                    className=" sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                >
                    Envoyer ma demande
                </button>
            </Box>
        </form>
    );
};

FormEstablishment.propTypes = {
    formik: PropTypes.object,
};
