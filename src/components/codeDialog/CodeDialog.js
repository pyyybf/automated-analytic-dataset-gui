import {
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    ClickAwayListener,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grow,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useDispatch, useSelector} from "react-redux";
import React, {useRef, useState} from "react";
import {generateData, setAlert, setCode, setShowCodeDialog} from "../../store/generator/generator.action";
import CodeEditor from '@uiw/react-textarea-code-editor';
import copy from 'copy-to-clipboard';
import {ALERT_DURATION} from "../../config";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function CodeDialog() {
    const dispatch = useDispatch();
    const showCodeDialog = useSelector(state => state.generator.showCodeDialog);
    const code = useSelector(state => state.generator.code);
    const importCode = useSelector(state => state.generator.importCode);

    const HIDDEN_BTN_STYLE = {
        display: 'none',
    };
    const VISIBLE_BTN_STYLE = {
        display: 'inline-block',
        position: 'absolute',
        float: 'right',
        right: '8px',
        top: '8px',
        zIndex: 999,
    };

    const FILE_CONTENT_CONVERTER = {
        csv: blob => blob,
        json: blob => JSON.stringify(JSON.parse(blob), null, 2),
    };

    const [importCodeStyle, setImportCodeStyle] = useState(HIDDEN_BTN_STYLE);
    const [codeStyle, setCodeStyle] = useState(HIDDEN_BTN_STYLE);
    const [generateDataFileLoading, setGenerateDataFileLoading] = useState(false);
    const [format, setFormat] = useState('csv');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleCloseDialog = () => {
        dispatch(setShowCodeDialog(false));
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClosePopper = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) return;
        setOpen(false);
    };

    const handleCopy = (content) => {
        copy(content);
        dispatch(setAlert(true, 'Copied to clipboard!', 'success'));
        setTimeout(() => {
            dispatch(setAlert(false, 'Copied to clipboard!', 'success'));
        }, ALERT_DURATION);
    };
    const handleDownload = (data, filename) => {
        let link = document.createElement("a");
        link.href = `data:,${escape(data)}`;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(link.href);
    };

    const handleGenerateData = () => {
        setGenerateDataFileLoading(true);
        generateData(code, importCode, format).then(res => {
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
        <Dialog open={showCodeDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Python Code</DialogTitle>
            <DialogContent>
                <Box style={{width: '100%', position: 'relative'}}
                     onMouseEnter={() => {
                         setImportCodeStyle(VISIBLE_BTN_STYLE);
                     }}
                     onMouseLeave={() => {
                         setImportCodeStyle(HIDDEN_BTN_STYLE);
                     }}>
                    <Box style={importCodeStyle}>
                        <IconButton aria-label="copy" size="small" onClick={() => {
                            handleCopy(importCode);
                        }}>
                            <ContentCopyIcon sx={{fontSize: '18px'}}/>
                        </IconButton>
                    </Box>
                    <CodeEditor value={importCode}
                                language="python"
                                data-color-mode="light"
                                padding={15}
                                disabled
                                style={{
                                    fontSize: 12,
                                    backgroundColor: "#f5f5f5",
                                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                }}>
                    </CodeEditor>
                </Box>
                <Box style={{width: '100%', position: 'relative', marginTop: '12px'}}
                     onMouseEnter={() => {
                         setCodeStyle(VISIBLE_BTN_STYLE);
                     }}
                     onMouseLeave={() => {
                         setCodeStyle(HIDDEN_BTN_STYLE);
                     }}>
                    <Box style={codeStyle}>
                        <IconButton aria-label="copy" size="small"
                                    onClick={() => {
                                        handleCopy(code);
                                    }}>
                            <ContentCopyIcon sx={{fontSize: '18px'}}/>
                        </IconButton>
                    </Box>
                    <CodeEditor value={code}
                                language="python"
                                onChange={e => {
                                    dispatch(setCode(e.target.value));
                                }}
                                data-color-mode="light"
                                padding={15}
                                style={{
                                    fontSize: 12,
                                    backgroundColor: "#f5f5f5",
                                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                }}>
                    </CodeEditor>
                </Box>
            </DialogContent>
            <DialogActions sx={{paddingBottom: '18px'}}>
                <ButtonGroup sx={{marginRight: '12px'}}
                             variant="outlined"
                             disabled={generateDataFileLoading}
                             ref={anchorRef}>
                    <Button startIcon={generateDataFileLoading ? <CircularProgress size="1em" color="inherit"/> : null}
                            onClick={handleGenerateData}>Generate data</Button>
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
                <Button variant="contained" onClick={() => {
                    handleDownload(`${importCode}\n\n\n${code}\n`, 'predictor_generator.py');
                }}>Download .py file</Button>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}