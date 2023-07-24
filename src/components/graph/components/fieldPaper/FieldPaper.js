import {Box, IconButton, Paper, styled, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setFieldList} from "../../../../store/generator/generator.action";

export const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

export default function FieldPaper(props) {
    const dispatch = useDispatch();

    const fieldList = useSelector(state => state.generator.fieldList);

    const [edit, setEdit] = useState(false);
    const [currentName, setCurrentName] = useState(props.name);

    const handleDelete = () => {
        let newFieldList = [...fieldList];
        let delField = newFieldList.splice(props.index, 1)[0];
        // TODO: manage the deleted field in other fields
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
                                        onClick={() => {
                                            let newFieldList = [...fieldList];
                                            newFieldList[props.index].name = currentName;
                                            dispatch(setFieldList(newFieldList));
                                            setEdit(false);
                                        }}>
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