import PropTypes from 'prop-types';
import { Box, Grid, Paper, Button } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import Link from '@mui/material/Link';
import { ToastForm } from '../Toast/ToastForm';
import { BasicPage } from '../BasicPage';
import { FormSelect } from './FormSelect';
import { FormEvent } from './FormEvent';
import { EventPhoneDemo } from '../PhoneDemo/EventPhoneDemo';

export const GlobalFormEvent = ({
    formikEvent,
    formikCategories,
    handleCategoryChange,
    handleFormReset,
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
                    message={'Vous avez droit à 4 categories maximum'}
                    severity={'error'}
                />

                <ToastForm
                    openSnackbar={openSnackbar}
                    handleSnackbarClose={handleSnackbarClose}
                    title={'Felicitation !'}
                    message={'Bien envoyez'}
                    severity={'success'}
                />

                <BasicPage title="Creer mon évènement" icon={<BusinessIcon />} />

                <section className="container mx-auto relative sm:pt-6 md:pt-11 px-4 z-10">
                    <Link href={`/pro/establishment/${establishmentId}/event/list`}>
                        <Button
                            sx={{ marginRight: '10px', px: '10px' }}
                            variant="contained"
                            color="info"
                            size="small"
                        >
                            Retour aux événements
                        </Button>
                    </Link>

                    <FormSelect
                        allCategories={allCategories}
                        formikCategories={formikCategories}
                        handleCategoryChange={handleCategoryChange}
                        categoriesSelected={categoriesSelected}
                        handleFormReset={handleFormReset}
                        handleSubmit={formikCategories.handleSubmit}
                    />

                    <Box mt={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
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
    handleFormReset: PropTypes.func,
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
};
