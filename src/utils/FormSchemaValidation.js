import * as yup from 'yup';

export const EstablishmentSchemaOpening = () => {
    return yup.object().shape({
        lundi: yup.string().required('Veuillez mettre un horaire'),
        mardi: yup.string().required('Veuillez mettre un horaire'),
        mercredi: yup.string().required('Veuillez mettre un horaire'),
        jeudi: yup.string().required('Veuillez mettre un horaire'),
        vendredi: yup.string().required('Veuillez mettre un horaire'),
        samedi: yup.string().required('Veuillez mettre un horaire'),
        dimanche: yup.string().required('Veuillez mettre un horaire'),
    });
};

export const establishmentSchema = () => {
    return yup.object().shape({
        trade_name: yup.string().required('Veuillez remplir le nom de votre établissement'),
        siret: yup
            .string()
            .required('Ajoutez votre siret')
            .matches(/^[0-9]{14}$/, 'Le siret doit comporter exactement 14 chiffres')
            .test(
                'is-siret-valid',
                'Le siret doit comporter exactement 14 chiffres',
                (val) => val && val.length === 14,
            ),
        address: yup.string().required('Ajoutez votre adresse'),
        city: yup.string().required('Ajoutez votre ville'),
        postal_code: yup
            .string()
            .required('Ajoutez votre code postal')
            .length(5, 'Le code postal doit comporter exactement 5 chiffres'),
        logo: yup.mixed().required('Ajoutez un logo'),
        phone: yup
            .string()
            .required('Téléphone est requis')
            .matches(
                /^\+?\d{1,3}[-.\s]?\d{1,14}[-.\s]?\d{1,14}$/,
                'Veuillez entrer un numéro de téléphone valide',
            ),
        email: yup.string().email('Veuillez entrer une adresse email valide'),
        website: yup.string(),
    });
};

export const selectCategoriesSchema = () => {
    return yup.object().shape({});
};
