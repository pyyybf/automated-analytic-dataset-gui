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
                {/*<h2 className="header-title">Predictor Matrix Definition</h2>*/}
                <img className="header-logo" src={require('../../assets/autogen-logo.png')} alt="Autogen Logo"/>
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
