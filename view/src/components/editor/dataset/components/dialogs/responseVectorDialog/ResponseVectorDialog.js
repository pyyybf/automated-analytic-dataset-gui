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
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addResponseVector, setShowResponseVectorDialog} from "@/store/generator/generator.action";
import {setAlert} from "@/store/web/web.action";
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
    const checkPredictor = (field, newChecked) => {
        let newPredictorList = {...predictorList};
        newPredictorList[field.name] = {
            ...newPredictorList[field.name],
            checked: newChecked,
        };
        if (!newPredictorList[field.name].hasOwnProperty('polynomialOrder')) {
            newPredictorList[field.name].polynomialOrder = 1;
        }
        if (!newPredictorList[field.name].hasOwnProperty('beta')) {
            newPredictorList[field.name].beta = ['', '', '', ''];
        }
        setPredictorList(newPredictorList);
        let checkedLen = 0;
        for (let name in newPredictorList) {
            checkedLen += (newPredictorList[name].checked ? newPredictorList[name].polynomialOrder : 0);
        }
        let newInteractionTermBetas = [];
        for (let i = 0; i < checkedLen; i++) {
            newInteractionTermBetas.push(new Array(checkedLen).fill(0));
        }
        setInteractionTermBetas(newInteractionTermBetas);
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
                invisible: false,
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
                invisible: false,
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
                {type === FIELD_TYPE_LIST.RESPONSE_VECTOR_LINEAR ?
                    <React.Fragment>
                        <h5>Coefficients of the linear model</h5>
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
                                                  checkPredictor(field, e.target.checked);
                                                  // updateInteractionTermBetas();
                                              }}/>
                                </Grid>
                                <Grid item sm={3}
                                      sx={{
                                          marginTop: '12px',
                                      }}>{field.name}</Grid>
                                <Grid item sm={8}>
                                    <TextField fullWidth
                                               size="small"
                                               label="Beta"
                                               type="number"
                                               value={predictorList[field.name]?.beta?.[0] || ''}
                                               onChange={e => {
                                                   let newPredictorList = {...predictorList};
                                                   if (!newPredictorList.hasOwnProperty(field.name)) {
                                                       newPredictorList[field.name] = {
                                                           beta: ['', '', '', ''],
                                                       };
                                                   } else if (!newPredictorList[field.name].hasOwnProperty('beta')) {
                                                       newPredictorList[field.name].beta = ['', '', '', ''];
                                                   }
                                                   newPredictorList[field.name].beta[0] = e.target.value;
                                                   setPredictorList(newPredictorList);
                                               }}></TextField>
                                </Grid>
                            </Grid>)}
                    </React.Fragment>
                    :
                    showInteractionTermBetas ?
                        <React.Fragment>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={2} sx={{marginTop: '60px'}}>
                                    {numericalFieldList.filter(field => predictorList[field.name]?.checked).map((field, index) =>
                                        <React.Fragment key={index}>
                                            <Grid container sx={{height: '60px'}}>
                                                <Grid item xs={12} sx={{margin: 'auto'}}>{field.name}</Grid>
                                            </Grid>
                                            {Array.from({length: (predictorList[field.name]?.polynomialOrder ? predictorList[field.name]?.polynomialOrder : 1) - 1}).map((_, order) =>
                                                <Grid container sx={{height: '60px'}} key={order}>
                                                    <Grid item xs={12}
                                                          sx={{margin: 'auto'}}>{field.name}<sup>{order + 2}</sup></Grid>
                                                </Grid>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={9} lg={10} sx={{overflowX: 'scroll'}}>
                                    <Table stickyHeader sx={{marginTop: '12px'}}>
                                        <TableHead>
                                            <TableRow sx={{border: 'none'}}>
                                                {numericalFieldList.filter(field => predictorList[field.name]?.checked).map((field, index) =>
                                                    <React.Fragment key={index}>
                                                        <TableCell align="center">{field.name}</TableCell>
                                                        {Array.from({length: (predictorList[field.name]?.polynomialOrder ? predictorList[field.name]?.polynomialOrder : 1) - 1}).map((_, order) =>
                                                            <TableCell align="center"
                                                                       key={order}>{field.name}<sup>{order + 2}</sup></TableCell>
                                                        )}
                                                    </React.Fragment>
                                                )}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {interactionTermBetas.map((row, index) =>
                                                <TableRow key={index}
                                                          sx={{
                                                              border: '1px lightgray solid',
                                                              height: '60px',
                                                              padding: '0'
                                                          }}>
                                                    {interactionTermBetas.map((col, colIndex) =>
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
                            <h5>Coefficients and orders of the polynomial of the linear model</h5>
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
                                                      checkPredictor(field, e.target.checked);
                                                      // updateInteractionTermBetas();
                                                  }}/>
                                    </Grid>
                                    <Grid item sm={3}
                                          sx={{
                                              marginTop: '12px',
                                          }}>{field.name}</Grid>
                                    <Grid item sm={5}>
                                        <TextField fullWidth
                                                   size="small"
                                                   label="Beta"
                                                   type="number"
                                                   value={predictorList[field.name]?.beta?.[0] || ''}
                                                   onChange={e => {
                                                       let newPredictorList = {...predictorList};
                                                       if (!newPredictorList.hasOwnProperty(field.name)) {
                                                           newPredictorList[field.name] = {
                                                               beta: ['', '', '', ''],
                                                           };
                                                       } else if (!newPredictorList[field.name].hasOwnProperty('beta')) {
                                                           newPredictorList[field.name].beta = ['', '', '', ''];
                                                       }
                                                       newPredictorList[field.name].beta[0] = e.target.value;
                                                       setPredictorList(newPredictorList);
                                                   }}></TextField>
                                    </Grid>
                                    <Grid item sm={3}>
                                        <FormControl fullWidth>
                                            <InputLabel>Polynomial Order</InputLabel>
                                            <Select value={predictorList[field.name]?.polynomialOrder || 1}
                                                    label="Polynomial Order"
                                                    size="small"
                                                    onChange={e => {
                                                        let newPredictorList = {...predictorList};
                                                        if (!newPredictorList.hasOwnProperty(field.name)) {
                                                            newPredictorList[field.name] = {};
                                                        }
                                                        newPredictorList[field.name].polynomialOrder = Number(e.target.value);
                                                        setPredictorList(newPredictorList);
                                                        let checkedLen = 0;
                                                        for (let name in newPredictorList) {
                                                            checkedLen += (newPredictorList[name].checked ? newPredictorList[name].polynomialOrder : 0);
                                                        }
                                                        let newInteractionTermBetas = [];
                                                        for (let i = 0; i < checkedLen; i++) {
                                                            newInteractionTermBetas.push(new Array(checkedLen).fill(0));
                                                        }
                                                        setInteractionTermBetas(newInteractionTermBetas);
                                                    }}>
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {Array.from({length: (predictorList[field.name]?.polynomialOrder ? predictorList[field.name]?.polynomialOrder : 1) - 1}).map((_, order) =>
                                        <React.Fragment key={order}>
                                            <Grid item sm={1}></Grid>
                                            <Grid item sm={3}
                                                  sx={{
                                                      marginTop: '12px',
                                                  }}>{field.name}<sup>{order + 2}</sup></Grid>
                                            <Grid item sm={5}>
                                                <TextField fullWidth
                                                           key={order}
                                                           size="small"
                                                           label="Beta"
                                                           type="number"
                                                           sx={{marginTop: '6px'}}
                                                           value={predictorList[field.name]?.beta?.[order + 1] || ''}
                                                           onChange={e => {
                                                               let newPredictorList = {...predictorList};
                                                               if (!newPredictorList.hasOwnProperty(field.name)) {
                                                                   newPredictorList[field.name] = {
                                                                       beta: ['', '', '', ''],
                                                                   };
                                                               } else if (!newPredictorList[field.name].hasOwnProperty('beta')) {
                                                                   newPredictorList[field.name].beta = ['', '', '', ''];
                                                               }
                                                               newPredictorList[field.name].beta[order + 1] = e.target.value;
                                                               setPredictorList(newPredictorList);
                                                           }}></TextField>
                                            </Grid>
                                            <Grid item sm={3}></Grid>
                                        </React.Fragment>
                                    )}
                                </Grid>)}
                            <Button sx={{marginTop: '12px', float: 'right'}}
                                    onClick={() => {
                                        setShowInteractionTermBetas(true);
                                    }}>Enter Interaction Term Betas</Button>
                        </React.Fragment>
                }
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