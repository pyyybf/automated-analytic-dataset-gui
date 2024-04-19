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
import {addUniqueIdentifier, setShowUniformDialog} from "@/store/generator/generator.action";
import {setAlert} from "@/store/web/web.action";
import {useState} from "react";
import {FIELD_TYPE_LIST} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function UniformDialog() {
    const dispatch = useDispatch();
    const showUniformDialog = useSelector(state => state.generator.showUniformDialog);

    const [predictorName, setPredictorName] = useState('');
    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(1);

    const handleCloseDialog = () => {
        dispatch(setShowUniformDialog(false));
    };
    const initDialog = () => {
        setPredictorName('');
        setLowerBound(0);
        setUpperBound(1);
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
        if (Number(lowerBound) >= Number(upperBound)) {
            dispatch(setAlert(true, 'The upper bound should be no less than lower bound!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        // submit the field data
        dispatch(addUniqueIdentifier({
            type: FIELD_TYPE_LIST.UNIFORM,
            name: predictorName,
            lowerBound,
            upperBound,
            invisible: false,
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    return (
        <Dialog open={showUniformDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Uniformly Distributed</DialogTitle>
            <DialogContent>
                <TextField variant="outlined"
                           label="Predictor Name"
                           sx={{marginTop: '12px', width: '100%'}}
                           value={predictorName}
                           onChange={e => {
                               setPredictorName(e.target.value);
                           }}/>
                <Grid container spacing={1} sx={{marginTop: '12px'}}>
                    <Grid item xs={12} sm={6}>
                        <TextField variant="outlined"
                                   label="Lower Bound"
                                   type="number"
                                   value={lowerBound}
                                   onChange={e => {
                                       setLowerBound(e.target.value);
                                   }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField variant="outlined"
                                   label="Upper Bound"
                                   type="number"
                                   value={upperBound}
                                   onChange={e => {
                                       setUpperBound(e.target.value);
                                   }}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>OK</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}