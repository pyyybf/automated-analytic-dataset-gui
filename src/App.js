import './App.css';
import {Alert, Grid, Snackbar} from "@mui/material";
import Header from "./components/header/Header";
import Options from "./components/options/Options";
import Graph from "./components/graph/Graph";
import UniqueIdentifierDialog from "./components/uniqueIdentifierDialog/UniqueIdentifierDialog";
import MultivariateNormalDialog from "./components/multivariateNormalDialog/MultivariateNormalDialog";
import UniformDialog from "./components/uniformDialog/UniformDialog";
import CategoricalDialog from "./components/categoricalDialog/CategoricalDialog";
import CategoricalToNumericalDialog from "./components/categoricalToNumericalDialog/CategoricalToNumericalDialog";
import MulticollinearDialog from "./components/multicollinearDialog/MulticollinearDialog";
import ResponseVectorDialog from "./components/responseVectorDialog/ResponseVectorDialog";
import CodeDialog from "./components/codeDialog/CodeDialog";
import {useSelector} from "react-redux";

function App() {
    const alertOpen = useSelector(state => state.generator.alertOpen);
    const alertText = useSelector(state => state.generator.alertText);
    const alertType = useSelector(state => state.generator.alertType);

    return (
        <div className="App">
            <Header/>
            <Grid container sx={{height: 'calc(100vh - 61px)'}}>
                <Grid item xs={12} md={3} sx={{
                    borderRight: '1px lightgray solid',
                    paddingY: '16px',
                    height: '100%',
                    overflowY: 'scroll'
                }}>
                    <Options/>
                </Grid>
                <Grid item xs={12} md={9} sx={{
                    paddingY: '16px',
                    height: '100%',
                    overflowY: 'scroll'
                }}>
                    <Graph/>
                </Grid>
            </Grid>
            <Snackbar open={alertOpen} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity={alertType}>{alertText}</Alert>
            </Snackbar>
            <UniqueIdentifierDialog/>
            <MultivariateNormalDialog/>
            <UniformDialog/>
            <CategoricalDialog/>
            <CategoricalToNumericalDialog/>
            <MulticollinearDialog/>
            <ResponseVectorDialog/>
            <CodeDialog/>
        </div>
    );
}

export default App;
