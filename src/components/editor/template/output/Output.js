import {Box, Typography} from "@mui/material";
import React from "react";
import './Output.css';

export default function Output(props) {
    return (
        <Box sx={{
            display: 'flex',
        }}>
            <Typography variant="subtitle1"
                        color="error"
                        sx={{
                            marginTop: '8px',
                            fontFamily: 'monospace',
                        }}>Out:&nbsp;</Typography>
            <div className="output"
                 dangerouslySetInnerHTML={{__html: props.content}}
                 style={props.content.startsWith('<') ? null : {
                     whiteSpace: 'pre',
                 }}
            />
        </Box>
    );
}