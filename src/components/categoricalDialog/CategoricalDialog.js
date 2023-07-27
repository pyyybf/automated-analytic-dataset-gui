import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {addCategorical, setShowCategoricalDialog} from "../../store/generator/generator.action";
import React, {useState} from "react";
import {FIELD_TYPE_LIST} from "../../utils/codeGenerator";

export default function CategoricalDialog() {
    const dispatch = useDispatch();
    const showCategoricalDialog = useSelector(state => state.generator.showCategoricalDialog);

    const INITIAL_CATEGORY_LIST = [{name: '', prob: 0}];

    const [predictorName, setPredictorName] = useState('');
    const [categoryList, setCategoryList] = useState([...INITIAL_CATEGORY_LIST]);

    const handleCloseDialog = () => {
        dispatch(setShowCategoricalDialog(false));
    };
    const initDialog = () => {
        setPredictorName('');
        setCategoryList([...INITIAL_CATEGORY_LIST]);
    };
    const handleSubmit = () => {
        // TODO: check validation
        // submit the field data
        dispatch(addCategorical({
            type: FIELD_TYPE_LIST.CATEGORICAL,
            name: predictorName,
            categoryList
        }));
        // clean and close dialog
        initDialog();
        handleCloseDialog();
    };

    const addCategory = () => {
        setCategoryList([...categoryList, ...INITIAL_CATEGORY_LIST]);
    };
    const delCategory = (index) => {
        let newCategoryList = [...categoryList];
        newCategoryList.splice(index, 1);
        setCategoryList(newCategoryList);
    };

    return (
        <Dialog open={showCategoricalDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Categorical - General</DialogTitle>
            <DialogContent>
                <Grid container sx={{marginTop: '12px'}}>
                    <Grid item sm={11}>
                        <TextField fullWidth
                                   variant="outlined"
                                   size="small"
                                   label="Predictor Name"
                                   value={predictorName}
                                   onChange={e => {
                                       setPredictorName(e.target.value);
                                   }}/>
                    </Grid>
                </Grid>
                {categoryList.map((category, index) =>
                    <Grid container spacing={1} sx={{marginTop: '12px'}} key={index}>
                        <Grid item sm={6}>
                            <TextField fullWidth
                                       size="small"
                                       label="Name"
                                       value={category.name}
                                       onChange={e => {
                                           let newCategoryList = [...categoryList];
                                           newCategoryList[index].name = e.target.value;
                                           setCategoryList(newCategoryList);
                                       }}></TextField>
                        </Grid>
                        <Grid item sm={5}>
                            <TextField fullWidth
                                       size="small"
                                       type="number"
                                       label="Probability"
                                       value={category.prob}
                                       onChange={e => {
                                           let newCategoryList = [...categoryList];
                                           newCategoryList[index].prob = e.target.value;
                                           setCategoryList(newCategoryList);
                                       }}></TextField>
                        </Grid>
                        <Grid item sm={1}>
                            <IconButton aria-label="delete"
                                        sx={{textTransform: 'none'}}
                                        onClick={() => {
                                            delCategory(index);
                                        }}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                )}
                <Grid container sx={{marginTop: '12px'}}>
                    <Grid item sm={6}>
                        <Button sx={{textTransform: 'none', marginTop: '16px'}}
                                startIcon={<AddIcon/>}
                                onClick={addCategory}>Add a new category</Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleSubmit}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}