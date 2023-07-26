import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addUniqueIdentifier, setShowUniformDialog} from "../../store/generator/generator.action";
import {useState} from "react";

export default function UniformDialog() {
    const dispatch = useDispatch();
    const showUniformDialog = useSelector(state => state.generator.showUniformDialog);

    const [predictorName, setPredictorName] = useState('');
    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(1);

    const handleCloseDialog = () => {
        dispatch(setShowUniformDialog(false));
    };
    const initDialog = () => {
        setPredictorName('');
        setLowerBound(0);
        setUpperBound(1);
    };

    return (
        <Dialog open={showUniformDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Uniformly Distributed</DialogTitle>
            <DialogContent>
                <TextField variant="outlined"
                           label="Name"
                           sx={{marginTop: '12px', width: '100%'}}
                           value={predictorName}
                           onChange={e => {
                               setPredictorName(e.target.value);
                           }}/>
                <Grid container spacing={1} sx={{marginTop: '12px'}}>
                    <Grid item xs={12} sm={6}>
                        <TextField variant="outlined"
                                   label="Lower Bound"
                                   type="number"
                                   value={lowerBound}
                                   onChange={e => {
                                       setLowerBound(e.target.value);
                                   }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField variant="outlined"
                                   label="Upper Bound"
                                   type="number"
                                   value={upperBound}
                                   onChange={e => {
                                       setUpperBound(e.target.value);
                                   }}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button sx={{textTransform: 'none'}}
                        onClick={() => {
                            dispatch(addUniqueIdentifier({
                                type: 'UNIFORM',
                                name: predictorName,
                                lowerBound,
                                upperBound,
                            }));
                            initDialog();
                            handleCloseDialog();
                        }}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}