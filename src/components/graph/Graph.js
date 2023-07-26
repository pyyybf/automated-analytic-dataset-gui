import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Button,
    Grid,
    Snackbar
} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import {Container, Draggable} from "react-smooth-dnd";
import {
    clearGraph,
    generateCode,
    setAlert,
    setFieldList,
    setShowCodeDialog
} from "../../store/generator/generator.action";
import FieldPaper from "./components/fieldPaper/FieldPaper";
// import GenerateFileBtn from "./components/generateFileBtn/GenerateFileBtn";

export default function Graph() {
    const dispatch = useDispatch();

    const fieldList = useSelector(state => state.generator.fieldList);
    const covarianceMatrix = useSelector(state => state.generator.covarianceMatrix);
    const numberOfRows = useSelector(state => state.generator.numberOfRows);

    const onDrop = e => {
        if (e.payload?.action) {
            e.payload.action();
        } else {
            const {removedIndex, addedIndex, payload} = e;
            if (removedIndex === null && addedIndex === null) return;

            const newFieldList = [...fieldList];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = newFieldList.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                newFieldList.splice(addedIndex, 0, itemToAdd);
            }

            dispatch(setFieldList(newFieldList));
        }
    };
    const onGenerate = () => {
        const responseVector = fieldList.filter(field => field.type.startsWith('RESPONSE_VECTOR_'))[0] || null;
        if (responseVector === null) {
            dispatch(setAlert(true, `Please add a Response Vector!`));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, 3000);
        } else if (fieldList.length === 0 && covarianceMatrix.length === 0) {
            dispatch(setAlert(true, "The definition can't be empty!"));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, 3000);
        } else {
            dispatch(generateCode(numberOfRows, fieldList, covarianceMatrix));
            dispatch(setShowCodeDialog(true));
        }
    };

    return (
        <React.Fragment>
            <Grid container
                  sx={{
                      padding: '12px 24px',
                      backgroundColor: '#f5f5f5',
                      minHeight: '100%',
                  }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Container groupName="1" onDrop={onDrop} style={{height: '100%'}}>
                        {fieldList.map((field, index) => (
                            <Draggable key={index}
                                       style={{
                                           width: '100%',
                                           alignSelf: 'left'
                                       }}>
                                <Box sx={{
                                    p: 1,
                                    bgcolor: 'transparent',
                                    display: 'grid',
                                }}>
                                    <FieldPaper index={index} name={field.name}></FieldPaper>
                                </Box>
                            </Draggable>
                        ))}
                    </Container>
                </Grid>
            </Grid>
            <Snackbar open transitionDuration={0} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <Box>
                    {/*<GenerateFileBtn/>*/}
                    <Button variant="contained"
                            sx={{textTransform: 'none'}}
                            startIcon={<UploadFileOutlinedIcon/>}
                            onClick={onGenerate}>Generate</Button>
                    <Button variant="outlined"
                            sx={{
                                textTransform: 'none',
                                marginLeft: '12px'
                            }}
                            startIcon={<RestartAltIcon/>}
                            onClick={() => {
                                dispatch(clearGraph());
                            }}>Clear</Button>
                </Box>
            </Snackbar>
        </React.Fragment>
    );
}