import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Tooltip,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import {useNavigate} from "react-router-dom";
import {ALERT_DURATION, HEADER_HEIGHT} from "@/config";
import {
    runNotebook,
    setQuestions,
    setImportCode,
    setAssignmentName,
    saveAssignment,
    setAssignmentId,
    setOutputs,
    setFetchDatasetCode,
} from "@/store/assignment/assignment.action";
import CodeCell from "@/components/editor/template/codeCell/CodeCell";
import Output from "@/components/editor/template/output/Output";
import {setAlert} from "@/store/web/web.action";

export default function Template() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const assignmentId = useSelector(state => state.assignment.assignmentId);
    const assignmentName = useSelector(state => state.assignment.assignmentName);
    const importCode = useSelector(state => state.assignment.importCode);
    const fetchDatasetCode = useSelector(state => state.assignment.fetchDatasetCode);
    const questions = useSelector(state => state.assignment.questions);

    const questionOutputs = useSelector(state => state.assignment.questionOutputs);
    const importCodeOutput = useSelector(state => state.assignment.importCodeOutput);
    const fetchDatasetOutput = useSelector(state => state.assignment.fetchDatasetOutput);

    const code = useSelector(state => state.generator.code);
    const importCodeData = useSelector(state => state.generator.importCode);
    const numberOfRows = useSelector(state => state.generator.numberOfRows);
    const fieldList = useSelector(state => state.generator.fieldList);
    const covarianceMatrix = useSelector(state => state.generator.covarianceMatrix);

    const [running, setRunning] = useState(false);

    const updateQuestion = (newQuestion, qidx) => {
        let newQuestions = [...questions];
        newQuestions[qidx] = newQuestion;
        dispatch(setQuestions(newQuestions));
    };

    const updateSubquestion = (newSubquestion, subqidx, qidx) => {
        let newQuestion = {...questions[qidx]};
        newQuestion.subquestions[subqidx] = newSubquestion;
        updateQuestion(newQuestion, qidx);
    };

    const handleSave = () => {
        const dataset = {
            code,
            importCode: importCodeData,
            numberOfRows,
            fieldList,
            covarianceMatrix,
        };
        const template = {
            questions,
            importCode,
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

    const handleBackToTop = (e) => {
        const anchor = (e.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );
        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    const handleRun = () => {
        setRunning(true);
        runNotebook(assignmentId, importCode, fetchDatasetCode, questions).then(res => {
            dispatch(setOutputs({
                questionOutputs: res.questions,
                importCodeOutput: res.importCode,
                fetchDatasetOutput: res.fetchDataset,
            }));
        }).catch(err => {
            console.log(err)
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        }).finally(() => {
            setRunning(false);
        });
    };

    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              sx={{
                  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                  overflowY: 'scroll',
                  textAlign: 'left',
                  paddingBottom: '36px',
              }}>
            <Toolbar id="back-to-top-anchor"/>
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px lightgrey solid',
                    marginBottom: '12px',
                }}>
                    <InputBase value={assignmentName}
                               placeholder={'Enter the assignment name'}
                               onChange={e => {
                                   dispatch(setAssignmentName(e.target.value));
                               }}
                               sx={{
                                   flexGrow: 1,
                                   mr: 1,
                                   fontSize: '2em',
                                   fontWeight: 'bold',
                               }}/>
                    <Button startIcon={<DatasetOutlinedIcon/>}
                            onClick={() => {
                                navigate('/editor/dataset');
                            }}>Define dataset</Button>
                    <Button startIcon={<SaveIcon/>} variant="contained"
                            sx={{marginLeft: '12px'}}
                            onClick={handleSave}>Save</Button>
                </Box>
                <CodeCell code={importCode}
                          onChange={(newVal) => {
                              dispatch(setImportCode(newVal));
                          }}/>
                {importCodeOutput ? <Output content={importCodeOutput}/> : null}
                <CodeCell code={fetchDatasetCode}
                          onChange={(newVal) => {
                              dispatch(setFetchDatasetCode(newVal));
                          }}/>
                {fetchDatasetOutput ? <Output content={fetchDatasetOutput}/> : null}
                <Grid container>
                    {questions.map((question, qidx) => <React.Fragment key={qidx}>
                        <Grid item xs={12} sx={{marginBottom: '12px'}}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                <h2>Question {qidx + 1}:</h2>
                                <InputBase value={question.title}
                                           placeholder={`Enter the title of Question ${qidx + 1}`}
                                           onChange={e => {
                                               let newQuestion = {
                                                   ...question,
                                                   title: e.target.value,
                                               };
                                               updateQuestion(newQuestion, qidx);
                                           }}
                                           sx={{
                                               fontSize: '1.5rem',
                                               fontWeight: 'bold',
                                               flexGrow: 1,
                                               marginTop: '4px',
                                           }}/>
                                <Tooltip title="Delete question">
                                    <IconButton size="small" color="error" onClick={e => {
                                        let newQuestions = [...questions];
                                        newQuestions.splice(qidx, 1);
                                        dispatch(setQuestions(newQuestions));
                                    }}>
                                        <DeleteOutlinedIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <InputBase multiline fullWidth
                                       value={question.description}
                                       placeholder={`Enter the description of Question ${qidx + 1}`}
                                       onChange={e => {
                                           let newQuestion = {
                                               ...question,
                                               description: e.target.value,
                                           };
                                           updateQuestion(newQuestion, qidx);
                                       }}/>
                        </Grid>
                        {question.subquestions.map((subquestion, subqidx) => <React.Fragment key={subqidx}>
                            <Grid item xs={2} sm={1}
                                  sx={{
                                      textAlign: 'right',
                                      paddingX: '4px',
                                      paddingY: '4px'
                                  }}>
                                <b style={{
                                    lineHeight: '22px'
                                }}>Q{qidx + 1}.{subqidx + 1}</b>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <InputBase multiline fullWidth
                                           value={subquestion.description}
                                           placeholder={`Enter the description of Q${qidx + 1}.${subqidx + 1}`}
                                           onChange={e => {
                                               let newSubquestion = {
                                                   ...subquestion,
                                                   description: e.target.value,
                                               };
                                               updateSubquestion(newSubquestion, subqidx, qidx);
                                           }}/>
                                <FormControlLabel label="Manual Grading"
                                                  control={
                                                      <Checkbox checked={subquestion.manual}
                                                                onChange={e => {
                                                                    let newSubquestion = {
                                                                        ...subquestion,
                                                                        manual: e.target.checked,
                                                                    };
                                                                    if ((!e.target.checked) && newSubquestion.outputType === 'text') {
                                                                        newSubquestion.outputType = 'number';
                                                                    }
                                                                    updateSubquestion(newSubquestion, subqidx, qidx);
                                                                }}/>
                                                  }/>
                                {subquestion.outputType === 'text' ?
                                    <InputBase multiline fullWidth
                                               value={subquestion.code}
                                               placeholder={`Enter the solution of Q${qidx + 1}.${subqidx + 1}`}
                                               onChange={e => {
                                                   let newSubquestion = {
                                                       ...subquestion,
                                                       code: e.target.value,
                                                   };
                                                   updateSubquestion(newSubquestion, subqidx, qidx);
                                               }}/> :
                                    <CodeCell code={subquestion.code} onChange={(newVal) => {
                                        let newSubquestion = {
                                            ...subquestion,
                                            code: newVal,
                                        };
                                        updateSubquestion(newSubquestion, subqidx, qidx);
                                    }}/>}
                                {questionOutputs?.[qidx]?.[subqidx] ?
                                    <Output content={questionOutputs?.[qidx]?.[subqidx]}/> : null}
                                <Box sx={{marginY: '12px'}}>
                                    <TextField size="small" type="number"
                                               label="Points"
                                               sx={{width: '5em'}}
                                               value={subquestion.points}
                                               onChange={e => {
                                                   let newSubquestion = {
                                                       ...subquestion,
                                                       points: e.target.value === '' ? '' : Number(e.target.value),
                                                   };
                                                   updateSubquestion(newSubquestion, subqidx, qidx);
                                               }}/>
                                    <FormControl sx={{marginLeft: '24px'}}>
                                        <InputLabel>Output Type</InputLabel>
                                        <Select size="small"
                                                label="Output Type"
                                                sx={{
                                                    width: '8em',
                                                }}
                                                value={subquestion.outputType}
                                                onChange={e => {
                                                    let newSubquestion = {
                                                        ...subquestion,
                                                        outputType: e.target.value,
                                                    };
                                                    updateSubquestion(newSubquestion, subqidx, qidx);
                                                }}>
                                            <MenuItem value="number">Number</MenuItem>
                                            <MenuItem value="string">String</MenuItem>
                                            <MenuItem value="dataframe">DataFrame</MenuItem>
                                            <MenuItem value="dict">Dictionary</MenuItem>
                                            <MenuItem value="list">List</MenuItem>
                                            <MenuItem value="plot">Plot</MenuItem>
                                            {subquestion.manual ? <MenuItem value="text">Text</MenuItem> : null}
                                        </Select>
                                    </FormControl>
                                    {subquestion.outputType === 'number' ?
                                        <TextField type="number" size="small"
                                                   label="Tolerance"
                                                   sx={{
                                                       width: '10em',
                                                       marginLeft: '12px'
                                                   }}
                                                   value={subquestion.tolerance}
                                                   onChange={e => {
                                                       let newSubquestion = {
                                                           ...subquestion,
                                                           tolerance: e.target.value === '' ? '' : Number(e.target.value),
                                                       };
                                                       updateSubquestion(newSubquestion, subqidx, qidx);
                                                   }}/> : null}
                                    <Tooltip title="Delete sub-question">
                                        <IconButton size="small" color="error"
                                                    sx={{marginLeft: '12px'}}
                                                    onClick={e => {
                                                        let newQuestion = {
                                                            ...question,
                                                            subquestions: [...question.subquestions],
                                                        };
                                                        newQuestion.subquestions.splice(subqidx, 1);
                                                        updateQuestion(newQuestion, qidx);
                                                    }}>
                                            <DeleteOutlinedIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </React.Fragment>)}
                        <Grid item xs={12}>
                            <Button startIcon={<AddIcon/>}
                                    size="small"
                                    onClick={e => {
                                        let newQuestion = {
                                            ...question,
                                        };
                                        const subqidx = newQuestion.subquestions.length + 1;
                                        newQuestion.subquestions.push({
                                            description: '',
                                            code: `q_${qidx + 1}_${subqidx} = ...\nq_${qidx + 1}_${subqidx}`,
                                            outputType: 'number',
                                            tolerance: 0,
                                            points: 10,
                                            manual: false,
                                        });
                                        updateQuestion(newQuestion, qidx);
                                    }}>Add a sub-question</Button>
                        </Grid>
                    </React.Fragment>)}
                    <Button variant="outlined"
                            startIcon={<AddIcon/>}
                            sx={{marginTop: '12px'}}
                            onClick={e => {
                                let newQuestions = [...questions];
                                const qidx = newQuestions.length + 1;
                                newQuestions.push({
                                    title: '',
                                    description: '',
                                    subquestions: [{
                                        description: '',
                                        code: `q_${qidx}_1 = ...\nq_${qidx}_1`,
                                        outputType: 'number',
                                        tolerance: 0,
                                        points: 10,
                                        manual: false,
                                    }],
                                });
                                dispatch(setQuestions(newQuestions));
                            }}>Add a question</Button>
                </Grid>
            </Grid>
            <Fab size="medium" color="primary"
                 sx={{
                     position: 'absolute',
                     bottom: 36,
                     right: 36,
                 }}
                 onClick={e => {
                     handleBackToTop(e);
                 }}>
                <ArrowUpwardIcon/>
            </Fab>
            <Box sx={{
                position: 'absolute',
                bottom: 108,
                right: 36,
            }}>
                <Tooltip title="Run all cells" placement="top">
                    <Fab size="medium"
                         color="primary"
                         disabled={running}
                         onClick={handleRun}>
                        <PlayArrowIcon/>
                    </Fab>
                </Tooltip>
                {running && (
                    <CircularProgress
                        size={60}
                        sx={{
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        </Grid>
    );
}