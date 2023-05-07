import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GroupIcon from '@mui/icons-material/Group';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TagIcon from '@mui/icons-material/Tag';
import EmailIcon from '@mui/icons-material/Email';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GavelIcon from '@mui/icons-material/Gavel';
import { GridItem } from '../../Components/CommonComponents/DashboardItems/GridItem';

export default function DashboardPage() {
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',

                height: '100%',
                alignItems: 'center',
                boxSizing: 'border-box',
                paddingBottom: '5%',
                paddingTop: '5%',
            }}
        >
            <div className="flex">
                <Grid
                    container
                    spacing={{ xs: 1, md: 2 }}
                    sx={{
                        flexGrow: 1,
                        maxWidth: '700px',
                        alignItems: 'center',
                        margin: 'auto',
                        boxSizing: 'border-box',
                    }}
                >
                    <Grid item xs={6} sm={4} md={4}>
                        <GridItem
                            href="/pro/profile"
                            icon={<GroupIcon sx={{ color: 'teal.700', fontSize: '2rem' }} />}
                            label="Profile"
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <GridItem
                            href="/pro/establishment"
                            icon={<HomeWorkIcon sx={{ color: 'teal.700', fontSize: '2rem' }} />}
                            label="Etablissements"
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <GridItem
                            href="/pro/establishment/event"
                            icon={
                                <ConfirmationNumberIcon
                                    sx={{ color: 'teal.700', fontSize: '2rem' }}
                                />
                            }
                            label="Evenements"
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <GridItem
                            href="/pro/category"
                            icon={<TagIcon sx={{ color: 'teal.700', fontSize: '2rem' }} />}
                            label="Demander une catégorie"
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <GridItem
                            disabled={true}
                            href=""
                            icon={<GroupIcon sx={{ color: 'grey', fontSize: '2rem' }} />}
                            label="Employé"
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <GridItem
                            disabled={true}
                            href=""
                            icon={
                                <PermContactCalendarIcon sx={{ color: 'grey', fontSize: '2rem' }} />
                            }
                            label="Notification"
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <GridItem
                            disabled={true}
                            href=""
                            icon={<EmailIcon sx={{ color: 'grey', fontSize: '2rem' }} />}
                            label="Nous contacter"
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <GridItem
                            disabled={true}
                            href=""
                            icon={<GavelIcon sx={{ color: 'grey' }} />}
                            label="Conditions d'utilisations"
                        />
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
}
