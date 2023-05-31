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
import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/pro/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pro/profile">
            <ListItemIcon>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pro/establishment">
            <ListItemIcon>
                <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText primary="Etablissements" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pro/establishment/event">
            <ListItemIcon>
                <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary="Evenements" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pro/category">
            <ListItemIcon>
                <TagIcon />
            </ListItemIcon>
            <ListItemText primary="Demander une catégorie" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pro/employee" disabled sx={{ color: 'grey' }}>
            <ListItemIcon>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Mes employ&eacute;s" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />

        <ListItemButton component={Link} to="/pro/notification" disabled sx={{ color: 'grey' }}>
            <ListItemIcon>
                <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pro/contact" disabled sx={{ color: 'grey' }}>
            <ListItemIcon>
                <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Nous Contacter" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pro/cgu" disabled sx={{ color: 'grey' }}>
            <ListItemIcon>
                <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="Conditions d'utilisation" />
        </ListItemButton>
    </React.Fragment>
);
