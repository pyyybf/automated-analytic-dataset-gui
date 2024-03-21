import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    addName,
    setShowNameDialog,
} from "@/store/generator/generator.action";
import {setAlert} from "@/store/web/web.action";
import {useState} from "react";
import {FIELD_TYPE_LIST} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function NameDialog() {
    const dispatch = useDispatch();
    const showNameDialog = useSelector(state => state.generator.showNameDialog);

    const [nameType, setNameType] = useState('Person');
    const [predictorName, setPredictorName] = useState('');

    const NAME_TYPE_LIST = ['Person', 'Company'];

    const handleCloseDialog = () => {
        dispatch(setShowNameDialog(false));
    };
    const initDialog = () => {
        setNameType('Person');
        setPredictorName('');
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
        dispatch(addName({
            type: FIELD_TYPE_LIST.NAME,
            name: predictorName,
            nameType,
            invisible: false,
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    return (
        <Dialog open={showNameDialog} onClose={handleCloseDialog}>
            <DialogTitle>Name</DialogTitle>
            <DialogContent sx={{width: '300px'}}>
                <FormControl fullWidth sx={{marginTop: '12px'}}>
                    <InputLabel>Name Type</InputLabel>
                    <Select size="small"
                            value={nameType}
                            label="Name Type"
                            onChange={e => {
                                setNameType(e.target.value);
                            }}>
                        {NAME_TYPE_LIST.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField fullWidth sx={{marginTop: '12px'}}
                           label="Predictor Name"
                           size="small"
                           value={predictorName}
                           onChange={e => {
                               setPredictorName(e.target.value);
                           }}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>OK</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}