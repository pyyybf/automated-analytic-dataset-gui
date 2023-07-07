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
    TableRow,
    TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {addMultivariateNormal, setShowMultivariateNormalDialog} from "../../store/generator/generator.action";
import React, {useState} from "react";

export default function MultivariateNormalDialog() {
    const dispatch = useDispatch();
    const showMultivariateNormalDialog = useSelector(state => state.generator.showMultivariateNormalDialog);

    const INITIAL_FIELD_LIST = [{name: '', mean: 0}];

    const [fieldList, setFieldList] = useState([...INITIAL_FIELD_LIST]);
    const [covarianceMatrix, setCovarianceMatrix] = useState([[0]]);
    const [showFieldDefinition, setShowFieldDefinition] = useState(true);

    const handleCloseDialog = () => {
        setShowFieldDefinition(true);
        dispatch(setShowMultivariateNormalDialog(false));
    };

    const addField = () => {
        // add a field into field list
        setFieldList([...fieldList, {
            name: '',
            mean: 0
        }]);
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
                                           label="Name"
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
                                            sx={{textTransform: 'none'}}
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
                            <Button sx={{textTransform: 'none', marginTop: '16px'}}
                                    startIcon={<AddIcon/>}
                                    onClick={addField}>Add a new field</Button>
                        </Grid>
                        <Grid item sm={6} sx={{textAlign: 'right'}}>
                            <Button sx={{textTransform: 'none', marginTop: '16px'}}
                                    onClick={() => {
                                        setShowFieldDefinition(false);
                                    }}>Enter Covariance Matrix</Button>
                        </Grid>
                    </Grid>
                </DialogContent> :
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={4}>
                            {fieldList.map((field, index) =>
                                <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                                    <Grid item sm={4}
                                          sx={{
                                              marginTop: '12px',
                                          }}>Field {index + 1}</Grid>
                                    <Grid item sm={8}>
                                        <TextField size="small"
                                                   label="Name"
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
                        <Grid item sm={12} md={8}>
                            <Table sx={{minWidth: 275, width: '20%', marginTop: '12px'}} aria-label="field table">
                                <TableBody>
                                    {covarianceMatrix.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{border: '1px lightgray solid', height: '60px', padding: '0'}}>
                                            {row.map((col, colIndex) =>
                                                colIndex < row.length - index ?
                                                    <TableCell
                                                        component="td"
                                                        scope="row"
                                                        align="center"
                                                        sx={{border: '1px lightgray solid', padding: '0 12px'}}>
                                                        <TextField variant="standard"
                                                                   size="small"
                                                                   type="number"
                                                                   sx={{width: '60px'}}
                                                                   value={col}
                                                                   onChange={e => {
                                                                       let newCovarianceMatrix = [];
                                                                       for (let i = 0; i < covarianceMatrix.length; i++) {
                                                                           newCovarianceMatrix.push([...covarianceMatrix[i]]);
                                                                       }
                                                                       newCovarianceMatrix[index][colIndex] = e.target.value;
                                                                       setCovarianceMatrix(newCovarianceMatrix);
                                                                   }}/>
                                                    </TableCell> :
                                                    <TableCell component="td"
                                                               scope="row"
                                                               align="center"
                                                               sx={{
                                                                   backgroundColor: 'lightgray',
                                                                   border: '1px lightgray solid', padding: '0 12px'
                                                               }}></TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    <Grid2 container>
                        <Grid2 item sm={6} smOffset={6} sx={{textAlign: 'right'}}>
                            <Button sx={{textTransform: 'none', marginTop: '16px'}}
                                    onClick={() => {
                                        setShowFieldDefinition(true);
                                    }}>Back to Field Definition</Button>
                        </Grid2>
                    </Grid2>
                </DialogContent>
            }
            <DialogActions>
                <Button sx={{textTransform: 'none'}}
                        onClick={() => {
                            dispatch(addMultivariateNormal(fieldList, covarianceMatrix));
                            setFieldList([...INITIAL_FIELD_LIST]);
                            setCovarianceMatrix([[0]]);
                            handleCloseDialog();
                        }}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}