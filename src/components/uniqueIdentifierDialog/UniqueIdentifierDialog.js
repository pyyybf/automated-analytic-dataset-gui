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

    const INITIAL_UNIQUE_IDENTIFIER = {
        type: 'UNIQUE_IDENTIFIER',
        name: 'ID',
        alphanumeric: 'alphanumeric',
        numberOfDigits: 6
    };

    const [uniqueIdentifier, setUniqueIdentifier] = useState({...INITIAL_UNIQUE_IDENTIFIER});

    const handleCloseDialog = () => {
        dispatch(setShowUniqueIdentifierDialog(false));
    };

    return (
        <Dialog open={showUniqueIdentifierDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Unique Identifier</DialogTitle>
            <DialogContent>
                <FormControl>
                    <RadioGroup value={uniqueIdentifier.alphanumeric}
                                onChange={e => {
                                    setUniqueIdentifier({
                                        ...uniqueIdentifier,
                                        alphanumeric: e.target.value
                                    });
                                }}>
                        <FormControlLabel value="alphanumeric" control={<Radio/>} label="Alphanumeric"/>
                        <FormControlLabel value="numeric" control={<Radio/>} label="Numeric"/>
                    </RadioGroup>
                </FormControl>
                <TextField
                    label="Number of Digits"
                    type="number"
                    fullWidth
                    size="small"
                    sx={{marginTop: '24px'}}
                    value={uniqueIdentifier.numberOfDigits}
                    onChange={e => {
                        setUniqueIdentifier({
                            ...uniqueIdentifier,
                            numberOfDigits: e.target.value
                        });
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button sx={{textTransform: 'none'}}
                        onClick={() => {
                            dispatch(addUniqueIdentifier(uniqueIdentifier));
                            setUniqueIdentifier({...INITIAL_UNIQUE_IDENTIFIER});
                            handleCloseDialog();
                        }}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}