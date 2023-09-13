import {ALERT_DURATION, HEADER_HEIGHT} from "@/config";
import {
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
} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import React, {useEffect, useState} from "react";
import {setAlert} from "@/store/generator/generator.action";
import {
    getAllAccounts,
    setAccountId,
    setShowChangePwdDialog,
    setShowConfirmDeleteAccountDialog
} from "@/store/account/account.action";
import {useDispatch} from "react-redux";
import ChangePwdDialog from "@/components/dashboard/components/changePwdDialog/ChangePwdDialog";
import ConfirmDeleteDialog from "@/components/dashboard/components/confirmDeleteDialog/ConfirmDeleteDialog";

export default function Dashboard() {
    const dispatch = useDispatch();

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    const HOME_COLOR_TBL = {
        INSTRUCTOR: 'warning',
        TA: 'primary',
    };

    const getAccountList = () => {
        setLoading(true);
        getAllAccounts().then(res => {
            setAccounts(res);
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleChangePwd = (id) => {
        dispatch(setAccountId(id));
        dispatch(setShowChangePwdDialog(true));
    };

    const handleDelete = (id) => {
        dispatch(setAccountId(id));
        dispatch(setShowConfirmDeleteAccountDialog(true));
    };

    // get account list from backend
    useEffect(() => {
        getAccountList();
    }, [dispatch]);

    return (
        <React.Fragment>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                  sx={{height: `calc(100vh - ${HEADER_HEIGHT}px)`, overflowY: 'scroll'}}>
                <Grid item xs={12} sm={10} md={8} sx={{marginTop: '28px'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>Last Name</TableCell>
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>First Name</TableCell>
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>Role</TableCell>
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ?
                                    <TableRow>
                                        <TableCell colSpan={5} sx={{textAlign: 'center'}}>
                                            <CircularProgress/>
                                        </TableCell>
                                    </TableRow>
                                    : accounts.map((account, index) => (
                                        <TableRow key={index}
                                                  sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                            <TableCell component="th" scope="row">
                                                {account.username}
                                            </TableCell>
                                            <TableCell align="center">{account.lastName}</TableCell>
                                            <TableCell align="center">{account.firstName}</TableCell>
                                            <TableCell align="center">
                                                <Chip size="small"
                                                      variant="outlined"
                                                      label={account.role}
                                                      color={HOME_COLOR_TBL[account.role]}/>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton color="primary"
                                                            onClick={() => {
                                                                handleChangePwd(account._id);
                                                            }}>
                                                    <PasswordOutlinedIcon fontSize="small"/>
                                                </IconButton>
                                                <IconButton color="error"
                                                            onClick={() => {
                                                                handleDelete(account._id);
                                                            }}>
                                                    <DeleteOutlineOutlinedIcon fontSize="small"/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <ChangePwdDialog/>
            <ConfirmDeleteDialog onConfirm={getAccountList}/>
        </React.Fragment>
    );
}