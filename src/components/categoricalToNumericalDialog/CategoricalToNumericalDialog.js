import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {
    addCategoricalToNumerical,
    setAlert,
    setShowCategoricalToNumericalDialog
} from "../../store/generator/generator.action";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {FIELD_TYPE_LIST} from "../../utils/codeGenerator";
import {ALERT_DURATION} from "../../config";

export default function CategoricalToNumericalDialog() {
    const dispatch = useDispatch();
    const showCategoricalToNumericalDialog = useSelector(state => state.generator.showCategoricalToNumericalDialog);
    const categoryList = useSelector(state => state.generator.fieldList.filter(field => field.type === FIELD_TYPE_LIST.CATEGORICAL));

    const [predictorName, setPredictorName] = useState('');
    const [categoricalPredictorIdx, setCategoricalPredictorIdx] = useState(-1);
    const [categoricalMapping, setCategoricalMapping] = useState({});
    const [inplace, setInplace] = useState(false);

    const handleCloseDialog = () => {
        dispatch(setShowCategoricalToNumericalDialog(false));
    };
    const initDialog = () => {
        setPredictorName('');
        setCategoricalPredictorIdx(-1);
        setCategoricalMapping({});
        setInplace(false);
    };
    const handleSubmit = () => {
        // validate
        if (categoricalPredictorIdx === -1) {
            dispatch(setAlert(true, 'Please choose a target categorical predictor!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        if (predictorName === '') {
            dispatch(setAlert(true, 'The name can\'t be empty!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        // submit the field data
        dispatch(addCategoricalToNumerical({
            type: FIELD_TYPE_LIST.CATEGORICAL_TO_NUMERICAL,
            name: predictorName,
            target: categoryList[Number(categoricalPredictorIdx)].name,
            categoricalMapping,
            inplace,
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    const updateCategoricalMapping = (categoryList) => {
        let newCategoricalMapping = {};
        (categoryList || []).forEach(category => {
            newCategoricalMapping[category.name] = 0;
        });
        setCategoricalMapping(newCategoricalMapping);
    };

    return (
        <Dialog open={showCategoricalToNumericalDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Change Categorical Value into Numerical Value</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} sx={{marginTop: '12px'}}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Categorical Predictor</InputLabel>
                            <Select label="Categorical Predictor"
                                    size="small"
                                    value={categoricalPredictorIdx}
                                    onChange={e => {
                                        setCategoricalPredictorIdx(Number(e.target.value));
                                        updateCategoricalMapping(categoryList[Number(e.target.value)].categoryList);
                                        setPredictorName(`${categoryList[Number(e.target.value)].name}_weight`);
                                    }}>
                                {categoryList.map((categoryField, index) =>
                                    <MenuItem key={index} value={index}>{categoryField.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField fullWidth
                                   size="small"
                                   label="New Predictor Name"
                                   value={predictorName}
                                   onChange={e => {
                                       setPredictorName(e.target.value);
                                   }}/>
                    </Grid>
                </Grid>
                <h5>Categorical Mapping</h5>
                <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                    {Object.keys(categoricalMapping).map((category, index) =>
                        <React.Fragment key={index}>
                            <Grid item xs={6} sm={2} sx={{textAlign: 'right'}}>
                                {category}
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <TextField fullWidth
                                           size="small"
                                           label="Numerical Value"
                                           type="number"
                                           value={categoricalMapping[category]}
                                           onChange={e => {
                                               let newCategoricalMapping = {...categoricalMapping};
                                               newCategoricalMapping[category] = e.target.value;
                                               setCategoricalMapping(newCategoricalMapping);
                                           }}/>
                            </Grid>
                        </React.Fragment>)}
                </Grid>
                <FormGroup sx={{marginTop: '12px'}}>
                    <FormControlLabel label="Inplace"
                                      control={
                                          <Checkbox checked={inplace}
                                                    onChange={e => {
                                                        setInplace(Boolean(e.target.checked));
                                                    }}/>}/>
                </FormGroup>
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