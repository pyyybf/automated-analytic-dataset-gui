import React, {useEffect, useState} from 'react';
import {
    Button,
    ButtonGroup,
    Chip, CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
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
    deleteAssignment,
    getAllAssignments,
    getAssignmentById,
    setAssignmentId,
    setAssignmentName,
    setUscID,
    updateAssignmentState,
} from "@/store/assignment/assignment.action";
import {useNavigate} from "react-router-dom";
import DownloadDataBtn from "@/components/downloadDataBtn/DownloadDataBtn";
import ConfirmDeleteDialog from "@/components/confirmDeleteDialog/ConfirmDeleteDialog";

export default function Home() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.account.token);
    const uscID = useSelector(state => state.assignment.uscID);

    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const STATE_COLOR_TBL = {
        published: 'primary',
        draft: 'default',
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

    const handleEdit = (id) => {
        getAssignmentById(id).then(res => {
            dispatch(setNumberOfRows(res.numberOfRows));
            dispatch(setFieldList(res.fieldList));
            dispatch(setCovarianceMatrix(res.covarianceMatrix));
            dispatch(setCode(res.code));
            dispatch(setAssignmentName(res.name));
            dispatch(setAssignmentId(res._id));
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        }).finally(() => {
            navigate('/editor');
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
        dispatch(setAssignmentName(''));
        dispatch(setAssignmentId(''));
        navigate('/editor');
    };
    const handleState = (id, state) => {
        updateAssignmentState(id, state).then(res => {
            dispatch(setAlert(true, `${state === 'published' ? 'Publish' : 'Withdraw'} successful!`, 'success'));
            setTimeout(() => {
                dispatch(setAlert(false, `${state === 'published' ? 'Publish' : 'Withdraw'} successful!`, 'success'));
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
                                            <Chip label={assignment.state}
                                                  color={STATE_COLOR_TBL[assignment.state]}/>
                                        </TableCell>
                                        <TableCell align="left">
                                            <DownloadDataBtn assignmentID={assignment._id}
                                                             assignmentName={assignment.name}/>
                                            {token === 'TA' || token === 'INSTRUCTOR' ? <React.Fragment>
                                                {assignment.state === 'draft' ?
                                                    <ButtonGroup sx={{marginLeft: '12px'}} variant="text">
                                                        <Button onClick={() => {
                                                            handleState(assignment._id, 'published');
                                                        }}>Publish</Button>
                                                        <Button onClick={() => {
                                                            handleEdit(assignment._id);
                                                        }}>Edit</Button>
                                                        <Button color="error"
                                                                onClick={() => {
                                                                    onDelete(assignment._id);
                                                                }}>Delete</Button>
                                                    </ButtonGroup> :
                                                    <Button color="error"
                                                            sx={{marginLeft: '12px'}}
                                                            onClick={() => {
                                                                handleState(assignment._id, 'draft');
                                                            }}>Withdraw</Button>}
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