import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonLink } from '../../Components/CommonComponents/ButtonLink';
import { ButtonDelete } from '../../Components/CommonComponents/ButtonDelete';
import '../../css/Professional/Establishment.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Components/Hooks/useAuth';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Schedule';
import { Box } from '@mui/material';
import { green, red, orange, grey } from '@mui/material/colors';

export default function EstablishmentPage() {
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;

    //dataGRID
    const [allEstablishments, setAllEstablishments] = useState([]);

    async function getEstablishments() {
        try {
            const response = await Axios.api.get(`/pro/${ownerId}/establishment`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
            setAllEstablishments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEstablishment = (id) => {
        Axios.api
            .delete(`/pro/${ownerId}/establishment/${id}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                console.log('bien effacé');
                getEstablishments();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const statusInfo = {
        4: {
            bgColor: 'bg-lime-500',
            icon: <CheckCircleIcon sx={{ marginX: 1 }} />,
            label: 'Valider',
        },
        5: {
            bgColor: 'bg-red-900',
            icon: <CancelIcon sx={{ marginX: 1 }} />,
            label: 'Refuser',
        },
        6: {
            bgColor: 'bg-amber-500',
            icon: <PendingIcon sx={{ marginX: 1 }} />,
            label: 'En attente',
        },
    };

    const getStatusElement = (params, status_id) => {
        const status = statusInfo[status_id];
        if (!status) {
            return <div>Erreur</div>;
        }

        return (
            <div className={`text-white p-0 ${status.bgColor}`}>
                {status.icon}
                <span className="pl-2">{status.label}</span>
            </div>
        );
    };

    function getStatus(params) {
        // console.log(params.row.status)
        switch (params.row.status.code) {
            case 'ESTABL_VALID':
                return 'Validé';

            case 'ESTABL_REFUSE':
                return 'Refusé';

            case 'ESTABL_PENDING':
                return 'En attente';

            default:
        }

        return 'Erreur';
    }

    const establishmentsRows = allEstablishments.map((establishment) => ({
        key: establishment.establishment_id,
        id: establishment.establishment_id,
        trade_name: establishment.trade_name,
        siret: establishment.siret,
        logo: establishment.logo,
        phone: establishment.phone,
        website: establishment.website,
        email: establishment.email,
        status: JSON.parse(establishment.comment),
        deleted_at: establishment.deleted_at,
    }));

    const establishmentColumns = [
        { field: 'id', headerName: 'ID', flex: 0.1, headerAlign: 'center', align: 'center' },
        {
            field: 'logo',
            headerName: 'Logo',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <img src={params.value} />,
        },
        {
            field: 'trade_name',
            headerName: 'Nom commercial',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'address',
            headerName: 'Adresse',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'postal_code',
            headerName: 'Code postal',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'website',
            headerName: 'Site web',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'phone',
            headerName: 'Téléphone',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.3,
            headerAlign: 'center',
            align: 'center',
            valueGetter: getStatus,
            renderCell: ({ row: { status } }) => {
                let backgroundColor = null;
                switch (status.code) {
                    case 'ESTABL_VALID':
                        backgroundColor = green[400];
                        break;
                    case 'ESTABL_PENDING':
                        backgroundColor = orange[400];
                        break;
                    case 'ESTABL_REFUSE':
                        backgroundColor = red[400];
                        break;
                    default:
                        backgroundColor = grey[400];
                        break;
                }
                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={backgroundColor}
                        borderRadius="5px"
                    >
                        {getStatus({ row: { status } })}
                    </Box>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                if (params.row.status_id === 4) {
                    return (
                        <>
                            <ButtonLink
                                link={`/pro/establishmentForm/${params.row.establishment_id}`}
                                allClass="text-center flex align-center justify-center flex-wrap w-full h-full text-white bg-teal-700"
                                text="Modifier"
                                icon={<EditIcon />}
                            />
                            <ButtonDelete
                                functionDelete={() =>
                                    deleteEstablishment(params.row.establishment_id)
                                }
                                allClass="text-white bg-red-700 w-full h-full rounded-none"
                            />
                        </>
                    );
                } else if (params.row.status_id === 5 || params.row.status_id === 6) {
                    return getStatusElement(params, params.row.status_id);
                } else {
                    return <div>Erreur</div>;
                }
            },
        },
    ];

    useEffect(() => {
        getEstablishments();
    }, []);

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: '80vh',
                width: '100%',
            }}
        >
            <BasicPage title="Tous mes etablissements" icon={<BusinessIcon />} />
            <DataGrid
                rows={establishmentsRows}
                columns={establishmentColumns}
                components={{
                    Toolbar: GridToolbar,
                }}
                /* autoHeight
        disableSelectionOnClick
        disableColumnFilter={false}
        onFilterModelChange={(model) => console.log(model)}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}*/
                sx={{ marginY: 6, marginX: 2 }}
            />
            <div className="flex justify-center pb-4">
                <button className="custom-button-teal">
                    <a href={`/pro/${ownerId}/establishment/create`}>Ajouter un etablissement</a>
                </button>
            </div>
        </Paper>
    );
}
