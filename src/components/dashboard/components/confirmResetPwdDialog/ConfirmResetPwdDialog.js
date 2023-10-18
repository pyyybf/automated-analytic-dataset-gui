import {
    resetPwd,
    setShowConfirmResetPwdDialog,
} from "@/store/account/account.action";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {setAlert} from "@/store/generator/generator.action";
import {ALERT_DURATION} from "@/config";

export default function ConfirmResetPwdDialog(props) {
    const dispatch = useDispatch();
    const showConfirmResetPwdDialog = useSelector(state => state.account.showConfirmResetPwdDialog);
    const accountId = useSelector(state => state.account.currentAccountId);

    const handleResetPwd = () => {
        resetPwd(accountId).then(res => {
            dispatch(setAlert(true, 'Password reset successfully.', 'success'));
            setTimeout(() => {
                dispatch(setAlert(false, 'Password reset successfully.', 'success'));
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
        dispatch(setShowConfirmResetPwdDialog(false));
    };

    return (
        <Dialog open={showConfirmResetPwdDialog} onClose={handleClose}>
            <DialogTitle>
                Confirm Password Reset
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to reset the password for this account?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleResetPwd} autoFocus>Reset</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}