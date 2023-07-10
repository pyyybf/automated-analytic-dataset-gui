import React, {useState} from "react";
import {Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useSelector} from "react-redux";
import {generateFile} from "../../../../store/generator/generator.action";

export default function GenerateFileBtn() {
    const fieldList = useSelector(state => state.generator.fieldList);
    const numberOfRows = useSelector(state => state.generator.numberOfRows);

    const [format, setFormat] = useState('csv');
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const FILE_TYPES = ['csv', 'json'];

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = e => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) return;
        setOpen(false);
    };

    const onGenerateFile = () => {
        generateFile({fieldList, numberOfRows, format}).then(res => {
            let blob = res;
            let fileName = `data.${format}`;
            if (format === 'csv') {
                if (window.navigator.msSaveOrOpenBlob) {  // IE
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    let link = document.createElement("a");
                    link.href = window.URL.createObjectURL(new Blob([blob]));
                    link.download = fileName;
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }
            } else if (format === 'json') {
                let link = document.createElement("a");
                link.href = `data:,${JSON.stringify(blob, null, 2)}`;
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
            }
        }).catch(err => {
            console.log(err);
        });
    };
    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef}>
                <Button sx={{textTransform: 'none'}}
                        onClick={onGenerateFile}>Generate</Button>
                <Button size="small"
                        sx={{textTransform: 'none'}}
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
                                    {FILE_TYPES.map((fileType) =>
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