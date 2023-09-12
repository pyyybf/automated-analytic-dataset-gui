import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addResponseVector, setAlert, setShowResponseVectorDialog} from "@/store/generator/generator.action";
import React, {useState} from "react";
import {FIELD_TYPE_LIST, NUMERIC_TYPE_LIST} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function ResponseVectorDialog() {
    const dispatch = useDispatch();
    const showResponseVectorDialog = useSelector(state => state.generator.showResponseVectorDialog);
    const numericalFieldList = useSelector(state => state.generator.fieldList.filter(field => NUMERIC_TYPE_LIST.includes(field.type)));

    const [type, setType] = useState(FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR);
    const [predictorName, setPredictorName] = useState('Y');
    const [predictorList, setPredictorList] = useState({});
    const [intercept, setIntercept] = useState(0);
    const [epsilonVariance, setEpsilonVariance] = useState(0);
    const [showInteractionTermBetas, setShowInteractionTermBetas] = useState(false);
    const [interactionTermBetas, setInteractionTermBetas] = useState([]);
    const [exponent, setExponent] = useState('');

    const handleCloseDialog = () => {
        dispatch(setShowResponseVectorDialog(false));
    };
    const initDialog = () => {
        setType(FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR);
        setPredictorName('Y');
        setPredictorList({});
        setIntercept(0);
        setEpsilonVariance(0);
        setShowInteractionTermBetas(false);
        setInteractionTermBetas([]);
        setExponent('');
    };
    const handleSubmit = () => {
        // validate
        if (predictorName === '') {
            dispatch(setAlert(true, 'The name can\'t be empty!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        if (Object.keys(predictorList).length === 0) {
            dispatch(setAlert(true, 'Please combine at least one field!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        // submit the field data
        let checkedPredictorList = {};
        for (let field of numericalFieldList) {
            if (predictorList[field.name]?.checked) {
                checkedPredictorList[field.name] = {...predictorList[field.name]};
            }
        }
        if (type === FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR) {
            dispatch(addResponseVector({
                type: FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR,
                name: predictorName,
                predictorList: checkedPredictorList,
                intercept: intercept || 0,
                epsilonVariance: epsilonVariance || 0,
                exponent,
            }));
        } else {
            dispatch(addResponseVector({
                type: FIELD_TYPE_LIST.RESPONSE_VECTOR_POLYNOMIAL,
                name: predictorName,
                predictorList: checkedPredictorList,
                intercept: intercept || 0,
                interactionTermBetas,
                epsilonVariance: epsilonVariance || 0,
                exponent,
            }));
        }
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    return (
        <Dialog open={showResponseVectorDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Response Vector</DialogTitle>
            <DialogContent sx={{minWidth: '600px'}}>
                <FormControl>
                    <RadioGroup row value={type}
                                onChange={e => {
                                    setType(e.target.value);
                                    setShowInteractionTermBetas(false);
                                }}>
                        <FormControlLabel value={FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR} control={<Radio/>}
                                          label="Linear"/>
                        <FormControlLabel value={FIELD_TYPE_LIST.RESPONSE_VECTOR_POLYNOMIAL} control={<Radio/>}
                                          label="Polynomial"/>
                    </RadioGroup>
                </FormControl>
                <TextField fullWidth
                           size="small"
                           label="Response Name"
                           sx={{
                               marginTop: '12px',
                           }}
                           value={predictorName}
                           onChange={e => {
                               setPredictorName(e.target.value);
                           }}></TextField>
                {showInteractionTermBetas ?
                    <React.Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={2} sx={{marginTop: '60px'}}>
                                {numericalFieldList.filter(field => predictorList[field.name]?.checked).map((field, index) =>
                                    <Grid container sx={{height: '60px'}} key={index}>
                                        <Grid item xs={12} sx={{margin: 'auto'}}>{field.name}</Grid>
                                    </Grid>
                                )}
                            </Grid>
                            <Grid item xs={12} md={9} lg={10} sx={{overflowX: 'scroll'}}>
                                <Table stickyHeader sx={{marginTop: '12px'}}>
                                    <TableHead>
                                        <TableRow sx={{border: 'none'}}>
                                            {numericalFieldList.filter(field => predictorList[field.name]?.checked).map((field, index) =>
                                                <TableCell align="center" key={index}>{field.name}</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {numericalFieldList.filter(field => predictorList[field.name]?.checked).map((row, index) =>
                                            <TableRow key={index}
                                                      sx={{
                                                          border: '1px lightgray solid',
                                                          height: '60px',
                                                          padding: '0'
                                                      }}>
                                                {numericalFieldList.filter(field => predictorList[field.name]?.checked).map((col, colIndex) =>
                                                    <TableCell key={colIndex}
                                                               component="td"
                                                               scope="row"
                                                               align="center"
                                                               sx={{
                                                                   border: '1px lightgray solid',
                                                                   padding: '0 12px'
                                                               }}>
                                                        <TextField size="small"
                                                                   variant="standard"
                                                                   type="number"
                                                                   value={interactionTermBetas[index]?.[colIndex] || ''}
                                                                   onChange={e => {
                                                                       let newInteractionTermBetas = [];
                                                                       for (let row of interactionTermBetas) {
                                                                           newInteractionTermBetas.push([...row]);
                                                                       }
                                                                       newInteractionTermBetas[index][colIndex] = e.target.value;
                                                                       setInteractionTermBetas(newInteractionTermBetas);
                                                                   }}/>
                                                    </TableCell>
                                                )}
                                            </TableRow>)}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                        <Button sx={{marginTop: '12px', float: 'right'}}
                                onClick={() => {
                                    setShowInteractionTermBetas(false);
                                }}>Back to Coefficients</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h5>Coefficients {type === FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR ? '' : 'and orders of the polynomial'} of
                            the linear model</h5>
                        <Grid container spacing={1}>
                            <Grid item sm={4}
                                  sx={{
                                      marginTop: '12px',
                                  }}>Intercept</Grid>
                            <Grid item sm={8}>
                                <TextField fullWidth
                                           size="small"
                                           type="number"
                                           value={intercept}
                                           onChange={e => {
                                               setIntercept(e.target.value);
                                           }}></TextField>
                            </Grid>
                        </Grid>
                        {numericalFieldList.map((field, index) =>
                            <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                                <Grid item sm={1}>
                                    <Checkbox checked={predictorList[field.name]?.checked || false}
                                              onChange={e => {
                                                  let newPredictorList = {...predictorList};
                                                  newPredictorList[field.name] = {
                                                      ...newPredictorList[field.name],
                                                      checked: e.target.checked,
                                                  };
                                                  setPredictorList(newPredictorList);
                                                  // change Interaction Term Betas
                                                  let checkedLen = 0;
                                                  for (let name in newPredictorList) {
                                                      checkedLen += newPredictorList[name].checked ? 1 : 0;
                                                  }
                                                  let newInteractionTermBetas = [];
                                                  for (let i = 0; i < checkedLen; i++) {
                                                      newInteractionTermBetas.push(new Array(checkedLen).fill(0));
                                                  }
                                                  setInteractionTermBetas(newInteractionTermBetas);
                                              }}/>
                                </Grid>
                                <Grid item sm={3}
                                      sx={{
                                          marginTop: '12px',
                                      }}>{field.name}</Grid>
                                <Grid item sm={type === FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR ? 8 : 4}>
                                    <TextField fullWidth
                                               size="small"
                                               label="Beta"
                                               type="number"
                                               value={predictorList[field.name]?.beta || ''}
                                               onChange={e => {
                                                   let newPredictorList = {...predictorList};
                                                   if (newPredictorList.hasOwnProperty(field.name)) {
                                                       newPredictorList[field.name].beta = e.target.value;
                                                   } else {
                                                       newPredictorList[field.name] = {
                                                           beta: e.target.value,
                                                       };
                                                   }
                                                   setPredictorList(newPredictorList);
                                               }}></TextField>
                                </Grid>
                                {type === FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR ? null :
                                    <Grid item sm={4}>
                                        <TextField fullWidth
                                                   size="small"
                                                   label="Polynomial Order"
                                                   type="number"
                                                   InputProps={{
                                                       inputProps: {
                                                           max: 4,
                                                           min: 1
                                                       }
                                                   }}
                                                   value={predictorList[field.name]?.polynomialOrder || ''}
                                                   onChange={e => {
                                                       let newPredictorList = {...predictorList};
                                                       if (!newPredictorList.hasOwnProperty(field.name)) {
                                                           newPredictorList[field.name] = {};
                                                       }
                                                       const newVal = Number(e.target.value);
                                                       if (e.target.value === '' || (newVal <= 4 && newVal >= 1)) {
                                                           newPredictorList[field.name].polynomialOrder = e.target.value;
                                                       } else if (newVal > 4) {
                                                           newPredictorList[field.name].polynomialOrder = 4;
                                                       } else if (newVal < 1) {
                                                           newPredictorList[field.name].polynomialOrder = 1;
                                                       }
                                                       setPredictorList(newPredictorList);
                                                   }}></TextField>
                                    </Grid>}
                            </Grid>)}
                        {type === FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR ? null :
                            <Button sx={{marginTop: '12px', float: 'right'}}
                                    onClick={() => {
                                        setShowInteractionTermBetas(true);
                                    }}>Enter Interaction Term Betas</Button>}
                    </React.Fragment>}
                <TextField fullWidth
                           size="small"
                           type="number"
                           label="Epsilon Variance"
                           sx={{
                               marginTop: '24px',
                           }}
                           value={epsilonVariance}
                           onChange={e => {
                               setEpsilonVariance(e.target.value);
                           }}></TextField>
                <h5>Exponential Function</h5>
                <FormControl fullWidth>
                    <TextField fullWidth
                               size="small"
                               type="number"
                               label="Exponent"
                               value={exponent}
                               onChange={e => {
                                   setExponent(e.target.value);
                               }}/>
                    <FormHelperText>
                        <span style={{
                            fontFamily: '"Nimbus Roman No9 L", "Times New Roman", Times, serif',
                            fontStyle: 'italic',
                        }}>f(x) = exp(exponenet &times; x)</span>, empty means exponential function is not used
                    </FormHelperText>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>OK</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}