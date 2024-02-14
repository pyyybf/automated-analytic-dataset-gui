import {
    Button,
    CircularProgress,
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "@/store/web/web.action";
import {ALERT_DURATION} from "@/config";
import {handleDownload} from "@/utils/file";
import {downloadData} from "@/store/assignment/assignment.action";

export default function DownloadDataButton(props) {
    const dispatch = useDispatch();
    const uscID = useSelector(state => state.assignment.uscID);

    const [generateDataFileLoading, setGenerateDataFileLoading] = useState(false);

    const handleGenerateData = () => {
        if (uscID.length !== 10 || isNaN(uscID)) {
            dispatch(setAlert(true, 'Please enter your USC ID.'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        setGenerateDataFileLoading(true);
        downloadData(props.assignmentID, 'csv', uscID).then(res => {
            handleDownload(res, `${props.assignmentName} - Dataset.csv`);
        }).catch(err => {
            console.log(err);
            dispatch(setAlert(true, 'Fail to generate data file!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        }).finally(() => {
            setGenerateDataFileLoading(false);
        });
    };

    return (
        <Button startIcon={generateDataFileLoading ? <CircularProgress size="1em" color="inherit"/> :
            <DownloadIcon sx={{fontSize: '0.5em'}}/>}
                onClick={handleGenerateData} variant="outlined">Dataset</Button>
    );
}