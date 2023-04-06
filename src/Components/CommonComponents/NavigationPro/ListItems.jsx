import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TagIcon from '@mui/icons-material/Tag';
import EmailIcon from '@mui/icons-material/Email';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GavelIcon from '@mui/icons-material/Gavel';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton href="/pro/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton href="/pro/profile">
            <ListItemIcon>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton href="/pro/establishment">
            <ListItemIcon>
                <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText primary="Etablissements" />
        </ListItemButton>
        <ListItemButton href="/pro/event">
            <ListItemIcon>
                <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary="Evenements" />
        </ListItemButton>
        <ListItemButton href="/pro/tag">
            <ListItemIcon>
                <TagIcon />
            </ListItemIcon>
            <ListItemText primary="Demander un Tag" />
        </ListItemButton>
        <ListItemButton href="/pro/employee">
            <ListItemIcon>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Mes employ&eacute;s" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />

        <ListItemButton href="/pro/notification">
            <ListItemIcon>
                <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
        </ListItemButton>
        <ListItemButton href="/pro/contact">
            <ListItemIcon>
                <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Nous Contacter" />
        </ListItemButton>
        <ListItemButton href="/pro/cgu">
            <ListItemIcon>
                <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="Conditions d'utilisation" />
        </ListItemButton>
    </React.Fragment>
);
