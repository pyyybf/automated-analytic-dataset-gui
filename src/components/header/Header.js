import './Header.css';
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setNumberOfRows} from "../../store/generator/generator.action";

export default function Header() {
    const dispatch = useDispatch();

    const numberOfRows = useSelector(state => state.generator.numberOfRows);

    return (
        <header>
            <div className="header-item">
                <h1 style={{color: '#1976d2'}}>Predictor Matrix Definition</h1>
            </div>
            <div className="header-item">
                <TextField label="Number of Rows"
                           size="small"
                           type="number"
                           value={numberOfRows}
                           onChange={e => {
                               dispatch(setNumberOfRows(e.target.value));
                           }}/>
            </div>
        </header>
    );
}
