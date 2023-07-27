import {Box, IconButton, Paper, styled, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAlert, setCovarianceMatrix, setFieldList} from "../../../../store/generator/generator.action";
import {
    CATEGORY_TYPE_LIST,
    FIELD_TYPE_LIST,
    NUMERIC_TYPE_LIST,
    RESPONSE_VECTOR_TYPE_PRE
} from "../../../../utils/codeGenerator";
import {ALERT_DURATION} from "../../../../config";

export const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

export default function FieldItem(props) {
    const dispatch = useDispatch();
    const fieldList = useSelector(state => state.generator.fieldList);
    const covarianceMatrix = useSelector(state => state.generator.covarianceMatrix);

    const [edit, setEdit] = useState(false);
    const [currentName, setCurrentName] = useState(props.name);

    const handleEdit = () => {
        if (currentName === '') {
            dispatch(setAlert(true, 'The name can\'t be empty'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        let newFieldList = [...fieldList];
        const oldName = newFieldList[props.index].name;
        newFieldList[props.index].name = currentName;
        // manage the field name in other fields
        if (CATEGORY_TYPE_LIST.includes(newFieldList[props.index].type)) {
            newFieldList.forEach(field => {
                if (field.type === FIELD_TYPE_LIST.CATEGORICAL_TO_NUMERICAL && field.target === oldName) {
                    field.target = currentName;
                }
            });
        } else if (NUMERIC_TYPE_LIST.includes(newFieldList[props.index].type)) {
            newFieldList.forEach(field => {
                if (field.type === FIELD_TYPE_LIST.MULTICOLLINEAR || field.type.startsWith(RESPONSE_VECTOR_TYPE_PRE)) {
                    if (Object.keys(field.predictorList).includes(oldName)) {
                        field.predictorList[currentName] = {...field.predictorList[oldName]};
                        delete field.predictorList[oldName];
                    }
                }
            });
        }
        dispatch(setFieldList(newFieldList));
        setEdit(false);
    };
    const handleDelete = () => {
        let newFieldList = [...fieldList];
        let delField = newFieldList.splice(props.index, 1)[0];
        // manage the deleted field in other fields
        if (delField.type === FIELD_TYPE_LIST.MULTIVARIATE_NORMAL) {
            // delete it from covariance matrix
            let newCovarianceMatrix = {...covarianceMatrix};
            const groupId = `GROUP_${delField.groupNum}`;
            newCovarianceMatrix[groupId].splice(delField.index, 1);
            newCovarianceMatrix[groupId].forEach(row => {
                row.splice(delField.index, 1);
            });
            dispatch(setCovarianceMatrix(newCovarianceMatrix));
        }
        let deletedFieldList = [];
        if (NUMERIC_TYPE_LIST.includes(delField.type)) {
            deletedFieldList.push(delField);
        }
        if (CATEGORY_TYPE_LIST.includes(delField.type)) {
            // delete it from categorical to numerical, then delete the categorical to numerical from multicollinear and response vector
            let delIdxList = [];
            newFieldList.forEach((field, index) => {
                if (field.type === FIELD_TYPE_LIST.CATEGORICAL_TO_NUMERICAL && field.target === delField.name) {
                    delIdxList.push(index);
                }
            });
            delIdxList.forEach((delIdx, index) => {
                deletedFieldList.push(newFieldList.splice(delIdx - index, 1)[0]);
            });
        }
        // delete numerical fields from multicollinear and response vector
        for (let deletedField of deletedFieldList) {
            newFieldList.forEach(field => {
                if (field.type === FIELD_TYPE_LIST.MULTICOLLINEAR || field.type.startsWith(RESPONSE_VECTOR_TYPE_PRE)) {
                    if (Object.keys(field.predictorList).includes(deletedField.name)) {
                        delete field.predictorList[deletedField.name];
                    }
                }
            });
        }
        dispatch(setFieldList(newFieldList));
    };

    return (
        <Item elevation={3}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '24px',
                paddingRight: '16px',
                height: '100%',
            }}>
                {edit ?
                    <React.Fragment>
                        <TextField size="small"
                                   variant="standard"
                                   value={currentName}
                                   sx={{width: '47%'}}
                                   onChange={e => {
                                       setCurrentName(e.target.value);
                                   }}></TextField>
                        <Box>
                            <IconButton aria-label="check"
                                        color="primary"
                                        onClick={handleEdit}>
                                <CheckIcon/>
                            </IconButton>
                            <IconButton aria-label="close"
                                        onClick={() => {
                                            setEdit(false);
                                        }}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h3>{props.name}</h3>
                        <Box>
                            <IconButton aria-label="edit"
                                        color="primary"
                                        onClick={() => {
                                            setEdit(true);
                                            setCurrentName(props.name);
                                        }}>
                                <EditOutlinedIcon/>
                            </IconButton>
                            <IconButton aria-label="delete"
                                        color="error"
                                        onClick={handleDelete}>
                                <DeleteOutlinedIcon/>
                            </IconButton>
                        </Box>
                    </React.Fragment>}
            </Box>
        </Item>
    );
}