import React from 'react';
import {Button, Box} from "@mui/material";

export default function Options() {
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
                >Unique Identifier</Button>
            </Box>
            <Box sx={buttonBoxStyle}>
                <Button variant="contained"
                        size="large"
                        sx={buttonStyle}
                >Name</Button>
            </Box>
            <Box sx={buttonBoxStyle}>
                <Button variant="contained"
                        size="large"
                        sx={buttonStyle}
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
