import * as yup from 'yup';

export const EstablishmentSchemaOpening = () => {
    return yup.object().shape({
        lundi: yup.string().required('obligatoire'),
        mardi: yup.string().required('obligatoire'),
        mercredi: yup.string().required('obligatoire'),
        jeudi: yup.string().required('obligatoire'),
        vendredi: yup.string().required('obligatoire'),
        samedi: yup.string().required('obligatoire'),
        dimanche: yup.string().required('obligatoire'),
    });
};

export const establishmentSchema = () => {
    return yup.object().shape({
        trade_name: yup.string().required('obligatoire'),
        siret: yup
            .string()
            .required('obligatoire')
            .matches(/^[0-9]{14}$/, 'Le siret doit comporter exactement 14 chiffres')
            .test(
                'is-siret-valid',
                'Le siret doit comporter exactement 14 chiffres',
                (val) => val && val.length === 14,
            ),
        address: yup.string().required('obligatoire'),
        city: yup.string().required('obligatoire'),
        postal_code: yup.string().required('obligatoire'),
        logo: yup.mixed().required('logo is required'),
        phone: yup.string().required('Téléphone is required'),
        email: yup.string(),
        website: yup.string(),
    });
};

export const selectCategoriesSchema = () => {
    return yup.object().shape({
        // establishment_id: yup.number().required('obligatoire'),
        // category_id: yup.number().required('obligatoire'),
    });
};
