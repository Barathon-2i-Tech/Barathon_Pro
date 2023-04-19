import PropTypes from 'prop-types';
import { FormFieldModel } from './FormFieldModel';
import { Box, Grid } from '@mui/material';
import Link from '@mui/material/Link';

export const FormEvent = ({ formik, setInputValues, setSelectedImage, establishmentId }) => {
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
                                formFieldValue === 'poster' ||
                                formFieldValue === 'description' ||
                                formFieldValue === 'event_name'
                                    ? 12
                                    : 6
                            }
                            setSelectedImage={setSelectedImage}
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
                            value={formik.values[formFieldValue] || ''} // Modifiez cette ligne
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
                        href={`/pro/establishment/${establishmentId}/event/list`}
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
        </>
    );
};

FormEvent.propTypes = {
    formik: PropTypes.object,
    setInputValues: PropTypes.func,
    setSelectedImage: PropTypes.func,
    establishmentId: PropTypes.number,
};
