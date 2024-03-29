import React from 'react';
import {Button, Box} from "@mui/material";
import {
    addAddress,
    addDate,
    addName,
    setShowAddressDialog,
    setShowBetaDialog,
    setShowCategoricalDialog,
    setShowCategoricalToNumericalDialog,
    setShowDateDialog,
    setShowMultiCollinearDialog,
    setShowMultivariateNormalDialog,
    setShowNameDialog,
    setShowPolynomialCategoricalDialog,
    setShowResponseVectorDialog,
    setShowUniformDialog,
    setShowUniqueIdentifierDialog
} from "@/store/generator/generator.action";
import {setAlert} from "@/store/web/web.action";
import {useDispatch, useSelector} from "react-redux";
import {Container, Draggable} from 'react-smooth-dnd';
import {NUMERIC_TYPE_LIST, RESPONSE_VECTOR_TYPE_PRE} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function Options() {
    const dispatch = useDispatch();
    const addressGroupNum = useSelector(state => state.generator.addressGroupNum);
    const fieldList = useSelector(state => state.generator.fieldList);

    const BUTTON_BOX_STYLE = {
        padding: '18px',
    };
    const BUTTON_STYLE = {
        paddingY: '12px',
    };
    const BUTTON_LIST = [
        // {
        //     text: 'Unique Identifier',
        //     onClick: () => {
        //         dispatch(setShowUniqueIdentifierDialog(true));
        //     }
        // },
        {
            text: 'Name',
            onClick: () => {
                dispatch(setShowNameDialog(true));
            }
        },
        {
            text: 'Address',
            onClick: () => {
                dispatch(setShowAddressDialog(true));
            }
        },
        {
            text: 'Date',
            onClick: () => {
                dispatch(setShowDateDialog(true));
            }
        },
        // categorical
        {
            text: 'Category - General',
            onClick: () => {
                dispatch(setShowCategoricalDialog(true));
            }
        },
        // numerical
        {
            text: 'Multivariate Normal Distributed',
            onClick: () => {
                dispatch(setShowMultivariateNormalDialog(true));
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
            text: 'Beta Distributed',
            onClick: () => {
                dispatch(setShowBetaDialog(true));
            }
        },
        {
            text: 'Categorical to Numerical',
            onClick: () => {
                dispatch(setShowCategoricalToNumericalDialog(true));
            }
        },
        {
            text: 'Multicollinear',
            onClick: () => {
                // check if numeric column exists
                if (fieldList.filter(field => NUMERIC_TYPE_LIST.includes(field.type)).length === 0) {
                    dispatch(setAlert(true, `Please add a numeric field first!`));
                    setTimeout(() => {
                        dispatch(setAlert(false));
                    }, ALERT_DURATION);
                    return;
                }
                dispatch(setShowMultiCollinearDialog(true));
            }
        },
        // {
        //     text: 'Polynomial Categorical',
        //     onClick: () => {
        //         dispatch(setShowPolynomialCategoricalDialog(true));
        //     }
        // },
        // response
        {
            text: 'Response Vector',
            onClick: () => {
                const responseVector = fieldList.filter(field => field.type.startsWith(RESPONSE_VECTOR_TYPE_PRE))[0] || null;
                if (responseVector) {
                    dispatch(setAlert(true, `Response Vector ${responseVector.name} exists!`));
                    setTimeout(() => {
                        dispatch(setAlert(false));
                    }, ALERT_DURATION);
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
