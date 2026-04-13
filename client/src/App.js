import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Carlist from "./components/Carlist";
import Cars from "./components/Cars";
// import Login from './components/Login';

function App() {
  return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              CarList
            </Typography>
          </Toolbar>
        </AppBar>
          <Cars />
        {/*<Login />*/}
      </div>
  );
}

export default App;
