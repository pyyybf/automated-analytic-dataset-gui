import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {setCode, setShowCodeDialog} from "@/store/generator/generator.action";
import {setAlert} from "@/store/web/web.action";
import CodeEditor from '@uiw/react-textarea-code-editor';
import copy from 'copy-to-clipboard';
import {ALERT_DURATION} from "@/config";
import {saveAssignment, setAssignmentId} from "@/store/assignment/assignment.action";

export default function CodeDialog() {
    const dispatch = useDispatch();
    const showCodeDialog = useSelector(state => state.generator.showCodeDialog);
    const code = useSelector(state => state.generator.code);
    const importCode = useSelector(state => state.generator.importCode);
    const numberOfRows = useSelector(state => state.generator.numberOfRows);
    const fieldList = useSelector(state => state.generator.fieldList);
    const covarianceMatrix = useSelector(state => state.generator.covarianceMatrix);
    const assignmentName = useSelector(state => state.assignment.assignmentName);
    const assignmentId = useSelector(state => state.assignment.assignmentId);
    // template
    const questions = useSelector(state => state.assignment.questions);
    const importCodeTmpl = useSelector(state => state.assignment.importCode);
    const fetchDatasetCode = useSelector(state => state.assignment.fetchDatasetCode);

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

    const [importCodeStyle, setImportCodeStyle] = useState(HIDDEN_BTN_STYLE);
    const [codeStyle, setCodeStyle] = useState(HIDDEN_BTN_STYLE);

    const handleSave = () => {
        const dataset = {
            code,
            importCode,
            numberOfRows,
            fieldList,
            covarianceMatrix,
        };
        const template = {
            questions,
            importCode: importCodeTmpl,
            fetchDatasetCode,
        };
        saveAssignment(assignmentId, assignmentName, dataset, template)
            .then(res => {
                dispatch(setAssignmentId(res));
                dispatch(setAlert(true, 'Save Successful!', 'success'));
                setTimeout(() => {
                    dispatch(setAlert(false, 'Save Successful!', 'success'));
                }, ALERT_DURATION);
            }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        });
    };
    const handleCloseDialog = () => {
        dispatch(setShowCodeDialog(false));
    };

    const handleCopy = (content) => {
        copy(content);
        dispatch(setAlert(true, 'Copied to clipboard!', 'success'));
        setTimeout(() => {
            dispatch(setAlert(false, 'Copied to clipboard!', 'success'));
        }, ALERT_DURATION);
    };

    return (
        <Dialog open={showCodeDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Python Code</DialogTitle>
            <DialogContent>
                <Box sx={{width: '100%', position: 'relative'}}
                     onMouseEnter={() => {
                         setImportCodeStyle(VISIBLE_BTN_STYLE);
                     }}
                     onMouseLeave={() => {
                         setImportCodeStyle(HIDDEN_BTN_STYLE);
                     }}>
                    <Box sx={importCodeStyle}>
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
                <Box sx={{width: '100%', position: 'relative', marginTop: '12px'}}
                     onMouseEnter={() => {
                         setCodeStyle(VISIBLE_BTN_STYLE);
                     }}
                     onMouseLeave={() => {
                         setCodeStyle(HIDDEN_BTN_STYLE);
                     }}>
                    <Box sx={codeStyle}>
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
                                    dispatch(setCode(e.target.value, importCode));
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
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}