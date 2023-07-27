import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {addBeta, setAlert, setShowBetaDialog} from "../../store/generator/generator.action";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {FIELD_TYPE_LIST} from "../../utils/codeGenerator";
import {ALERT_DURATION} from "../../config";

export default function BetaDialog() {
    const dispatch = useDispatch();
    const showBetaDialog = useSelector(state => state.generator.showBetaDialog);

    const INITIAL_FIELD_LIST = [{type: FIELD_TYPE_LIST.BETA, name: '', alpha: 0, beta: 0}];

    const [fieldList, setFieldList] = useState([...INITIAL_FIELD_LIST]);

    const handleCloseDialog = () => {
        dispatch(setShowBetaDialog(false));
    };
    const initDialog = () => {
        setFieldList([...INITIAL_FIELD_LIST]);
    };
    const handleSubmit = () => {
        // validate
        for (let field of fieldList) {
            if (field.name === '') {
                dispatch(setAlert(true, 'The name can\'t be empty!'));
                setTimeout(() => {
                    dispatch(setAlert(false));
                }, ALERT_DURATION);
                return;
            }
        }
        // submit the field data
        dispatch(addBeta(fieldList));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    const addField = () => {
        // add a field into field list
        setFieldList([...fieldList, ...INITIAL_FIELD_LIST]);
    };
    const delField = (index) => {
        // at least one field
        if (fieldList.length === 1) return;
        // delete the field from field list
        let newFieldList = [...fieldList];
        newFieldList.splice(index, 1);
        setFieldList(newFieldList);
    };

    return (
        <Dialog open={showBetaDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Beta Distribution</DialogTitle>
            <DialogContent>
                {fieldList.map((field, index) =>
                    <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                        <Grid item sm={5}>
                            <TextField fullWidth
                                       size="small"
                                       label="Name"
                                       value={field.name}
                                       onChange={e => {
                                           let newFieldList = [...fieldList];
                                           newFieldList[index].name = e.target.value;
                                           setFieldList(newFieldList);
                                       }}></TextField>
                        </Grid>
                        <Grid item sm={3}>
                            <TextField fullWidth
                                       size="small"
                                       type="number"
                                       label="Alpha"
                                       value={field.alpha}
                                       onChange={e => {
                                           let newFieldList = [...fieldList];
                                           newFieldList[index].alpha = e.target.value;
                                           setFieldList(newFieldList);
                                       }}></TextField>
                        </Grid>
                        <Grid item sm={3}>
                            <TextField fullWidth
                                       size="small"
                                       type="number"
                                       label="Beta"
                                       value={field.beta}
                                       onChange={e => {
                                           let newFieldList = [...fieldList];
                                           newFieldList[index].beta = e.target.value;
                                           setFieldList(newFieldList);
                                       }}></TextField>
                        </Grid>
                        <Grid item sm={1}>
                            <IconButton aria-label="delete"
                                        sx={{textTransform: 'none'}}
                                        onClick={() => {
                                            delField(index);
                                        }}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Grid>
                    </Grid>)}
                <Button sx={{textTransform: 'none', marginTop: '16px'}}
                        startIcon={<AddIcon/>}
                        onClick={addField}>Add a new field</Button>
            </DialogContent>
            <DialogActions>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleSubmit}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}