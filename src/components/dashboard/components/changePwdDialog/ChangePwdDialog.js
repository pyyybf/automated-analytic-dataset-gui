import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setShowChangePwdDialog, updatePassword} from "@/store/account/account.action";
import {useState} from "react";
import {setAlert} from "@/store/generator/generator.action";
import {ALERT_DURATION} from "@/config";

const sha256 = require("js-sha256").sha256;

export default function ChangePwdDialog() {
    const dispatch = useDispatch();
    const showChangePwdDialog = useSelector(state => state.account.showChangePwdDialog);
    const accountId = useSelector(state => state.account.currentAccountId);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCloseDialog = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        dispatch(setShowChangePwdDialog(false));
    };
    const handleSubmit = () => {
        if (newPassword !== confirmPassword) {
            dispatch(setAlert(true, 'Password confirmation doesn\'t match the password.', 'warning'));
            setTimeout(() => {
                dispatch(setAlert(false, 'Password confirmation doesn\'t match the password.', 'warning'));
            }, ALERT_DURATION);
            return;
        }
        updatePassword(accountId, sha256(oldPassword), sha256(newPassword)).then(res => {
            dispatch(setAlert(true, 'Password changed successfully.', 'success'));
            setTimeout(() => {
                dispatch(setAlert(false, 'Password changed successfully.', 'success'));
            }, ALERT_DURATION);
            handleCloseDialog();
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        });
    };

    return (
        <Dialog open={showChangePwdDialog} onClose={handleCloseDialog} maxWidth="xs">
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <TextField fullWidth
                           sx={{marginTop: '12px'}}
                           type="password"
                           label="Old password"
                           value={oldPassword}
                           onChange={e => {
                               setOldPassword(e.target.value);
                           }}/>
                <TextField fullWidth
                           sx={{marginTop: '12px'}}
                           label="New password"
                           type="password"
                           value={newPassword}
                           onChange={e => {
                               setNewPassword(e.target.value);
                           }}/>
                <TextField fullWidth
                           sx={{marginTop: '12px'}}
                           label="Confirm new password"
                           type="password"
                           value={confirmPassword}
                           onChange={e => {
                               setConfirmPassword(e.target.value);
                           }}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}