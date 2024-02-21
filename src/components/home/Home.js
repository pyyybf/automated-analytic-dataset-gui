import React, {useEffect, useState} from 'react';
import {
    Button,
    Chip,
    CircularProgress,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {ALERT_DURATION, HEADER_HEIGHT} from "@/config";
import {useDispatch, useSelector} from "react-redux";
import {
    clearGraph,
    setCode,
    setCovarianceMatrix,
    setFieldList,
    setNumberOfRows,
} from "@/store/generator/generator.action";
import {setAlert, setShowConfirmDeleteDialog} from "@/store/web/web.action";
import {
    clearAssignment,
    deleteAssignment,
    getAllAssignments,
    getAssignmentById,
    setAssignmentId,
    setAssignmentName,
    setImportCode,
    setOutputs,
    setQuestions,
    setUscID,
    updateAssignmentState,
} from "@/store/assignment/assignment.action";
import {useNavigate} from "react-router-dom";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ConfirmDeleteDialog from "@/components/confirmDeleteDialog/ConfirmDeleteDialog";
import DownloadDataButton from "@/components/home/components/downloadDataBtn/DownloadDataButton";
import DownloadZipButton from "@/components/home/components/downloadZipBtn/DownloadZipBtn";

export default function Home() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.account.token);
    const uscID = useSelector(state => state.assignment.uscID);

    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const STATE_COLOR_TBL = {
        Published: 'primary',
        Draft: 'default',
    };

    const getAssignmentList = () => {
        setLoading(true);
        getAllAssignments(token).then(res => {
            setAssignments(res);
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        }).finally(() => {
            setLoading(false);
        });
    };

    // get assignment list from backend
    useEffect(() => {
        getAssignmentList();
    }, [token, dispatch]);

    const handleEdit = (id, type) => {
        getAssignmentById(id).then(res => {
            dispatch(setNumberOfRows(res.dataset.numberOfRows));
            dispatch(setFieldList(res.dataset.fieldList));
            dispatch(setCovarianceMatrix(res.dataset.covarianceMatrix));
            dispatch(setCode(res.dataset.code, res.dataset.importCode));

            dispatch(setImportCode(res.template.importCode));
            dispatch(setQuestions(res.template.questions));
            dispatch(setOutputs({
                questionOutputs: [],
                importCodeOutput: '',
                fetchDatasetOutput: '',
            }));

            dispatch(setAssignmentName(res.name));
            dispatch(setAssignmentId(res._id));
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        }).finally(() => {
            navigate(`/editor/${type}`);
        });
    };
    const handleDelete = () => {
        deleteAssignment(selectedId).then(res => {
            dispatch(setAlert(true, 'Delete successfully.', 'success'));
            setTimeout(() => {
                dispatch(setAlert(false, 'Delete successfully.', 'success'));
            }, ALERT_DURATION);
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        }).finally(() => {
            getAssignmentList();
        });
    };
    const onDelete = (id) => {
        setSelectedId(id);
        dispatch(setShowConfirmDeleteDialog(true));
    };
    const handleAdd = () => {
        dispatch(clearGraph());
        dispatch(clearAssignment());
        navigate('/editor');
    };
    const handleState = (id, newState) => {
        updateAssignmentState(id, newState).then(res => {
            const alertMsg = `${newState === 'Published' ? 'Publish' : 'Withdraw'} successful!`;
            dispatch(setAlert(true, alertMsg, 'success'));
            setTimeout(() => {
                dispatch(setAlert(false, alertMsg, 'success'));
            }, ALERT_DURATION);
            getAssignmentList();
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        });
    };

    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              sx={{height: `calc(100vh - ${HEADER_HEIGHT}px)`, overflowY: 'scroll'}}>
            <Grid item xs={12} sm={token ? 10 : 8} md={token ? 8 : 6} sx={{marginTop: '28px'}}>
                <TextField size="small"
                           label="USC ID"
                           sx={{float: 'left', marginBottom: '12px'}}
                           value={uscID}
                           onChange={e => {
                               dispatch(setUscID(e.target.value));
                           }}/>
                {token === 'TA' || token === 'INSTRUCTOR' ?
                    <Button startIcon={<AddIcon/>}
                            variant="contained"
                            sx={{float: 'right'}}
                            onClick={handleAdd}>Add a new assignment</Button> : null}
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 500}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{fontWeight: 'bold'}}>Name</TableCell>
                                {token === 'TA' || token === 'INSTRUCTOR' ?
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>ID</TableCell> : null}
                                <TableCell align="center" sx={{fontWeight: 'bold'}}>State</TableCell>
                                <TableCell align="center" sx={{fontWeight: 'bold'}}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ?
                                <TableRow>
                                    <TableCell colSpan={3} sx={{textAlign: 'center'}}>
                                        <CircularProgress/>
                                    </TableCell>
                                </TableRow>
                                : assignments.map((assignment, index) => (
                                    <TableRow key={index}
                                              sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">
                                            {assignment.name}
                                        </TableCell>
                                        {token === 'TA' || token === 'INSTRUCTOR' ?
                                            <TableCell component="th" align="center" scope="row">
                                                {assignment._id}
                                            </TableCell> : null}
                                        <TableCell align="center">
                                            <Chip size="small" label={assignment.state}
                                                  color={STATE_COLOR_TBL[assignment.state]}/>
                                        </TableCell>
                                        <TableCell align="left">
                                            <DownloadDataButton assignmentId={assignment._id}
                                                                assignmentName={assignment.name}/>
                                            {token === 'TA' || token === 'INSTRUCTOR' ? <React.Fragment>
                                                <DownloadZipButton assignmentId={assignment._id}
                                                                   assignmentName={assignment.name}/>
                                                {assignment.state === 'Draft' ? <React.Fragment>
                                                        <Tooltip title="Publish">
                                                            <IconButton color="primary"
                                                                        sx={{marginLeft: '12px'}}
                                                                        onClick={() => {
                                                                            handleState(assignment._id, 'Published');
                                                                        }}>
                                                                <CheckCircleOutlinedIcon fontSize="small"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Edit">
                                                            <IconButton color="info"
                                                                        onClick={() => {
                                                                            handleEdit(assignment._id, 'template');
                                                                        }}>
                                                                <EditOutlinedIcon fontSize="small"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton color="error"
                                                                        onClick={() => {
                                                                            onDelete(assignment._id);
                                                                        }}>
                                                                <DeleteOutlinedIcon fontSize="small"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </React.Fragment> :
                                                    <Tooltip title="Withdraw">
                                                        <IconButton color="warning"
                                                                    sx={{marginLeft: '12px'}}
                                                                    onClick={() => {
                                                                        handleState(assignment._id, 'Draft');
                                                                    }}>
                                                            <CancelOutlinedIcon fontSize="small"/>
                                                        </IconButton>
                                                    </Tooltip>}
                                            </React.Fragment> : null}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <ConfirmDeleteDialog unit="assignment" handleDelete={handleDelete}/>
        </Grid>
    );
}