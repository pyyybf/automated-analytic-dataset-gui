import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    TextField
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    addAddress,
    setShowAddressDialog,
} from "@/store/generator/generator.action";
import {setAlert} from "@/store/web/web.action";
import {useState} from "react";
import {FIELD_TYPE_LIST} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function AddressDialog() {
    const dispatch = useDispatch();
    const showAddressDialog = useSelector(state => state.generator.showAddressDialog);

    const [groupName, setGroupName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const handleCloseDialog = () => {
        dispatch(setShowAddressDialog(false));
    };
    const initDialog = () => {
        setGroupName('');
        setStreet('');
        setCity('');
        setState('');
        setZip('');
    };
    const handleSubmit = () => {
        // validate
        if (street === '' || city === '' || state === '' || zip === '') {
            dispatch(setAlert(true, 'The names can\'t be empty!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        // submit the field data
        dispatch(addAddress({
            type: FIELD_TYPE_LIST.ADDRESS,
            name: groupName,
            street,
            city,
            state,
            zip,
            invisible: false,
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    return (
        <Dialog open={showAddressDialog} onClose={handleCloseDialog}>
            <DialogTitle>Address</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} rowSpacing={2} sx={{marginTop: '12px'}}>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   label="Address Group Name"
                                   size="small"
                                   value={groupName}
                                   onChange={e => {
                                       setGroupName(e.target.value);
                                       setStreet(`${e.target.value} Street`);
                                       setCity(`${e.target.value} City`);
                                       setState(`${e.target.value} State`);
                                       setZip(`${e.target.value} Zip`);
                                   }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                                   label="Street Predictor Name"
                                   size="small"
                                   value={street}
                                   onChange={e => {
                                       setStreet(e.target.value);
                                   }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                                   label="City Predictor Name"
                                   size="small"
                                   value={city}
                                   onChange={e => {
                                       setCity(e.target.value);
                                   }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                                   label="State Predictor Name"
                                   size="small"
                                   value={state}
                                   onChange={e => {
                                       setState(e.target.value);
                                   }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                                   label="Zip Predictor Name"
                                   size="small"
                                   value={zip}
                                   onChange={e => {
                                       setZip(e.target.value);
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