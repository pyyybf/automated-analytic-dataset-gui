import './App.css';
import {Alert, Grid, Snackbar} from "@mui/material";
import Header from "./components/header/Header";
import {HEADER_HEIGHT} from "./config";
import Editor from "@/components/editor/Editor";
import {
    Routes,
    Route,
} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import Home from "@/components/home/Home";
import Dashboard from "@/components/dashboard/Dashboard";

function App() {
    const alertOpen = useSelector(state => state.generator.alertOpen);
    const alertText = useSelector(state => state.generator.alertText);
    const alertType = useSelector(state => state.generator.alertType);

    return (
        <div className="App">
            <Grid container sx={{height: '100vh', position: 'fixed'}}>
                <Grid item xs={12}
                      sx={{
                          height: `${HEADER_HEIGHT}px`,
                          width: '100%',
                          paddingX: '12px',
                          borderBottom: '1px #eeeeee solid',
                      }}>
                    <Header/>
                </Grid>
                <Grid item xs={12}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/editor" element={<Editor/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Routes>
                </Grid>
            </Grid>
            <Snackbar open={alertOpen} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity={alertType}>{alertText}</Alert>
            </Snackbar>
        </div>
    );
}

export default App;
