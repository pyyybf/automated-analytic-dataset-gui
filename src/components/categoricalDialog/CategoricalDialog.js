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
import {addCategorical, setAlert, setShowCategoricalDialog} from "@/store/generator/generator.action";
import React, {useState} from "react";
import {FIELD_TYPE_LIST} from "@/utils/codeGenerator";
import {ALERT_DURATION} from "@/config";

export default function CategoricalDialog() {
    const dispatch = useDispatch();
    const showCategoricalDialog = useSelector(state => state.generator.showCategoricalDialog);

    const INITIAL_CATEGORY_LIST = [{name: '', prob: 1}];

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
        // validate
        if (predictorName === '') {
            dispatch(setAlert(true, 'The predictor name can\'t be empty!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
        let categoryNameList = [];
        for (let category of categoryList) {
            if (category.name === '') {
                dispatch(setAlert(true, 'The category name can\'t be empty!'));
                setTimeout(() => {
                    dispatch(setAlert(false));
                }, ALERT_DURATION);
                return;
            } else if (categoryNameList.includes(category.name)) {
                dispatch(setAlert(true, `The category name ${category.name} repeated!`));
                setTimeout(() => {
                    dispatch(setAlert(false));
                }, ALERT_DURATION);
                return;
            } else if (category.prob < 0) {
                dispatch(setAlert(true, 'The probability of a category should be no less than 0!'));
                setTimeout(() => {
                    dispatch(setAlert(false));
                }, ALERT_DURATION);
                return;
            }
            categoryNameList.push(category.name);
        }
        if (categoryList.reduce((acc, val) => acc + Number(val.prob), 0) <= 0) {
            dispatch(setAlert(true, 'The sum of probabilities should be greater than 0!'));
            setTimeout(() => {
                dispatch(setAlert(false));
            }, ALERT_DURATION);
            return;
        }
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
                                       label="Category Name"
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
                                       InputProps={{
                                           inputProps: {
                                               min: 0
                                           }
                                       }}
                                       onChange={e => {
                                           let newCategoryList = [...categoryList];
                                           newCategoryList[index].prob = e.target.value;
                                           setCategoryList(newCategoryList);
                                       }}></TextField>
                        </Grid>
                        <Grid item sm={1}>
                            <IconButton aria-label="delete"
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
                        <Button sx={{marginTop: '16px'}}
                                startIcon={<AddIcon/>}
                                onClick={addCategory}>Add a new category</Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>OK</Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}