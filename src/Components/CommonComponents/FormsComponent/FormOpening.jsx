import PropTypes from 'prop-types';
import { FormFieldModel } from './FormFieldModel';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const FormOpening = ({ formik }) => {

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate('/pro/establishment');
    };


    return (
        <>
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
        </>
    );
};

FormOpening.propTypes = {
    formik: PropTypes.object,
};
