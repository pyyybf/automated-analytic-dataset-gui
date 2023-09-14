import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Link,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {parseAccountFile, saveAccountList, setShowAddTADialog} from "@/store/account/account.action";
import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import {ALERT_DURATION, BASE_URL} from "@/config";
import {setAlert} from "@/store/generator/generator.action";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function AddTADialog(props) {
    const dispatch = useDispatch();
    const showAddTADialog = useSelector(state => state.account.showAddTADialog);

    const INITIAL_ACCOUNT_LIST = [{username: '', firstName: '', lastName: ''}];

    const [accountList, setAccountList] = useState([...INITIAL_ACCOUNT_LIST]);
    const [files, setFiles] = useState('');

    const handleCloseDialog = () => {
        dispatch(setShowAddTADialog(false));
    };
    const handleUpload = e => {
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        parseAccountFile(formData).then(res => {
            setAccountList(res);
        }).catch(err => {
            console.log(err)
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        }).finally(() => {
            setFiles('');
        });
    };
    const handleSubmit = () => {
        saveAccountList(accountList).then(res => {
            dispatch(setAlert(true, 'Add successfully.', 'success'));
            setTimeout(() => {
                dispatch(setAlert(false, 'Add successfully.', 'success'));
            }, ALERT_DURATION);
            props.onConfirm();
            handleCloseDialog();
        }).catch(err => {
            console.log(err)
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        });
    };

    return (
        <Dialog open={showAddTADialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Add New TAs</DialogTitle>
            <DialogContent>
                <Button component="label"
                        variant="contained"
                        sx={{marginRight: '12px'}}
                        startIcon={<CloudUploadIcon/>}>
                    Upload file
                    <VisuallyHiddenInput type="file" value={files} onChange={handleUpload}/>
                </Button>
                <Typography variant="body2" display="inline-block">
                    Upload a <i>.xlsx</i> file including required columns,&nbsp;
                    <Link color="primary" download underline="always"
                          href={`${BASE_URL}/static/TA Information Template.xlsx`}>click here</Link>
                    &nbsp;to download the template.
                </Typography>
                <Grid container spacing={2} sx={{marginTop: '6px', width: '100%'}}>
                    {accountList.map((account, index) =>
                        <React.Fragment key={index}>
                            <Grid item xs={12} md={5}>
                                <TextField fullWidth
                                           size="small"
                                           label="Username/Email"
                                           value={accountList[index].username}
                                           onChange={e => {
                                               let newAccountList = [...accountList];
                                               newAccountList[index].username = e.target.value;
                                               setAccountList(newAccountList);
                                           }}/>
                            </Grid>
                            <Grid item xs={5} md={3}>
                                <TextField fullWidth
                                           size="small"
                                           label="Last Name"
                                           value={accountList[index].lastName}
                                           onChange={e => {
                                               let newAccountList = [...accountList];
                                               newAccountList[index].lastName = e.target.value;
                                               setAccountList(newAccountList);
                                           }}/>
                            </Grid>
                            <Grid item xs={5} md={3}>
                                <TextField fullWidth
                                           size="small"
                                           label="First Name"
                                           value={accountList[index].firstName}
                                           onChange={e => {
                                               let newAccountList = [...accountList];
                                               newAccountList[index].firstName = e.target.value;
                                               setAccountList(newAccountList);
                                           }}/>
                            </Grid>
                            <Grid item xs={2} md={1}>
                                <IconButton color="error"
                                            onClick={() => {
                                                let newAccountList = [...accountList];
                                                newAccountList.splice(index, 1);
                                                setAccountList(newAccountList);
                                            }}>
                                    <DeleteOutlined/>
                                </IconButton>
                            </Grid>
                        </React.Fragment>
                    )}
                </Grid>
                <Button sx={{marginTop: '12px'}}
                        startIcon={<AddIcon/>}
                        onClick={() => {
                            setAccountList([...accountList, ...INITIAL_ACCOUNT_LIST]);
                        }}>Add a new row</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
        ;
}