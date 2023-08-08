import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addUniqueIdentifier, setAlert, setShowUniqueIdentifierDialog} from "@/store/generator/generator.action";
import {useState} from "react";
import {FIELD_TYPE_LIST} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function UniqueIdentifierDialog() {
    const dispatch = useDispatch();
    const showUniqueIdentifierDialog = useSelector(state => state.generator.showUniqueIdentifierDialog);

    const [predictorName, setPredictorName] = useState('ID');
    const [alphanumeric, setAlphanumeric] = useState('alphanumeric');
    const [numberOfDigits, setNumberOfDigits] = useState(6);

    const handleCloseDialog = () => {
        dispatch(setShowUniqueIdentifierDialog(false));
    };
    const initDialog = () => {
        setPredictorName('ID');
        setAlphanumeric('alphanumeric');
        setNumberOfDigits(6);
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
        dispatch(addUniqueIdentifier({
            type: FIELD_TYPE_LIST.UNIQUE_IDENTIFIER,
            name: predictorName,
            alphanumeric,
            numberOfDigits,
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    return (
        <Dialog open={showUniqueIdentifierDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Unique Identifier</DialogTitle>
            <DialogContent>
                <FormControl>
                    <RadioGroup value={alphanumeric}
                                onChange={e => {
                                    setAlphanumeric(e.target.value);
                                }}>
                        <FormControlLabel value="alphanumeric" control={<Radio/>} label="Alphanumeric"/>
                        <FormControlLabel value="numeric" control={<Radio/>} label="Numeric"/>
                    </RadioGroup>
                </FormControl>
                <TextField fullWidth
                           label="Number of Digits"
                           type="number"
                           size="small"
                           sx={{marginTop: '24px'}}
                           value={numberOfDigits}
                           onChange={e => {
                               setNumberOfDigits(e.target.value);
                           }}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>OK</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}