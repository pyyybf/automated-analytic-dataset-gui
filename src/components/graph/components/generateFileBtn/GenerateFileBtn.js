import React, {useRef, useState} from "react";
import {Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useDispatch, useSelector} from "react-redux";
import {
    generateFile,
    setAlert,
} from "../../../../store/generator/generator.action";
import {ALERT_DURATION} from "../../../../config";

export default function GenerateFileBtn() {
    const dispatch = useDispatch();
    const fieldList = useSelector(state => state.generator.fieldList);
    const numberOfRows = useSelector(state => state.generator.numberOfRows);

    const FILE_CONTENT_CONVERTER = {
        csv: blob => blob,
        json: blob => JSON.stringify(blob, null, 2),
    };

    const [format, setFormat] = useState('csv');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) return;
        setOpen(false);
    };

    const onGenerateFile = () => {
        generateFile({fieldList, numberOfRows}, format).then(res => {
            let blob = res;
            let fileName = `data.${format}`;
            let link = document.createElement("a");
            link.href = `data:,${FILE_CONTENT_CONVERTER[format](blob)}`;
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
        }).catch(err => {
            console.log(err);
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION)
        });
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef}>
                <Button onClick={onGenerateFile}>Generate</Button>
                <Button size="small"
                        onClick={handleToggle}
                        endIcon={<ArrowDropDownIcon/>}
                >.{format}</Button>
            </ButtonGroup>
            <Popper
                sx={{zIndex: 1,}}
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
                placement="bottom-end"
            >
                {({TransitionProps}) => (
                    <Grow {...TransitionProps}
                          sx={{transformOrigin: 'center bottom'}}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem>
                                    {Object.keys(FILE_CONTENT_CONVERTER).map((fileType) =>
                                        <MenuItem
                                            key={fileType}
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
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}