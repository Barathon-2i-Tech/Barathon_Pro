import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import '../../css/Professional/Establishment.css';
import Axios from '../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Components/Hooks/useAuth';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { green, red, orange, grey } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import HeaderDatagrid from '../../Components/CommonComponents/DataGrid/HeaderDataGrid';
import Copyright from '../../Components/CommonComponents/Copyright';
import { Link as RouterLink } from 'react-router-dom';

export default function EstablishmentPage() {
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;

    //dataGRID
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        opening: false,
        siret: false,
        address: false,
        postal_code: false,
    });

    const [allEstablishments, setAllEstablishments] = useState([]);
    const [reloading, setReloading] = useState(false);

    const RightAlignedContainer = styled(GridToolbarContainer)({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .right-align': {
            marginLeft: 'auto',
        },
    });

    function establishmentCustomToolbar() {
        return (
            <RightAlignedContainer>
                <div>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </div>
                <Link component={RouterLink} to={`/pro/${ownerId}/establishment/create`}>
                    <Button
                        sx={{ marginRight: '10px', px: '40px' }}
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<AddIcon />}
                    >
                        Ajouter un etablissement
                    </Button>
                </Link>
            </RightAlignedContainer>
        );
    }

    async function getEstablishments() {
        try {
            const response = await Axios.api.get(`/pro/${ownerId}/establishment`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllEstablishments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEstablishment = async (id) => {
        try {
            await Axios.api.delete(`/pro/establishment/${id}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setReloading(true);
        } catch (error) {
            console.log(error);
        }
    };

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
        opening: JSON.parse(establishment.opening),
        validation_code: establishment.validation_code,
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
            minWidth: 90,
            align: 'center',
            renderCell: (params) => {
                return <img src={params.value} />;
            },
        },
        {
            field: 'trade_name',
            headerName: 'Nom commercial',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'validation_code',
            headerName: 'Code',
            flex: 0.2,
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
            field: 'siret',
            headerName: 'Siret',
            flex: 0.3,
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
            flex: 0.3,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'opening',
            headerName: 'Horaires',
            flex: 0.4,
            minWidth: 200,
            headerAlign: 'center',
            align: 'left',
            renderCell: ({ row: { opening } }) => {
                return (
                    <div className="pt-4 pb-4">
                        {Object.entries(opening).map(([day, hours]) => (
                            <div className="flex" key={day}>
                                <div>{day} : </div>
                                <div>{hours}</div>
                            </div>
                        ))}
                    </div>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.2,
            headerAlign: 'center',
            align: 'center',
            minWidth: 90,
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
            minWidth: 400,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={
                                params.row.status.code === 'ESTABL_PENDING' ||
                                params.row.deleted_at !== null
                                    ? ''
                                    : `/pro/establishmentForm/${params.row.establishment_id}`
                            }
                            component={
                                params.row.status.code === 'ESTABL_PENDING' ||
                                params.row.deleted_at !== null
                                    ? Box
                                    : RouterLink
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
            <HeaderDatagrid title={'Tous mes etablissements'} />
            <DataGrid
                rows={establishmentsRows}
                columns={establishmentColumns}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                density="comfortable"
                components={{
                    Toolbar: establishmentCustomToolbar,
                }}
                sx={{
                    marginX: 2,
                    '& .MuiDataGrid-cell': {
                        padding: '10px',
                    },
                }}
                getRowHeight={() => 'auto'}
            />
            <Copyright sx={{ pt: 4, pb: 4 }} />
        </Paper>
    );
}
