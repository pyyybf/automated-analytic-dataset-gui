import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addMultivariateNormal, setShowMultivariateNormalDialog} from "../../store/generator/generator.action";
import {useState} from "react";

export default function MultivariateNormalDialog() {
    const dispatch = useDispatch();
    const showMultivariateNormalDialog = useSelector(state => state.generator.showMultivariateNormalDialog);

    const [multivariateNormal, setMultivariateNormal] = useState([]);

    const handleCloseDialog = () => {
        dispatch(setShowMultivariateNormalDialog(false));
    };

    return (
        <Dialog open={showMultivariateNormalDialog} onClose={handleCloseDialog} maxWidth="md">
            <DialogTitle>Multivariate Normal</DialogTitle>
            <DialogContent>
                {/* TODO: multivariate normal form */}
            </DialogContent>
            <DialogActions>
                <Button sx={{textTransform: 'none'}}
                        onClick={() => {
                            dispatch(addMultivariateNormal(multivariateNormal));
                            handleCloseDialog();
                        }}>OK</Button>
                <Button sx={{textTransform: 'none'}}
                        onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}