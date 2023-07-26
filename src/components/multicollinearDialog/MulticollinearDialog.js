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
import {addMulticollinear, setShowMultiCollinearDialog} from "../../store/generator/generator.action";
import {FIELD_TYPE_LIST, NUMERIC_TYPE_LIST} from "../../utils/codeGenerator";
import React, {useState} from "react";

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
        // TODO: check validation
        // submit the field data
        dispatch(addMulticollinear({
            type: FIELD_TYPE_LIST.MULTICOLLINEAR,
            name: predictorName,
            intercept,
            predictorList,
            epsilonVariance
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
                    <Grid item sm={4}>Intercept</Grid>
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
                        <Grid item sm={4} sx={{marginTop: '12px'}}>{field.name}</Grid>
                        <Grid item sm={8}>
                            <TextField size="small"
                                       label="Beta"
                                       type="number"
                                       sx={{width: '100%'}}
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
                <Button sx={{textTransform: 'none'}}
                        onClick={handleSubmit}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}