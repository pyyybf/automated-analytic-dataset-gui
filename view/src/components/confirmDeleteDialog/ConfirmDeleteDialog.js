import {setShowConfirmDeleteDialog} from "@/store/web/web.action";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function ConfirmDeleteDialog(props) {
    const dispatch = useDispatch();
    const showConfirmDeleteDialog = useSelector(state => state.web.showConfirmDeleteDialog);

    const handleClose = () => {
        dispatch(setShowConfirmDeleteDialog(false));
    };
    const handleConfirm = () => {
        props.handleDelete();
        handleClose();
    };

    return (
        <Dialog open={showConfirmDeleteDialog} onClose={handleClose}>
            <DialogTitle>
                Confirm Deletion
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this {props.unit}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} autoFocus>Delete</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}