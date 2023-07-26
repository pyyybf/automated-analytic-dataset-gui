import React from 'react';
import {Button, Box} from "@mui/material";
import {
    addAddress,
    addName,
    setAlert,
    setShowBetaDialog,
    setShowCategoricalDialog,
    setShowCategoricalToNumericalDialog,
    setShowMultiCollinearDialog,
    setShowMultivariateNormalDialog,
    setShowPolynomialCategoricalDialog,
    setShowResponseVectorDialog,
    setShowUniformDialog,
    setShowUniqueIdentifierDialog
} from "../../store/generator/generator.action";
import {useDispatch, useSelector} from "react-redux";
import {Container, Draggable} from 'react-smooth-dnd';
import {RESPONSE_VECTOR_TYPE_PRE} from "../../utils/codeGenerator";

export default function Options() {
    const dispatch = useDispatch();
    const addressGroupNum = useSelector(state => state.generator.addressGroupNum);
    const fieldList = useSelector(state => state.generator.fieldList);

    const BUTTON_BOX_STYLE = {
        padding: '18px',
    };
    const BUTTON_STYLE = {
        textTransform: 'none',
        paddingY: '12px',
    };
    const BUTTON_LIST = [
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
                dispatch(setShowCategoricalDialog(true));
            }
        },
        // {
        //     text: 'Poisson - General',
        //     onClick: () => {
        //         // TODO
        //     }
        // },
        {
            text: 'Uniformly Distributed',
            onClick: () => {
                dispatch(setShowUniformDialog(true));
            }
        },
        {
            text: 'Beta',
            onClick: () => {
                dispatch(setShowBetaDialog(true));
            }
        },
        {
            text: 'Category to Numerical',
            onClick: () => {
                dispatch(setShowCategoricalToNumericalDialog(true));
            }
        },
        {
            text: 'Multicollinear',
            onClick: () => {
                dispatch(setShowMultiCollinearDialog(true));
            }
        },
        // {
        //     text: 'Polynomial Categorical',
        //     onClick: () => {
        //         dispatch(setShowPolynomialCategoricalDialog(true));
        //     }
        // },
        {
            text: 'Response Vector',
            onClick: () => {
                const responseVector = fieldList.filter(field => field.type.startsWith(RESPONSE_VECTOR_TYPE_PRE))[0] || null;
                if (responseVector) {
                    dispatch(setAlert(true, `Response Vector ${responseVector.name} exists!`));
                    setTimeout(() => {
                        dispatch(setAlert(false));
                    }, 3000);
                } else {
                    dispatch(setShowResponseVectorDialog(true));
                }
            }
        },
    ];

    const getChildPayload = key => {
        if (key < BUTTON_LIST.length) {
            return {action: BUTTON_LIST[key].onClick};
        }
    };

    return (
        <React.Fragment>
            <Container groupName="1"
                       behaviour="copy"
                       getChildPayload={getChildPayload}>
                {BUTTON_LIST.map((btn, index) =>
                    <Draggable key={index}>
                        <Box sx={BUTTON_BOX_STYLE}>
                            <Button fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={BUTTON_STYLE}
                                    onClick={btn.onClick}
                            >{btn.text}</Button>
                        </Box>
                    </Draggable>)}
            </Container>
        </React.Fragment>
    );
}
