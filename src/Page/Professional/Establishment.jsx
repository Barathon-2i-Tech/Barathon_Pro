import { BasicPage } from '../../Components/CommonComponents/BasicPage';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import '../../css/Professional/Establishment.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Components/Hooks/useAuth';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { green, red, orange, grey } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from '@mui/material/Link';

export default function EstablishmentPage() {
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;

    //dataGRID
    const [allEstablishments, setAllEstablishments] = useState([]);
    const [reloading, setReloading] = useState(false);

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
        console.log(id);
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
                setReloading(true);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log('suppression');
    };

    function getRowClassName(params) {
        if (params.row.deleted_at !== null) {
            return 'hidden-row';
        }
        return '';
    }

    function getStatus(params) {
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
        establishment_id: establishment.establishment_id,
        trade_name: establishment.trade_name,
        siret: establishment.siret,
        logo: establishment.logo,
        phone: establishment.phone,
        address: establishment.address,
        postal_code: establishment.postal_code,
        website: establishment.website,
        email: establishment.email,
        status: JSON.parse(establishment.comment),
        deleted_at: establishment.deleted_at,
    }));

    const establishmentColumns = [
        {
            field: 'logo',
            headerName: 'Logo',
            flex: 0.1,
            headerAlign: 'center',
            minWidth: 150,
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
            flex: 0.2,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'website',
            headerName: 'Site web',
            flex: 0.2,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'phone',
            headerName: 'Téléphone',
            flex: 0.2,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.2,
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
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
            minWidth: 430,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            href={
                                params.row.status.code === 'ESTABL_PENDING' ||
                                params.row.deleted_at !== null
                                    ? ''
                                    : `/pro/establishmentForm/${params.row.establishment_id}`
                            }
                            component={
                                params.row.status.code === 'ESTABL_PENDING' ||
                                params.row.deleted_at !== null
                                    ? Box
                                    : 'a'
                            }
                        >
                            <Button
                                sx={{ marginRight: '10px', px: '40px' }}
                                variant="contained"
                                color="info"
                                size="small"
                                startIcon={<EditIcon />}
                                disabled={
                                    params.row.status.code === 'ESTABL_PENDING' ||
                                    params.row.deleted_at !== null
                                }
                            >
                                Modifier
                            </Button>
                        </Link>
                        <Button
                            sx={{ marginRight: '10px', px: '40px' }}
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => {
                                deleteEstablishment(params.row.establishment_id);
                            }}
                            startIcon={<DeleteForeverIcon />}
                            disabled={
                                params.row.status.code === 'ESTABL_PENDING' ||
                                params.row.deleted_at !== null
                            }
                        >
                            Supprimer
                        </Button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        getEstablishments();
        setReloading(false);
    }, [reloading]);

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
                sx={{ marginY: 6, marginX: 2 }}
                getRowClassName={getRowClassName}
            />

            <div className="flex justify-center pb-4">
                <button className="custom-button-teal">
                    <a href={`/pro/${ownerId}/establishment/create`}>Ajouter un etablissement</a>
                </button>
            </div>
        </Paper>
    );
}
