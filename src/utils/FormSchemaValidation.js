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
    return yup.object().shape({
        options: yup
            .array()
            .min(1, 'Veuillez sélectionner au moins une catégorie')
            .required('Veuillez sélectionner une catégorie'),
    });
};

export const eventSchema = () => {
    return yup.object().shape({
        poster: yup.mixed().required('Ajoutez une image'),
        event_name: yup.string().required("Veuillez renseigner le nom de l'évènement"),
        description: yup.string().required('Veuillez mettre une description votre évènement'),
        capacity: yup
            .number()
            .typeError('Vous devez renseigner un chiffre et non des lettres')
            .required('Veuillez renseigner la capacité de votre évènement'),
        price: yup
            .number()
            .typeError('Vous devez renseigner un chiffre et non des lettres')
            .required('Veuillez renseigner le prix'),
        start_event: yup
            .date()
            .min(new Date(), "La date de début de l'évènement ne peut pas être dans le passé")
            .required("Veuillez renseigner la date de début de l'évènement"),
        end_event: yup
            .date()
            .min(
                yup.ref('start_event'),
                "La date de fin de l'évènement ne peut pas être antérieure à la date de début de l'évènement",
            )
            .required("Veuillez renseigner la date de fin de l'évènement"),
    });
};
export const profileSchema = () => {
    return yup.object().shape({
        avatar: yup.mixed().required('Ajoutez une image'),
        last_name: yup.string().required('Nom obligatoire'),
        first_name: yup.string().required('Prénom obligatoire'),
        email: yup.string().email('Veuillez entrer une adresse email valide'),
        // phone: yup
        //     .string()
        //     .required('Téléphone est requis')
        //     .matches(
        //         /^\+?\d{1,3}[-.\s]?\d{1,14}[-.\s]?\d{1,14}$/,
        //         'Veuillez entrer un numéro de téléphone valide',
        //     )
    });
};

export const newPasswordSchema = () => {
    return yup.object().shape({
        password: yup
            .string()
            .min(8, 'Minimum 8 characteres pour votre nouveau mot de passe')
            .required('obligatoire'),
        password_confirmation: yup
            .string()
            .min(8, 'Minimum 8 characteres pour votre nouveau mot de passe')
            .required('obligatoire')
            .oneOf([yup.ref('password'), null], 'Les mots de passe doivent etre identiques'),
    });
};
