import './App.css';
import {Alert, Grid, Snackbar} from "@mui/material";
import Header from "./components/header/Header";
import Options from "./components/options/Options";
import Graph from "./components/graph/Graph";
import UniqueIdentifierDialog from "./components/uniqueIdentifierDialog/UniqueIdentifierDialog";
import MultivariateNormalDialog from "./components/multivariateNormalDialog/MultivariateNormalDialog";
import UniformDialog from "./components/uniformDialog/UniformDialog";
import BetaDialog from "./components/betaDialog/BetaDialog";
import CategoricalDialog from "./components/categoricalDialog/CategoricalDialog";
import CategoricalToNumericalDialog from "./components/categoricalToNumericalDialog/CategoricalToNumericalDialog";
import MulticollinearDialog from "./components/multicollinearDialog/MulticollinearDialog";
import PolynomialCategoricalDialog from "./components/polynomialCategoricalDialog/PolynomialCategoricalDialog";
import ResponseVectorDialog from "./components/responseVectorDialog/ResponseVectorDialog";
import CodeDialog from "./components/codeDialog/CodeDialog";
import {useSelector} from "react-redux";
import {HEADER_HEIGHT} from "./config";

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
                    <Grid container sx={{height: `calc(100vh - ${HEADER_HEIGHT}px)`}}>
                        <Grid item xs={12} md={3} sx={{
                            padding: '16px 28px',
                            height: '100%',
                            overflowY: 'scroll'
                        }}>
                            <Options/>
                        </Grid>
                        <Grid item xs={12} md={9} sx={{
                            height: '100%',
                            overflowY: 'scroll',
                        }}>
                            <Graph/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={alertOpen} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity={alertType}>{alertText}</Alert>
            </Snackbar>
            <UniqueIdentifierDialog/>
            <MultivariateNormalDialog/>
            <UniformDialog/>
            <BetaDialog/>
            <CategoricalDialog/>
            <CategoricalToNumericalDialog/>
            <MulticollinearDialog/>
            <PolynomialCategoricalDialog/>
            <ResponseVectorDialog/>
            <CodeDialog/>
        </div>
    );
}

export default App;
