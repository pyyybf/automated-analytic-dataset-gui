import './App.css';
import {Grid} from "@mui/material";
import Header from "./components/header/Header";
import Options from "./components/options/Options";
import Graph from "./components/graph/Graph";

function App() {
    return (
        <div className="App">
            <Header/>
            <Grid container>
                <Grid item xs={12} md={3} sx={{
                    borderRight: '1px lightgray solid',
                    height: 'calc(100vh - 60px)',
                    paddingY: '16px'
                }}>
                    <Options/>
                </Grid>
                <Grid item xs={12} md={9} sx={{
                    height: 'calc(100vh - 60px)',
                    paddingY: '16px'
                }}>
                    <Graph/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
