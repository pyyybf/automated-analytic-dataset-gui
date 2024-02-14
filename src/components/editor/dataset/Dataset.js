import React from "react";
import {Button, Grid} from "@mui/material";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {HEADER_HEIGHT} from "@/config";
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