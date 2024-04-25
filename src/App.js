
import './App.css';
// import axios from 'axios';
import React from 'react'
import Sidenav from "./pages/SideNav"
import Dashboard from './pages/home/dashboard';
import OverViewScore from './pages/reports/overViewScore';
import ResponseUploader from './pages/reports/responseUploader';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';


import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function App() {


  // const listItems = axios({
  //   method: 'get',
  //   url: 'http://172.21.0.174:7001/csmst/CSM/GetWSVersion'
  //   })
  //   .then(function (response) {
  //     console.log(response.data)

  //   })


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <BrowserRouter>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/overviewscores"  element={ <OverViewScore/> } />
            <Route exact path="/response_uploaders"  element={ <ResponseUploader/> } />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
