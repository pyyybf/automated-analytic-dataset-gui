import React from 'react';
import {Button, Box} from "@mui/material";
import {addAddress, addName, setShowUniqueIdentifierDialog} from "../../store/generator/generator.action";
import {useDispatch} from "react-redux";

export default function Options() {
    const dispatch = useDispatch();

    const buttonBoxStyle = {
        padding: '12px 24px'
    };
    const buttonStyle = {
        width: '80%',
        textTransform: 'none'
    };

    return (
        <React.Fragment>
            <Box sx={buttonBoxStyle}>
                <Button variant="contained"
                        size="large"
                        sx={buttonStyle}
                        onClick={() => {
                            dispatch(setShowUniqueIdentifierDialog(true));
                        }}
                >Unique Identifier</Button>
            </Box>
            <Box sx={buttonBoxStyle}>
                <Button variant="contained"
                        size="large"
                        sx={buttonStyle}
                        onClick={() => {
                            dispatch(addName());
                        }}
                >Name</Button>
            </Box>
            <Box sx={buttonBoxStyle}>
                <Button variant="contained"
                        size="large"
                        sx={buttonStyle}
                        onClick={() => {
                            dispatch(addAddress());
                        }}
                >Address</Button>
            </Box>
            <Box sx={buttonBoxStyle}>
                <Button variant="contained"
                        size="large"
                        sx={buttonStyle}
                >Multivariate Normal</Button>
            </Box>
            <Box sx={buttonBoxStyle}>
                <Button variant="contained"
                        size="large"
                        sx={buttonStyle}
                >Category - General</Button>
            </Box>
            <Box sx={buttonBoxStyle}>
                <Button variant="contained"
                        size="large"
                        sx={buttonStyle}
                >Poisson - General</Button>
            </Box>
        </React.Fragment>
    );
}
