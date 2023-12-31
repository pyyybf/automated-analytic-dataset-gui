import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addMulticollinear, setShowMultiCollinearDialog} from "@/store/generator/generator.action";
import {setAlert} from "@/store/web/web.action";
import {FIELD_TYPE_LIST, NUMERIC_TYPE_LIST} from "@/utils/codeGenerator";
import React, {useState} from "react";
import {ALERT_DURATION} from "@/config";

export default function MulticollinearDialog() {
    const dispatch = useDispatch();
    const showMulticollinearDialog = useSelector(state => state.generator.showMulticollinearDialog);
    const numericalFieldList = useSelector(state => state.generator.fieldList.filter(field => NUMERIC_TYPE_LIST.includes(field.type)));

    const [predictorName, setPredictorName] = useState('');
    const [intercept, setIntercept] = useState(0);
    const [predictorList, setPredictorList] = useState({});
    const [epsilonVariance, setEpsilonVariance] = useState(0);

    const handleCloseDialog = () => {
        dispatch(setShowMultiCollinearDialog(false));
    };
    const initDialog = () => {
        setPredictorName('');
        setPredictorList({});
        setIntercept(0);
        setEpsilonVariance(0);
    };
    const handleSubmit = () => {
        // validate
        if (predictorName === '') {
            dispatch(setAlert(true, 'The name can\'t be empty!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        if (Object.keys(predictorList).length === 0) {
            dispatch(setAlert(true, 'Please combine at least one field!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        // submit the field data
        dispatch(addMulticollinear({
            type: FIELD_TYPE_LIST.MULTICOLLINEAR,
            name: predictorName,
            intercept: intercept || 0,
            predictorList,
            epsilonVariance: epsilonVariance || 0,
            invisible: false,
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    return (
        <Dialog open={showMulticollinearDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Multicollinear</DialogTitle>
            <DialogContent>
                <TextField fullWidth
                           size="small"
                           label="Predictor Name"
                           sx={{marginTop: '12px'}}
                           value={predictorName}
                           onChange={e => {
                               setPredictorName(e.target.value);
                           }}/>
                <Grid container spacing={1} sx={{marginTop: '12px'}}>
                    <Grid item sm={4} sx={{marginTop: '12px'}}>Intercept</Grid>
                    <Grid item sm={8}>
                        <TextField fullWidth
                                   size="small"
                                   type="number"
                                   value={intercept}
                                   onChange={e => {
                                       setIntercept(e.target.value);
                                   }}></TextField>
                    </Grid>
                </Grid>
                {numericalFieldList.map((field, index) =>
                    <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                        <Grid item sm={4} sx={{marginTop: '12px', overflowX: 'auto'}}>{field.name}</Grid>
                        <Grid item sm={8}>
                            <TextField fullWidth
                                       size="small"
                                       label="Beta"
                                       type="number"
                                       value={predictorList[field.name] || ''}
                                       onChange={e => {
                                           let newPredictorList = {...predictorList};
                                           newPredictorList[field.name] = e.target.value;
                                           setPredictorList(newPredictorList);
                                       }}/>
                        </Grid>
                    </Grid>)}
                <TextField fullWidth
                           size="small"
                           type="number"
                           label="Epsilon Variance"
                           sx={{marginTop: '24px'}}
                           value={epsilonVariance}
                           onChange={e => {
                               setEpsilonVariance(e.target.value);
                           }}></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>OK</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}