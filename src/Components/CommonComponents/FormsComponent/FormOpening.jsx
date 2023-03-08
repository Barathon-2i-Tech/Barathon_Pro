import PropTypes from 'prop-types';
import { FormFieldModel } from './FormFieldModel';
import { Box, Grid } from '@mui/material';

export const FormOpening = ({ formik }) => {
    return (
        <form onSubmit={formik.handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0,1 fr))">
                <Grid container spacing={2}>
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(
                        (day) => (
                            <FormFieldModel
                                key={day}
                                grid={6}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values[day]}
                                name={day}
                                error={!!formik.touched[day] && !!formik.errors[day]}
                                helperText={formik.touched[day] && formik.errors[day]}
                            />
                        ),
                    )}
                </Grid>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" mb="20px">
                <button
                    type="submit"
                    className=" sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                >
                    Enregistrer mes nouveaux horraires
                </button>
            </Box>
        </form>
    );
};

FormOpening.propTypes = {
    formik: PropTypes.object,
};
