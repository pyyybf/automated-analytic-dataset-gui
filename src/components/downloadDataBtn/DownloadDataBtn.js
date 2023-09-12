import {
    Button,
    ButtonGroup,
    CircularProgress,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "@/store/generator/generator.action";
import {ALERT_DURATION} from "@/config";
import {handleDownload} from "@/utils/file";
import {downloadData} from "@/store/assignment/assignment.action";

export default function DownloadDataBtn(props) {
    const dispatch = useDispatch();
    const uscID = useSelector(state => state.assignment.uscID);

    const FILE_CONTENT_CONVERTER = {
        csv: blob => blob,
        json: blob => JSON.stringify(JSON.parse(blob), null, 2),
    };

    const [generateDataFileLoading, setGenerateDataFileLoading] = useState(false);
    const [format, setFormat] = useState('csv');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClosePopper = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) return;
        setOpen(false);
    };

    const handleGenerateData = () => {
        if (uscID.length !== 10 || isNaN(uscID)) {
            dispatch(setAlert(true, 'Please enter your USC ID.'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        setGenerateDataFileLoading(true);
        downloadData(props.assignmentID, format, uscID).then(res => {
            handleDownload(FILE_CONTENT_CONVERTER[format](res), `data.${format}`);
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
        <React.Fragment>
            <ButtonGroup variant="outlined"
                         disabled={generateDataFileLoading}
                         ref={anchorRef}>
                <Button startIcon={generateDataFileLoading ? <CircularProgress size="0.5em" color="inherit"/> : null}
                        onClick={handleGenerateData}>Download</Button>
                <Button size="small"
                        onClick={handleToggle}
                        endIcon={<ArrowDropDownIcon/>}>.{format}</Button>
            </ButtonGroup>
            <Popper sx={{zIndex: 1,}}
                    open={open}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                    placement="bottom-end">
                {({TransitionProps}) =>
                    <Grow {...TransitionProps} sx={{transformOrigin: 'center bottom'}}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClosePopper}>
                                <MenuList autoFocusItem>
                                    {Object.keys(FILE_CONTENT_CONVERTER).map((fileType) =>
                                        <MenuItem key={fileType}
                                                  selected={format === fileType}
                                                  onClick={() => {
                                                      setFormat(fileType);
                                                      setOpen(false);
                                                  }}>
                                            .{fileType}
                                        </MenuItem>)}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>}
            </Popper>
        </React.Fragment>);
}