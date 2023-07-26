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
import {addUniqueIdentifier, setShowUniqueIdentifierDialog} from "../../store/generator/generator.action";
import {useState} from "react";

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
                <Button sx={{textTransform: 'none'}}
                        onClick={() => {
                            dispatch(addUniqueIdentifier({
                                type: 'UNIQUE_IDENTIFIER',
                                name: predictorName,
                                alphanumeric,
                                numberOfDigits,
                            }));
                            initDialog();
                            handleCloseDialog();
                        }}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}