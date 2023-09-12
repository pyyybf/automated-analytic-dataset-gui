import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useDispatch, useSelector} from "react-redux";
import {setUserInfo} from "@/store/account/account.action";
import {useNavigate} from "react-router-dom";

const StyledMenu = styled((props) => (
    <Menu elevation={0}
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
          }}
          transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          {...props}/>
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function SelfMenu() {
    const dispatch = useDispatch();
    const firstName = useSelector(state => state.account.firstName);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onSignOut = () => {
        dispatch(setUserInfo({
            token: null,
            username: '',
            firstName: '',
            lastName: '',
        }));
        navigate('/');
    };

    return (
        <React.Fragment>
            <Button variant="text"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon/>}>
                Hi, {firstName}
            </Button>
            <StyledMenu anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}>
                <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon/>
                    Edit
                </MenuItem>
                <Divider sx={{my: 0.5}}/>
                <MenuItem onClick={onSignOut} disableRipple>
                    Sign out
                </MenuItem>
            </StyledMenu>
        </React.Fragment>
    );
}