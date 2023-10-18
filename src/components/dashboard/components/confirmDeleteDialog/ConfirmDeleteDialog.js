import {deleteAccount, setShowConfirmDeleteAccountDialog} from "@/store/account/account.action";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {setAlert} from "@/store/generator/generator.action";
import {ALERT_DURATION} from "@/config";

export default function ConfirmDeleteDialog(props) {
    const dispatch = useDispatch();
    const showConfirmDeleteAccountDialog = useSelector(state => state.account.showConfirmDeleteAccountDialog);
    const accountId = useSelector(state => state.account.currentAccountId);

    const handleDelete = () => {
        deleteAccount(accountId).then(res => {
            dispatch(setAlert(true, 'Delete successfully.', 'success'));
            setTimeout(() => {
                dispatch(setAlert(false, 'Delete successfully.', 'success'));
            }, ALERT_DURATION);
            props.onConfirm();
            handleClose();
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        });
    };

    const handleClose = () => {
        dispatch(setShowConfirmDeleteAccountDialog(false));
    };

    return (
        <Dialog open={showConfirmDeleteAccountDialog} onClose={handleClose}>
            <DialogTitle>
                Confirm Deletion
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this account?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} autoFocus>Delete</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}