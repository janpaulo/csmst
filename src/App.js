
import './App.css';
// import axios from 'axios';
import React from 'react'
import Sidenav from "./pages/SideNav"
import Dashboard from './pages/home/dashboard';
import OverViewScore from './pages/reports/overViewScore';
import ClientSexProfile from './pages/reports/clientSexProfile';
import ClientAgeProfile from './pages/reports/clientAgeProfile';
import ResponseUploader from './pages/reports/responseUploader';
import OfficeResponse from './pages/reports/officeResponse';
import CcResponse from './pages/reports/ccResponse';
import SqdSummary from './pages/reports/sqdSummary';
import SqdSummary1 from './pages/reports/sqdSummary';




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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <BrowserRouter>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/overviewscore"  element={ <OverViewScore/> } />
            <Route exact path="/response_uploaders"  element={ <ResponseUploader/> } />
            <Route exact path="/age_reports"  element={ <ClientAgeProfile/> } />
            <Route exact path="/sex_reports"  element={ <ClientSexProfile/> } />
            <Route exact path="/client_type_reports"  element={ <ClientSexProfile/> } />
            <Route exact path="/office_reponses"  element={ <OfficeResponse/> } />
            <Route exact path="/cc_reponses"  element={ <CcResponse/> } />
            <Route path="sqd">
                <Route exact index={true} path=":sqd_0_summary"  element={ <SqdSummary titles={"SQD 0 Summary Rating "} /> } />
            </Route>
            <Route exact index={false} path=":sqd_1_8_summary"  element={ <SqdSummary1 titles={"SQD 1 -8 Summary Rating "} /> }  />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
