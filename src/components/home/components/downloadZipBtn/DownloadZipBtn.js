import {
    Button,
    CircularProgress,
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {setAlert} from "@/store/web/web.action";
import {ALERT_DURATION} from "@/config";
import {downloadAutoGrader} from "@/store/assignment/assignment.action";

export default function DownloadZipButton(props) {
    const dispatch = useDispatch();

    const [generateDataFileLoading, setGenerateDataFileLoading] = useState(false);

    const handleGenerateData = () => {
        setGenerateDataFileLoading(true);
        downloadAutoGrader(props.assignmentID).then(res => {
            const blobUrl = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${props.assignmentName}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
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
        <Button startIcon={generateDataFileLoading ? <CircularProgress size="1em" color="inherit"/> : <DownloadIcon/>}
                onClick={handleGenerateData} variant="outlined" sx={{marginLeft: '12px'}}>Auto-Grader</Button>
    );
}