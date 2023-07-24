import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid, TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addUniqueIdentifier, setShowUniformDialog} from "../../store/generator/generator.action";
import {useState} from "react";

export default function UniformDialog() {
    const dispatch = useDispatch();
    const showUniformDialog = useSelector(state => state.generator.showUniformDialog);

    const INITIAL_UNIFORM = {
        type: 'UNIFORM',
        name: '',
        lowerBound: 0,
        upperBound: 1
    };

    const [uniform, setUniform] = useState({...INITIAL_UNIFORM});

    const handleCloseDialog = () => {
        dispatch(setShowUniformDialog(false));
    };

    return (
        <Dialog open={showUniformDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Uniformly Distributed</DialogTitle>
            <DialogContent>
                <TextField variant="outlined"
                           label="Name"
                           sx={{marginTop: '12px', width: '100%'}}
                           value={uniform.name}
                           onChange={e => {
                               setUniform({...uniform, name: e.target.value});
                           }}/>
                <Grid container spacing={1} sx={{marginTop: '12px'}}>
                    <Grid item xs={12} sm={6}>
                        <TextField variant="outlined"
                                   label="Lower Bound"
                                   type="number"
                                   value={uniform.lowerBound}
                                   onChange={e => {
                                       setUniform({...uniform, lowerBound: e.target.value});
                                   }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField variant="outlined"
                                   label="Upper Bound"
                                   type="number"
                                   value={uniform.upperBound}
                                   onChange={e => {
                                       setUniform({...uniform, upperBound: e.target.value});
                                   }}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button sx={{textTransform: 'none'}}
                        onClick={() => {
                            dispatch(addUniqueIdentifier(uniform));
                            setUniform({...INITIAL_UNIFORM});
                            handleCloseDialog();
                        }}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}