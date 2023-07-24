import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell, TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addResponseVector, setShowResponseVectorDialog} from "../../store/generator/generator.action";
import React, {useState} from "react";
import {NUMERIC_TYPE_LIST} from "../../utils/codeGenerator";

export default function ResponseVectorDialog() {
    const dispatch = useDispatch();
    const showResponseVectorDialog = useSelector(state => state.generator.showResponseVectorDialog);
    const fieldList = useSelector(state => state.generator.fieldList.filter(field => NUMERIC_TYPE_LIST.includes(field.type)));

    const [type, setType] = useState('LINEAR');
    const [name, setName] = useState('Y');
    const [predictorList, setPredictorList] = useState({});
    const [intercept, setIntercept] = useState(0);
    const [epsilonVariance, setEpsilonVariance] = useState(0);
    const [showInteractionTermBetas, setShowInteractionTermBetas] = useState(false);
    const [interactionTermBetas, setInteractionTermBetas] = useState([]);

    const handleCloseDialog = () => {
        dispatch(setShowResponseVectorDialog(false));
    };
    const initResponseVector = () => {
        setType('LINEAR');
        setName('Y');
        setPredictorList({});
        setIntercept(0);
        setEpsilonVariance(0);
        setShowInteractionTermBetas(false);
        setInteractionTermBetas([]);
    };

    return (
        <Dialog open={showResponseVectorDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Response Vector</DialogTitle>
            <DialogContent>
                <FormControl>
                    <RadioGroup row value={type}
                                onChange={e => {
                                    setType(e.target.value);
                                    setShowInteractionTermBetas(false);
                                }}>
                        <FormControlLabel value="LINEAR" control={<Radio/>} label="Linear"/>
                        <FormControlLabel value="POLYNOMIAL" control={<Radio/>} label="Polynomial"/>
                    </RadioGroup>
                </FormControl>
                <TextField size="small"
                           label="Response Name"
                           sx={{
                               marginTop: '12px',
                               width: '100%',
                           }}
                           value={name}
                           onChange={e => {
                               setName(e.target.value);
                           }}></TextField>
                {showInteractionTermBetas ?
                    <React.Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3} lg={2} sx={{marginTop: '69px'}}>
                                {fieldList.map((field, index) =>
                                    <Grid container sx={{height: '60px'}} key={index}>
                                        <Grid item xs={12} sx={{margin: 'auto'}}>{field.name}</Grid>
                                    </Grid>
                                )}
                            </Grid>
                            <Grid item xs={12} md={9} lg={10} sx={{overflowX: 'scroll'}}>
                                <Table stickyHeader sx={{marginTop: '12px'}}>
                                    <TableHead>
                                        <TableRow sx={{border: 'none'}}>
                                            {fieldList.map((field, index) =>
                                                <TableCell align="center" key={index}>{field.name}</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fieldList.map((row, index) =>
                                            <TableRow key={index}
                                                      sx={{
                                                          border: '1px lightgray solid',
                                                          height: '60px',
                                                          padding: '0'
                                                      }}>
                                                {fieldList.map((col, colIndex) =>
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
                                                                       if (interactionTermBetas.length !== fieldList.length) {
                                                                           for (let i = 0; i < fieldList.length; i++) {
                                                                               newInteractionTermBetas.push(new Array(fieldList.length));
                                                                           }
                                                                       } else {
                                                                           for (let row of interactionTermBetas) {
                                                                               newInteractionTermBetas.push([...row]);
                                                                           }
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
                        <Button sx={{textTransform: 'none', marginTop: '12px', float: 'right'}}
                                onClick={() => {
                                    setShowInteractionTermBetas(false);
                                }}>Back to Coefficients</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h5>Coefficients {type === 'LINEAR' ? '' : 'and orders of the polynomial'} of the linear
                            model</h5>
                        <Grid container spacing={1}>
                            <Grid item sm={4}
                                  sx={{
                                      marginTop: '12px',
                                  }}>Intercept</Grid>
                            <Grid item sm={8}>
                                <TextField size="small"
                                           type="number"
                                           sx={{width: '100%'}}
                                           value={intercept}
                                           onChange={e => {
                                               setIntercept(e.target.value);
                                           }}></TextField>
                            </Grid>
                        </Grid>
                        {fieldList.map((field, index) =>
                            <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                                <Grid item sm={4}
                                      sx={{
                                          marginTop: '12px',
                                      }}>{field.name}</Grid>
                                <Grid item sm={type === 'LINEAR' ? 8 : 4}>
                                    <TextField size="small"
                                               label="Beta"
                                               type="number"
                                               sx={{width: '100%'}}
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
                                {type === 'LINEAR' ? null :
                                    <Grid item sm={4}>
                                        <TextField size="small"
                                                   label="Polynomial Order"
                                                   type="number"
                                                   sx={{width: '100%'}}
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
                        {type === 'LINEAR' ? null :
                            <Button sx={{textTransform: 'none', marginTop: '12px', float: 'right'}}
                                    onClick={() => {
                                        setShowInteractionTermBetas(true);
                                    }}>Enter Interaction Term Betas</Button>}
                    </React.Fragment>}
                <TextField size="small"
                           type="number"
                           label="Epsilon Variance"
                           sx={{
                               marginTop: '24px',
                               width: '100%',
                           }}
                           value={epsilonVariance}
                           onChange={e => {
                               setEpsilonVariance(e.target.value);
                           }}></TextField>
            </DialogContent>
            <DialogActions>
                <Button sx={{textTransform: 'none'}}
                        onClick={() => {
                            if (type === 'LINEAR') {
                                dispatch(addResponseVector({
                                    type: 'RESPONSE_VECTOR_LINEAR',
                                    name,
                                    predictorList,
                                    intercept,
                                    epsilonVariance
                                }));
                            } else {
                                if (interactionTermBetas.length !== fieldList.length) {
                                    let newInteractionTermBetas = [];
                                    for (let i = 0; i < fieldList.length; i++) {
                                        newInteractionTermBetas.push(new Array(fieldList.length).fill(0));
                                    }
                                    setInteractionTermBetas(newInteractionTermBetas);
                                }
                                dispatch(addResponseVector({
                                    type: 'RESPONSE_VECTOR_POLYNOMIAL',
                                    name,
                                    predictorList,
                                    intercept,
                                    interactionTermBetas,
                                    epsilonVariance
                                }));
                            }
                            initResponseVector();
                            handleCloseDialog();
                        }}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}