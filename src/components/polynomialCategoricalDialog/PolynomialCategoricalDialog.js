import {
    addPolynomialCategorical,
    setAlert,
    setShowPolynomialCategoricalDialog
} from "../../store/generator/generator.action";
import {useDispatch, useSelector} from "react-redux";
import {CATEGORY_TYPE_LIST, FIELD_TYPE_LIST} from "../../utils/codeGenerator";
import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {ALERT_DURATION} from "../../config";

export default function PolynomialCategoricalDialog() {
    const dispatch = useDispatch();
    const showPolynomialCategoricalDialog = useSelector(state => state.generator.showPolynomialCategoricalDialog);
    const categoricalFieldList = useSelector(state => state.generator.fieldList.filter(field => CATEGORY_TYPE_LIST.includes(field.type)));

    const [predictorName, setPredictorName] = useState('');
    const [betas, setBetas] = useState({});

    const handleCloseDialog = () => {
        dispatch(setShowPolynomialCategoricalDialog(false));
    };
    const initDialog = () => {
        setPredictorName('');
        setBetas({});
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
        // submit the field data
        dispatch(addPolynomialCategorical({
            type: FIELD_TYPE_LIST.POLYNOMIAL_CATEGORICAL,
            name: predictorName,
            betas,
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    return (
        <Dialog open={showPolynomialCategoricalDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Polynomial Categorical</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{marginTop: '12px'}}>
                    <InputLabel>Predictor Name</InputLabel>
                    <Select value={predictorName}
                            label="Predictor Name"
                            onChange={e => {
                                setPredictorName(e.target.value);
                            }}>
                        {categoricalFieldList.map((field, index) =>
                            <MenuItem key={index} value={field.name}>{field.name}</MenuItem>)}
                    </Select>
                </FormControl>
                {categoricalFieldList.map((field, index) =>
                    <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                        <Grid item sm={4} sx={{marginTop: '12px'}}>{field.name}</Grid>
                        <Grid item sm={8}>
                            <TextField fullWidth
                                       size="small"
                                       label="Beta"
                                       type="number"
                                       value={betas[field.name] || ''}
                                       onChange={e => {
                                           let newBetas = {...betas};
                                           newBetas[field.name] = e.target.value;
                                           setBetas(newBetas);
                                       }}/>
                        </Grid>
                    </Grid>)}
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