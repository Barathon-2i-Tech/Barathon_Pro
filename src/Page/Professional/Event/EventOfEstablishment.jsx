import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import '../../../css/Professional/Event.css';
import '../../../css/Professional/Establishment.css';
import Axios from '../../../utils/axiosUrl';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../Components/Hooks/useAuth';
import {
    DataGrid,
    frFR,
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
import HeaderDatagrid from '../../../Components/CommonComponents/DataGrid/HeaderDataGrid';
import Copyright from '../../../Components/CommonComponents/Copyright';
import { useParams, Link as RouterLink } from 'react-router-dom';

export default function EventOfEstablishmentPage() {
    const { user } = useAuth();
    const token = user.token;
    const ownerId = user.userLogged.owner_id;
    const { id } = useParams();
    const establishmentId = parseInt(id);

    //dataGRID
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        opening: false,
        siret: false,
        address: false,
        postal_code: false,
    });
    const [establishment, setEstablishment] = useState([]);
    const [establishmentName, setEstablishmentName] = useState('');

    const [allEvents, setAllEvents] = useState([]);
    const [reloading, setReloading] = useState(false);

    const RightAlignedContainer = styled(GridToolbarContainer)({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .right-align': {
            marginLeft: 'auto',
        },
    });

    function eventCustomToolbar() {
        return (
            <RightAlignedContainer>
                <div>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </div>
                <Link component={RouterLink} to={`/pro/establishment/event/${id}/create`}>
                    <Button
                        sx={{ marginRight: '10px', px: '40px' }}
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<AddIcon />}
                    >
                        Ajouter un évenement
                    </Button>
                </Link>
            </RightAlignedContainer>
        );
    }

    // ------------------------  ESTABLISHMENT ------------------------------------------
    // AXIOS GET
    // This function is used to get the establishment to update by his ID
    async function getEstablishment() {
        try {
            const response = await Axios.api.get(`/pro/${ownerId}/establishment/${id}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setEstablishment(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getEvents() {
        try {
            const response = await Axios.api.get(`/pro/events/${establishmentId}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllEvents(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEvent = (id) => {
        Axios.api
            .delete(`/pro/event/${id}`, {
                headers: {
                    accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setReloading(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function getStatus(params) {
        switch (params.row.status.code) {
            case 'EVENT_VALID':
                return 'Validé';

            case 'EVENT_REFUSE':
                return 'Refusé';

            case 'EVENT_PENDING':
                return 'En attente';

            default:
        }
        return 'Erreur';
    }

    const eventsRows = allEvents.map((event) => ({
        key: event.event_id,
        id: event.event_id,
        event_id: event.event_id,
        event_name: event.event_name,
        poster: event.poster,
        status: JSON.parse(event.comment),
        deleted_at: event.deleted_at,
    }));

    const eventColumns = [
        {
            field: 'poster', //'poster_url',
            headerName: 'Poster',
            flex: 0.1,
            headerAlign: 'center',
            minWidth: 90,
            align: 'center',
            renderCell: (params) => {
                return <img src={params.value} />;
            },
        },
        {
            field: 'event_name',
            headerName: 'Nom evenement',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
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
                    case 'EVENT_VALID':
                        backgroundColor = green[400];
                        break;
                    case 'EVENT_PENDING':
                        backgroundColor = orange[400];
                        break;
                    case 'EVENT_REFUSE':
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
                                params.row.status.code === 'EVENT_PENDING' ||
                                params.row.deleted_at !== null
                                    ? ''
                                    : `/pro/establishment/${establishmentId}/event/${params.row.event_id}/update`
                            }
                            component={
                                params.row.status.code === 'EVENT_PENDING' ||
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
                                    params.row.status.code === 'EVENT_PENDING' ||
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
                                deleteEvent(params.row.event_id);
                            }}
                            startIcon={<DeleteForeverIcon />}
                            disabled={
                                params.row.status.code === 'EVENT_PENDING' ||
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
        getEvents();
        getEstablishment();
        setReloading(false);
    }, [reloading]);

    useEffect(() => {
        const myEstablishmentName = establishment.map((is) => is.trade_name);
        setEstablishmentName(myEstablishmentName[0] || '');
    }, [establishment]);

    return (
        <>
            <Link component={RouterLink} to={`/pro/establishment/event`}>
                <Button
                    sx={{
                        marginRight: '10px',
                        marginBottom: '10px',
                        px: '10px',
                        background: '#0f766e',
                    }}
                    variant="contained"
                    color="info"
                    size="small"
                >
                    Retour aux établissements
                </Button>
            </Link>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    minHeight: '80vh',
                    width: '100%',
                }}
            >
                <HeaderDatagrid title={`Événements de ${establishmentName}`} />

                <DataGrid
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    rows={eventsRows}
                    columns={eventColumns}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                    density="comfortable"
                    components={{
                        Toolbar: eventCustomToolbar,
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
        </>
    );
}
