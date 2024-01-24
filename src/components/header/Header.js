import React from 'react';
import './Header.css';
import {Button, IconButton, Tab, Tabs} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "@/store/web/web.action";
import {ALERT_DURATION, HEADER_HEIGHT} from "@/config";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import LoginDialog from "@/components/header/components/loginDialog/LoginDialog";
import {setShowLoginDialog} from "@/store/account/account.action";
import SelfMenu from "@/components/header/components/selfMenu/SelfMenu";
import ChangePwdDialog from "@/components/header/components/changePwdDialog/ChangePwdDialog";

export default function Header() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.account.token);

    const [tab, setTab] = useState('/');

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setTab('/' + location.pathname.split('/')[1]);
        // check auth
        if (location.pathname.startsWith('/editor')) {
            if (token !== 'TA' && token !== 'INSTRUCTOR') {
                dispatch(setAlert(true, 'Please sign in!'));
                setTimeout(() => {
                    dispatch(setAlert(false));
                }, ALERT_DURATION);
                navigate('/');
            }
        } else if (location.pathname === '/dashboard') {
            if (token !== 'INSTRUCTOR') {
                dispatch(setAlert(true, 'Please sign in!'));
                setTimeout(() => {
                    dispatch(setAlert(false));
                }, ALERT_DURATION);
                navigate('/');
            }
        }
    }, [location, token, dispatch, navigate]);

    const onSignIn = () => {
        dispatch(setShowLoginDialog(true));
        navigate('/');
    };

    return (
        <header>
            <div className="header-logo">
                <img src={require('@/assets/autogen-logo.png')} alt="Autogen Logo"/>
                <Tabs centered
                      sx={{marginLeft: '28px'}}
                      value={tab}
                      onChange={(e, newVal) => {
                          setTab(newVal);
                      }}>
                    {token !== 'TA' && token !== 'INSTRUCTOR' ? null :
                        <Tab value="/"
                             component={Link}
                             label="Home"
                             to="/"
                             sx={{height: HEADER_HEIGHT}}/>}
                    {token !== 'TA' && token !== 'INSTRUCTOR' ? null :
                        <Tab value="/editor"
                             component={Link}
                             label="Editor"
                             to="/editor"
                             sx={{height: HEADER_HEIGHT}}/>}
                    {token !== 'INSTRUCTOR' ? null :
                        <Tab value="/dashboard"
                             component={Link}
                             label="Dashboard"
                             to="/dashboard"
                             sx={{height: HEADER_HEIGHT}}/>}
                </Tabs>
            </div>
            <div className="header-item">
                {token ? <SelfMenu/> : <Button variant="outlined" onClick={onSignIn}>Sign in</Button>}
                <IconButton aria-label="github"
                            color="primary"
                            target="_blank"
                            href="https://github.com/Faye-yufan/analytics-dataset/">
                    <GitHubIcon/>
                </IconButton>
            </div>
            <LoginDialog/>
            <ChangePwdDialog/>
        </header>
    );
}
