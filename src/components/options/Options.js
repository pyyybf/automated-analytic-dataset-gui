import React from 'react';
import {Button, Box} from "@mui/material";
import {
    addAddress,
    addName,
    setShowMultivariateNormalDialog,
    setShowUniqueIdentifierDialog
} from "../../store/generator/generator.action";
import {useDispatch, useSelector} from "react-redux";
import {Container, Draggable} from 'react-smooth-dnd';

export default function Options() {
    const dispatch = useDispatch();

    const addressGroupNum = useSelector(state => state.generator.addressGroupNum);

    const buttonBoxStyle = {
        padding: '16px 24px'
    };
    const buttonStyle = {
        width: '80%',
        textTransform: 'none',
        paddingY: '16px',
    };

    const buttonList = [
        {
            text: 'Unique Identifier',
            onClick: () => {
                dispatch(setShowUniqueIdentifierDialog(true));
            }
        },
        {
            text: 'Name',
            onClick: () => {
                dispatch(addName());
            }
        },
        {
            text: 'Address',
            onClick: () => {
                dispatch(addAddress(addressGroupNum));
            }
        },
        {
            text: 'Multivariate Normal',
            onClick: () => {
                dispatch(setShowMultivariateNormalDialog(true));
            }
        },
        {
            text: 'Category - General',
            onClick: () => {
                // TODO
            }
        },
        {
            text: 'Poisson - General',
            onClick: () => {
                // TODO
            }
        },
    ];

    const getChildPayload = key => {
        if (key < buttonList.length) {
            return {action: buttonList[key].onClick};
        }
    };

    return (
        <React.Fragment>
            <Container groupName="1" behaviour="copy" getChildPayload={getChildPayload}>
                {buttonList.map((btn, index) =>
                    <Draggable key={index}>
                        <Box sx={buttonBoxStyle}>
                            <Button variant="contained"
                                    size="large"
                                    sx={buttonStyle}
                                    onClick={btn.onClick}
                            >{btn.text}</Button>
                        </Box>
                    </Draggable>)}
            </Container>
        </React.Fragment>
    );
}
