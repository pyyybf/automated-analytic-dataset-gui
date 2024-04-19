import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useDispatch, useSelector} from "react-redux";
import {
    addDate,
    setShowDateDialog,
} from "@/store/generator/generator.action";
import {setAlert} from "@/store/web/web.action";
import {useState} from "react";
import {FIELD_TYPE_LIST} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function DateDialog() {
    const dispatch = useDispatch();
    const showDateDialog = useSelector(state => state.generator.showDateDialog);

    const [predictorName, setPredictorName] = useState('Date');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handleCloseDialog = () => {
        dispatch(setShowDateDialog(false));
    };
    const initDialog = () => {
        setPredictorName('Date');
        setFromDate(null);
        setToDate(null);
    };
    const handleSubmit = () => {
        // validate
        if (predictorName === '') {
            dispatch(setAlert(true, 'The name can\'t be empty!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        } else if (fromDate === null || toDate === null) {
            dispatch(setAlert(true, 'The date can\'t be empty!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        // submit the field data
        dispatch(addDate({
            type: FIELD_TYPE_LIST.DATE,
            name: predictorName,
            fromDate: [fromDate.$y, fromDate.$M + 1, fromDate.$D],
            toDate: [toDate.$y, toDate.$M + 1, toDate.$D],
            invisible: false,
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    return (
        <Dialog open={showDateDialog} onClose={handleCloseDialog}>
            <DialogTitle>Date</DialogTitle>
            <DialogContent>
                <TextField fullWidth
                           label="Predictor Name"
                           size="small"
                           sx={{marginTop: '12px'}}
                           value={predictorName}
                           onChange={e => {
                               setPredictorName(e.target.value);
                           }}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{marginTop: '12px'}}>
                        <DatePicker label="From Date" value={fromDate}
                                    onChange={e => {
                                        setFromDate(e);
                                    }}/>
                        <DatePicker label="To Date" value={toDate}
                                    onChange={e => {
                                        setToDate(e);
                                    }}/>
                    </DemoContainer>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>OK</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}