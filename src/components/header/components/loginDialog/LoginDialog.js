import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {login, setShowLoginDialog, setUserInfo} from "@/store/account/account.action";
import {useState} from "react";
import {setAlert} from "@/store/generator/generator.action";
import {ALERT_DURATION} from "@/config";

const sha256 = require("js-sha256").sha256;

export default function LoginDialog() {
    const dispatch = useDispatch();
    const showLoginDialog = useSelector(state => state.account.showLoginDialog);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        dispatch(setShowLoginDialog(false));
    };

    const handleLogin = () => {
        if (username === '' || password === '') {
            dispatch(setAlert(true, 'Incorrect username or password.'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        login(username, sha256(password)).then(res => {
            dispatch(setUserInfo({
                userId: res.id,
                token: res.role,
                username: res.username,
                firstName: res.firstName,
                lastName: res.lastName,
            }));
            setUsername('');
            setPassword('');
            handleClose();
        }).catch(err => {
            dispatch(setAlert(true, err));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
        });
    };

    return (
        <Dialog open={showLoginDialog} onClose={handleClose}>
            <DialogTitle>Sign in as Instructor/TA</DialogTitle>
            <DialogContent>
                <TextField label="Username"
                           type="text"
                           fullWidth
                           variant="outlined"
                           sx={{marginTop: '12px'}}
                           value={username}
                           onChange={e => {
                               setUsername(e.target.value);
                           }}/>
                <TextField label="Password"
                           type="password"
                           fullWidth
                           variant="outlined"
                           sx={{marginTop: '12px'}}
                           value={password}
                           onKeyDown={e => {
                               if (e.key === 'Enter') {
                                   handleLogin();
                               }
                           }}
                           onChange={e => {
                               setPassword(e.target.value);
                           }}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLogin}>Sign in</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}