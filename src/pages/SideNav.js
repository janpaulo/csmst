import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import Tooltip from '@mui/material/Tooltip';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import ScoreboardRoundedIcon from '@mui/icons-material/ScoreboardRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import SensorOccupiedRoundedIcon from '@mui/icons-material/SensorOccupiedRounded';
import GroupRemoveRoundedIcon from '@mui/icons-material/GroupRemoveRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import ReduceCapacityRoundedIcon from '@mui/icons-material/ReduceCapacityRounded';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const navItem = [
    {name: "Dashboard", icon: <HomeTwoToneIcon/>, path: '',}, 
    {name: "Response Uploader", icon: <BackupRoundedIcon/>, path: 'response_uploaders',}, 
    {name: "Overview Score", icon: <ScoreboardRoundedIcon/>, path: '',}, 
    {name: "Office Services And Response Rate", icon: <BusinessRoundedIcon/>, path: '',}, 
    {name: "Zero-Client Services", icon: <SensorOccupiedRoundedIcon/>, path: '',}, 
    {name: "Client Age Profile (Demographic)", icon: <GroupRemoveRoundedIcon/>, path: 'age_reports',}, 
    {name: "Client Sex Profile (Demographic)", icon: <WcRoundedIcon/>, path: 'sex_reports',}, 
    {name: "Office Response Demographic", icon: <QrCodeScannerRoundedIcon/>, path: 'office_reponses',}, 
    {name: "CC Response", icon: <QrCodeRoundedIcon/>, path: 'cc_reponses',}, 
    {name: "SQD 0 Summary Rating", icon: <SummarizeRoundedIcon/>, path: 'sqd/sqd_0_summary',}, 
    {name: "SQD 1-8 Summary Rating", icon: <SummarizeRoundedIcon/>, path: 'sqd_1_8_summary',}, 
    {name: "Overall Summary Score per Service Availed", icon: <CreditScoreRoundedIcon/>, path: '',}, 
    {name: "List of Offices", icon: <ListAltRoundedIcon/>, path: '',}, 
    {name: "Client Satisfaction Measurement Results Per Office", icon: <ReduceCapacityRoundedIcon/>, path: '',}, 
    // {name: "eSOA", icon: <AddToQueueOutlinedIcon/>, path: 'esoa_table_list',},
  ];
  

  

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Client Satisfactory Measurement Survey Tool
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          CSMST
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItem.map((text, index) => (
             <ListItem key={index} component={Link} to={"/" + text.path} disablePadding >  
            {/* <ListItem key={text} disablePadding sx={{ display: 'block' }}> */}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  
                <Tooltip title={text.name} placement="right">
                
                {text.icon}
                </Tooltip>
                </ListItemIcon>
                <ListItemText style={{ whiteSpace: !open ? "":"pre-wrap" }} primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
    </Box>
  );
}