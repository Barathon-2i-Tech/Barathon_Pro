import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, TextField } from '@mui/material';
import moment from 'moment';
import { useContext } from 'react';
import { FormContext } from '../../Page/Auth/RegisterHome';
import '../../css/Auth/Register.css';

export default function RegisterAgeVerify() {
    const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

    const initialValues = {
        birthday: '',
    };

    const ageSchema = yup.object().shape({
        birthday: yup
            .string()
            .test('birthday', "Vous n'etes pas majeur", (value) => {
                return moment().diff(moment(value), 'years') >= 18;
            })
            .required('date anniversaire obligatoire'),
    });

    const handleFormSubmit = (values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center sm:pt-0 registerWrapper">
            <div className="w-full sm:max-w-lg sm:mt-6 sm:px-6 py-4 bg-white md:shadow-lg overflow-hidden sm:rounded-lg z-10">
                <Box m="20px">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleFormSubmit}
                        validationSchema={ageSchema}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0,1 fr))"
                                >
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="date"
                                        label="Date de naissance"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.birthday}
                                        name="birthday"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        //convert to boolean using !! operator
                                        error={!!touched.birthday && !!errors.birthday}
                                        helperText={touched.birthday && errors.birthday}
                                        sx={{ gridColumn: 'span 2' }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px">
                                    <button
                                        type="submit"
                                        className="button-style bg-orange-400 text-white sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 text-base"
                                    >
                                        Etape suivante
                                    </button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </div>
        </div>
    );
}
