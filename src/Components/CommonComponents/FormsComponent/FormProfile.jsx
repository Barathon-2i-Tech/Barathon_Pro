import PropTypes from 'prop-types';
import { FormFieldModel } from './FormFieldModel';
import { Box, Grid } from '@mui/material';
import Link from '@mui/material/Link';

export const FormProfile = ({ formik, setSelectedImage }) => {
    const labelMap = {
        avatar: 'Photo de profil',
        last_name: 'Nom',
        first_name: 'Prénom',
        email: 'E-mail',
        phone: 'telephone',
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0,1 fr))">
                    <Grid container spacing={2}>
                        {['avatar', 'last_name', 'first_name', 'email', 'phone'].map(
                            (formFieldValue) => (
                                <FormFieldModel
                                    key={formFieldValue}
                                    setSelectedImage={setSelectedImage}
                                    grid={formFieldValue === 'avatar' ? 12 : 6}
                                    label={labelMap[formFieldValue]}
                                    buttonTextDownload={'Importez votre avatar'}
                                    onBlur={formik.handleBlur}
                                    onChange={(event, fileList) => {
                                        if (fileList) {
                                            formik.setFieldValue(formFieldValue, fileList);
                                        } else {
                                            formik.handleChange(event);
                                        }
                                    }}
                                    value={formik.values[formFieldValue] || ''}
                                    name={formFieldValue}
                                    error={
                                        !!formik.touched[formFieldValue] &&
                                        !!formik.errors[formFieldValue]
                                    }
                                    helperText={
                                        formik.touched[formFieldValue] &&
                                        formik.errors[formFieldValue]
                                    }
                                />
                            ),
                        )}
                    </Grid>
                </Box>

                <Box display="flex" justifyContent="end" mt="20px" mb="20px">
                    <div className="w-fit inline-block text-white lg:text-xl ">
                        <Link
                            style={{
                                borderRadius: '8px',
                                border: '1px solid transparent',
                                padding: '0.6em 1.2em',
                                fontSize: '1em',
                                cursor: 'pointer',
                                transition: 'border-color 0.25s',
                                textDecoration: 'none',
                                color: 'white',
                                display: 'inline-block',
                                backgroundColor: '#b91c1c',
                            }}
                            className="font-bold bg-red-700 rounded-lg"
                            href={`/pro/establishment`}
                        >
                            Annuler
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className=" sm:ml-4 mt-7 sm:mt-0 mb-7 sm:mb-0 bg-teal-700 text-white font-bold"
                    >
                        Envoyer
                    </button>
                </Box>
            </form>
        </>
    );
};

FormProfile.propTypes = {
    formik: PropTypes.object,
    setSelectedImage: PropTypes.func,
};
