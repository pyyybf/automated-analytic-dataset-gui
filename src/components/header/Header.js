import './Header.css';
import {IconButton, TextField} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import {useDispatch, useSelector} from "react-redux";
import {setNumberOfRows} from "../../store/generator/generator.action";

export default function Header() {
    const dispatch = useDispatch();
    const numberOfRows = useSelector(state => state.generator.numberOfRows);

    return (
        <header>
            <div className="header-logo">
                {/*<h2 className="header-title">Predictor Matrix Definition</h2>*/}
                <img src={require('../../assets/autogen-logo.png')} alt="Autogen Logo"/>
            </div>
            <div className="header-item">
                <TextField label="Number of Rows"
                           size="small"
                           type="number"
                           value={numberOfRows}
                           onChange={e => {
                               dispatch(setNumberOfRows(e.target.value));
                           }}/>
                <IconButton aria-label="github"
                            color="primary"
                            target="_blank"
                            href="https://github.com/Faye-yufan/analytics-dataset/">
                    <GitHubIcon/>
                </IconButton>
            </div>
        </header>
    );
}
