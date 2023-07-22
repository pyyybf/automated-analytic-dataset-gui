import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setAlert, setCode, setShowCodeDialog} from "../../store/generator/generator.action";
import CodeEditor from '@uiw/react-textarea-code-editor';
import copy from 'copy-to-clipboard';

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

    const [importCodeStyle, setImportCodeStyle] = useState(HIDDEN_BTN_STYLE);
    const [codeStyle, setCodeStyle] = useState(HIDDEN_BTN_STYLE);

    const handleCloseDialog = () => {
        dispatch(setShowCodeDialog(false));
    };
    const handleCopy = (content) => {
        copy(content);
        dispatch(setAlert(true, 'Copied to clipboard!', 'success'));
        setTimeout(() => {
            dispatch(setAlert(false, 'Copied to clipboard!', 'success'));
        }, 3000);
    };
    const handleDownload = () => {
        let link = document.createElement("a");
        link.href = `data:,${importCode}\n\n\n${code}`;
        link.download = 'predictor_generator.py';
        link.click();
        window.URL.revokeObjectURL(link.href);
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
                        <IconButton aria-label="copy" size="small" onClick={() => {
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
                <Button variant="contained" sx={{textTransform: 'none'}}
                        onClick={handleDownload}>Download .py file</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}