import React from "react";
import {Button, Grid} from "@mui/material";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {HEADER_HEIGHT} from "@/config";
import Options from "./components/options/Options";
import Graph from "./components/graph/Graph";
import UniqueIdentifierDialog from "./components/dialogs/uniqueIdentifierDialog/UniqueIdentifierDialog";
import MultivariateNormalDialog from "./components/dialogs/multivariateNormalDialog/MultivariateNormalDialog";
import UniformDialog from "./components/dialogs/uniformDialog/UniformDialog";
import BetaDialog from "./components/dialogs/betaDialog/BetaDialog";
import CategoricalDialog from "./components/dialogs/categoricalDialog/CategoricalDialog";
import CategoricalToNumericalDialog from "./components/dialogs/categoricalToNumericalDialog/CategoricalToNumericalDialog";
import MulticollinearDialog from "./components/dialogs/multicollinearDialog/MulticollinearDialog";
import PolynomialCategoricalDialog from "./components/dialogs/polynomialCategoricalDialog/PolynomialCategoricalDialog";
import ResponseVectorDialog from "./components/dialogs/responseVectorDialog/ResponseVectorDialog";
import CodeDialog from "./components/dialogs/codeDialog/CodeDialog";
import {useNavigate} from "react-router-dom";

export default function Dataset() {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Grid container sx={{height: `calc(100vh - ${HEADER_HEIGHT}px)`}}>
                <Grid item xs={12} md={3} sx={{
                    padding: '16px 28px',
                    height: '100%',
                    overflowY: 'scroll',
                    textAlign: 'left'
                }}>
                    <Button startIcon={<ArrowBackOutlinedIcon/>}
                            sx={{paddingX: '18px'}}
                            onClick={() => {
                                navigate('/editor');
                            }}>
                        Back to Questions
                    </Button>
                    <Options/>
                </Grid>
                <Grid item xs={12} md={9} sx={{
                    height: '100%',
                    overflowY: 'scroll',
                }}>
                    <Graph/>
                </Grid>
            </Grid>
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
        </React.Fragment>
    );
}