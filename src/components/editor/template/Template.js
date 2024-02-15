import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, FormControl, Grid, InputBase, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import {useNavigate} from "react-router-dom";
import {HEADER_HEIGHT} from "@/config";
import {setQuestions, setImportCode, setAssignmentName} from "@/store/assignment/assignment.action";
import CodeCell from "@/components/editor/template/codeCell/CodeCell";

export default function Template() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const assignmentId = useSelector(state => state.assignment.assignmentId);
    const assignmentName = useSelector(state => state.assignment.assignmentName);
    const importCode = useSelector(state => state.assignment.importCode);
    const questions = useSelector(state => state.assignment.questions);

    const READ_DATASET_CODE = `# Please read the dataset in this cell\ndf = pd.read_csv("${assignmentName} - Dataset.csv")\ndf`;

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
                </Box>
                <CodeCell code={importCode} onChange={(newVal) => {
                    dispatch(setImportCode(newVal));
                }}/>
                <CodeCell code={READ_DATASET_CODE} disabled/>
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
                            </Box>
                            <InputBase multiline={true} fullWidth
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
                                <InputBase multiline={true} fullWidth
                                           value={subquestion.description}
                                           placeholder={`Enter the description of Q${qidx + 1}.${subqidx + 1}`}
                                           onChange={e => {
                                               let newSubquestion = {
                                                   ...subquestion,
                                                   description: e.target.value,
                                               };
                                               updateSubquestion(newSubquestion, subqidx, qidx);
                                           }}/>
                                <CodeCell code={subquestion.code} onChange={(newVal) => {
                                    let newSubquestion = {
                                        ...subquestion,
                                        code: newVal,
                                    };
                                    updateSubquestion(newSubquestion, subqidx, qidx);
                                }}/>
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
                                                value={subquestion.output_type}
                                                onChange={e => {
                                                    let newSubquestion = {
                                                        ...subquestion,
                                                        output_type: e.target.value,
                                                    };
                                                    updateSubquestion(newSubquestion, subqidx, qidx);
                                                }}>
                                            <MenuItem value="number">Number</MenuItem>
                                            <MenuItem value="string">String</MenuItem>
                                            <MenuItem value="dataframe">DataFrame</MenuItem>
                                            <MenuItem value="dict">Dictionary</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {subquestion.output_type === 'number' ?
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
                                </Box>
                            </Grid>
                        </React.Fragment>)}
                        <Grid item xs={12} sx={{marginBottom: '12px'}}>
                            <Button startIcon={<AddIcon/>}
                                    size="small"
                                    onClick={e => {
                                        let newQuestion = {
                                            ...question,
                                            description: e.target.value,
                                        };
                                        const subqidx = newQuestion.subquestions.length + 1;
                                        newQuestion.subquestions.push({
                                            description: '',
                                            code: `q_${qidx + 1}_${subqidx} = ...\nq_${qidx + 1}_${subqidx}`,
                                            output_type: 'number',
                                            tolerance: 0,
                                            points: 10,
                                        });
                                        updateQuestion(newQuestion, qidx);
                                    }}>Add a sub-question</Button>
                        </Grid>
                    </React.Fragment>)}
                    <Button variant="outlined"
                            startIcon={<AddIcon/>}
                            onClick={e => {
                                let newQuestions = [...questions];
                                const qidx = newQuestions.length + 1;
                                newQuestions.push({
                                    title: '',
                                    description: '',
                                    subquestions: [{
                                        description: '',
                                        code: `q_${qidx}_1 = ...\nq_${qidx}_1`,
                                        output_type: 'number',
                                        tolerance: 0,
                                        points: 10,
                                    }],
                                });
                                dispatch(setQuestions(newQuestions));
                            }}>Add a question</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}