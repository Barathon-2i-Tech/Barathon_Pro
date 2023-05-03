import { Button, Grid, Paper } from '@mui/material';
import { useAuth } from '../../../Components/Hooks/useAuth';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import HeaderDatagrid from '../../../Components/CommonComponents/DataGrid/HeaderDataGrid';
import Axios from '../../../utils/axiosUrl';

function CategoryPage() {
    const { user } = useAuth();
    const apiToken = user.token;
    const userId = user.userLogged.user_id;

    async function handleSubmit(values) {
        try {
            await Axios.api.post(`category/mail/new/${userId}/`, values, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${apiToken}`,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    const validationSchema = Yup.object({
        category_name: Yup.string().required('Le nom de la catégorie est obligatoire'),
        category_visibility: Yup.string().required('Requis'),
    });

    const formik = useFormik({
        initialValues: {
            category_name: '',
            category_visibility: '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => handleSubmit(values),
    });

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '80vh',
                width: '100%',
                padding: '1rem',
            }}
        >
            <HeaderDatagrid title={"Demande de création d'une catégorie"} />
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    spacing={2}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Grid item xs={6}>
                        <TextField
                            id="category_name"
                            name="category_name"
                            label="Nom de la catégorie"
                            value={formik.values.category_name}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.category_name && Boolean(formik.errors.category_name)
                            }
                            helperText={formik.touched.category_name && formik.errors.category_name}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl required fullWidth>
                            <InputLabel id="category_visibility">Sous-catégorie</InputLabel>
                            <Select
                                labelId="category_visibility"
                                id="category_visibility"
                                name="category_visibility"
                                value={formik.values.category_visibility}
                                label="Sous-catégorie"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={'All'}>Etablissement et événement</MenuItem>
                                <MenuItem value={'Establishment'}>Etablissement</MenuItem>
                                <MenuItem value={'Event'}>Evénement</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" type="submit">
                            Demander
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default CategoryPage;
