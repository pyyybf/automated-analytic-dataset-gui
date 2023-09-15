import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid2 from "@mui/material/Unstable_Grid2";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {addMultivariateNormal, setAlert, setShowMultivariateNormalDialog} from "@/store/generator/generator.action";
import React, {useState} from "react";
import {FIELD_TYPE_LIST} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function MultivariateNormalDialog() {
    const dispatch = useDispatch();
    const showMultivariateNormalDialog = useSelector(state => state.generator.showMultivariateNormalDialog);
    const multivariateNormalGroupNum = useSelector(state => state.generator.multivariateNormalGroupNum);

    const INITIAL_FIELD_LIST = [{type: FIELD_TYPE_LIST.MULTIVARIATE_NORMAL, name: '', mean: 0}];

    const [fieldList, setFieldList] = useState([...INITIAL_FIELD_LIST]);
    const [covarianceMatrix, setCovarianceMatrix] = useState([[0]]);
    const [showFieldDefinition, setShowFieldDefinition] = useState(true);

    const handleCloseDialog = () => {
        setShowFieldDefinition(true);
        dispatch(setShowMultivariateNormalDialog(false));
    };
    const initDialog = () => {
        setFieldList([...INITIAL_FIELD_LIST]);
        setCovarianceMatrix([[0]]);
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
        let newFieldList = [];
        fieldList.forEach((field, index) => {
            newFieldList.push({
                ...field,
                groupNum: multivariateNormalGroupNum,
                index: index
            });
        });
        let newCovarianceMatrix = {};
        newCovarianceMatrix[`GROUP_${multivariateNormalGroupNum}`] = covarianceMatrix;

        dispatch(addMultivariateNormal(newFieldList, newCovarianceMatrix));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    const addField = () => {
        // add a field into field list
        setFieldList([...fieldList, ...INITIAL_FIELD_LIST]);
        // add a field into covariance matrix
        let newCovarianceMatrix = [];
        for (let i = 0; i < covarianceMatrix.length; i++) {
            let newRow = [...covarianceMatrix[i], 0];
            newCovarianceMatrix.push(newRow);
        }
        newCovarianceMatrix.push(new Array(covarianceMatrix.length + 1).fill(0));
        setCovarianceMatrix(newCovarianceMatrix);
    };
    const delField = (index) => {
        // at least one field
        if (fieldList.length === 1) return;
        // delete the field from field list
        let newFieldList = [...fieldList];
        newFieldList.splice(index, 1);
        setFieldList(newFieldList);
        // delete the field from covariance matrix
        let newCovarianceMatrix = [];
        for (let i = 0; i < covarianceMatrix.length; i++) {
            if (i === index) continue;
            let newRow = [...covarianceMatrix[i]];
            newRow.splice(index, 1);
            newCovarianceMatrix.push(newRow);
        }
        setCovarianceMatrix(newCovarianceMatrix);
    };

    return (
        <Dialog open={showMultivariateNormalDialog} onClose={handleCloseDialog} maxWidth="xl">
            <DialogTitle>Multivariate Normal</DialogTitle>
            {showFieldDefinition ?
                <DialogContent>
                    {fieldList.map((field, index) =>
                        <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                            <Grid item sm={2}
                                  sx={{
                                      marginTop: '12px',
                                  }}>Field {index + 1}</Grid>
                            <Grid item sm={5}>
                                <TextField size="small"
                                           label="Predictor Name"
                                           value={field.name}
                                           onChange={e => {
                                               let newFieldList = [...fieldList];
                                               newFieldList[index].name = e.target.value;
                                               setFieldList(newFieldList);
                                           }}></TextField>
                            </Grid>
                            <Grid item sm={4}>
                                <TextField size="small"
                                           type="number"
                                           label="Mean"
                                           value={field.mean}
                                           onChange={e => {
                                               let newFieldList = [...fieldList];
                                               newFieldList[index].mean = e.target.value;
                                               setFieldList(newFieldList);
                                           }}></TextField>
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton aria-label="delete"
                                            onClick={() => {
                                                delField(index);
                                            }}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    )}
                    <Grid container>
                        <Grid item sm={6}>
                            <Button sx={{marginTop: '16px'}}
                                    startIcon={<AddIcon/>}
                                    onClick={addField}>Add a new field</Button>
                        </Grid>
                        <Grid item sm={6} sx={{textAlign: 'right'}}>
                            <Button sx={{marginTop: '16px'}}
                                    endIcon={<ArrowForwardIcon/>}
                                    onClick={() => {
                                        setShowFieldDefinition(false);
                                    }}>Enter Covariance Matrix</Button>
                        </Grid>
                    </Grid>
                </DialogContent> :
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={4} sx={{marginTop: '56px'}}>
                            {fieldList.map((field, index) =>
                                <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                                    <Grid item sm={4}
                                          sx={{
                                              marginTop: '12px',
                                          }}>Field {index + 1}</Grid>
                                    <Grid item sm={8}>
                                        <TextField size="small"
                                                   label="Predictor Name"
                                                   value={field.name}
                                                   onChange={e => {
                                                       let newFieldList = [...fieldList];
                                                       newFieldList[index].name = e.target.value;
                                                       setFieldList(newFieldList);
                                                   }}></TextField>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item sm={12} md={8} sx={{overflowX: 'scroll'}}>
                            <Table sx={{minWidth: 275, width: '20%', marginTop: '12px'}} aria-label="field table">
                                <TableHead>
                                    <TableRow>
                                        {fieldList.map((field, index) =>
                                            <TableCell key={index} align="center">
                                                {field.name || `Field ${index + 1}`}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {covarianceMatrix.map((row, index) => (
                                        <TableRow key={index}
                                                  sx={{
                                                      border: '1px lightgray solid',
                                                      height: '60px',
                                                      padding: '0'
                                                  }}>
                                            {row.map((col, colIndex) =>
                                                <TableCell key={colIndex}
                                                           component="td"
                                                           scope="row"
                                                           align="center"
                                                           sx={{border: '1px lightgray solid', padding: '0 12px'}}>
                                                    <TextField variant="standard"
                                                               size="small"
                                                               type="number"
                                                               sx={{width: '60px'}}
                                                               value={col}
                                                               disabled={index > colIndex}
                                                               onChange={e => {
                                                                   let newCovarianceMatrix = [];
                                                                   for (let i = 0; i < covarianceMatrix.length; i++) {
                                                                       newCovarianceMatrix.push([...covarianceMatrix[i]]);
                                                                   }
                                                                   newCovarianceMatrix[index][colIndex] = e.target.value;
                                                                   newCovarianceMatrix[colIndex][index] = e.target.value;
                                                                   setCovarianceMatrix(newCovarianceMatrix);
                                                               }}/>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    <Grid2 container>
                        <Grid2 sm={6} smOffset={6} sx={{textAlign: 'right'}}>
                            <Button sx={{marginTop: '16px'}}
                                    onClick={() => {
                                        setShowFieldDefinition(true);
                                    }}>Back to Field Definition</Button>
                        </Grid2>
                    </Grid2>
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={handleSubmit}>OK</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}