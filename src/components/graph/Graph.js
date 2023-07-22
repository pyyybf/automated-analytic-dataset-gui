import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Button,
    Grid,
    Snackbar
} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {Container, Draggable} from "react-smooth-dnd";
import {setFieldList} from "../../store/generator/generator.action";
import FieldPaper from "./components/fieldPaper/FieldPaper";
// import GenerateFileBtn from "./components/generateFileBtn/GenerateFileBtn";

export default function Graph() {
    const dispatch = useDispatch();

    const fieldList = useSelector(state => state.generator.fieldList);

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

    return (
        <React.Fragment>
            <Grid container sx={{padding: '12px 24px', height: 'calc(100% - 24px)'}}>
                <Grid item xs={12} sm={6} md={4}>
                    <Container groupName="1" onDrop={onDrop} style={{height: '100%'}}>
                        {fieldList.map((field, index) => (
                            <Draggable key={index}>
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
            <Snackbar open transitionDuration={0}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <Box>
                    {/*<GenerateFileBtn/>*/}
                    <Button variant="outlined"
                            sx={{
                                textTransform: 'none',
                                marginLeft: '12px'
                            }}
                            startIcon={<RestartAltIcon/>}
                            onClick={() => {
                                dispatch(setFieldList([]));
                            }}>Clear</Button>
                </Box>
            </Snackbar>
        </React.Fragment>
    );
}