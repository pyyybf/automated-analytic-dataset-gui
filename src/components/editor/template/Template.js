import React from "react";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Template() {
    const assignmentName = useSelector(state => state.assignment.assignmentName);

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <h1>{assignmentName}</h1>
            <Button onClick={() => {
                navigate('/editor/dataset');
            }}>Define dataset</Button>
            {/* TODO: Questions & Answers */}
        </React.Fragment>
    );
}