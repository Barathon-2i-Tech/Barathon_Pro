import PropTypes from 'prop-types';
import { Box, Grid, Paper, Button } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import Link from '@mui/material/Link';
import { ToastForm } from '../Toast/ToastForm';
import { BasicPage } from '../BasicPage';
import { FormSelect } from './FormSelect';
import { FormEvent } from './FormEvent';
import { EventPhoneDemo } from '../PhoneDemo/EventPhoneDemo';
import { Loader } from '../Loader';

export const GlobalFormEvent = ({
    formikEvent,
    formikCategories,
    handleCategoryChange,
    handleSnackbarClose,
    openSnackbar,
    openSnackbarCategoryError,
    allCategories,
    categoriesSelected,
    setInputValues,
    setSelectedImage,
    establishmentId,
    selectedImage,
    inputValues,
    startEventFormatted,
    startTimeFormatted,
    endEventFormatted,
    endTimeFormatted,
    establishmentName,
    establishmentAddress,
    establishmentPostalCode,
    title,
}) => {
    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    minHeight: '80vh',
                    width: '100%',
                }}
            >
                <ToastForm
                    openSnackbar={openSnackbarCategoryError}
                    handleSnackbarClose={handleSnackbarClose}
                    title={'Attention!'}
                    message={'Vous devez avoir entre 1 et 4 categories maximum'}
                    severity={'error'}
                />

                <ToastForm
                    openSnackbar={openSnackbar}
                    handleSnackbarClose={handleSnackbarClose}
                    title={'Felicitation !'}
                    message={'Votre évènements est bien créé, il sera bientot validé !'}
                    severity={'success'}
                />

                <BasicPage title={title} icon={<BusinessIcon />} />

                <section className="container mx-auto relative sm:pt-6 md:pt-11 px-4 z-10">
                    <Link href={`/pro/establishment/${establishmentId}/event/list`}>
                        <Button
                            sx={{ marginRight: '10px', px: '10px', background: '#0f766e' }}
                            variant="contained"
                            color="info"
                            size="small"
                        >
                            Retour aux événements
                        </Button>
                    </Link>

                    <Loader allClass={'loading display'} />
                    <Box mt={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormSelect
                                    allCategories={allCategories}
                                    formikCategories={formikCategories}
                                    handleCategoryChange={handleCategoryChange}
                                    handleSubmit={formikCategories.handleSubmit}
                                    submitClass={'hidden'}
                                />
                                <form onSubmit={formikEvent.handleSubmit}>
                                    <FormEvent
                                        formik={formikEvent}
                                        setInputValues={setInputValues}
                                        setSelectedImage={setSelectedImage}
                                        establishmentId={establishmentId}
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <EventPhoneDemo
                                    selectedImage={selectedImage}
                                    inputValues={inputValues}
                                    startEventFormatted={startEventFormatted}
                                    startTimeFormatted={startTimeFormatted}
                                    endEventFormatted={endEventFormatted}
                                    endTimeFormatted={endTimeFormatted}
                                    establishmentName={establishmentName}
                                    establishmentAddress={establishmentAddress}
                                    establishmentPostalCode={establishmentPostalCode}
                                    categoriesSelected={categoriesSelected}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </section>
            </Paper>
        </>
    );
};

GlobalFormEvent.propTypes = {
    formikEvent: PropTypes.object,
    formikCategories: PropTypes.object,
    handleCategoryChange: PropTypes.func,
    handleSnackbarClose: PropTypes.func,
    openSnackbar: PropTypes.bool,
    openSnackbarCategoryError: PropTypes.bool,
    allCategories: PropTypes.array,
    categoriesSelected: PropTypes.array,
    setInputValues: PropTypes.func,
    setSelectedImage: PropTypes.func,
    establishmentId: PropTypes.number,
    selectedImage: PropTypes.string,
    inputValues: PropTypes.object,
    startEventFormatted: PropTypes.string,
    startTimeFormatted: PropTypes.string,
    endEventFormatted: PropTypes.string,
    endTimeFormatted: PropTypes.string,
    establishmentName: PropTypes.string,
    establishmentAddress: PropTypes.string,
    establishmentPostalCode: PropTypes.string,
    title: PropTypes.string,
};
