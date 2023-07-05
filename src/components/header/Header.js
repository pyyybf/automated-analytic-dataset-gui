import './Header.css';
import {TextField} from "@mui/material";
import {useState} from "react";

export default function Header() {
    var [numberOfRows, setNumberOfRows] = useState(1000);

    return (
        <header style={{
            borderBottom: '1px lightgray solid',
            display: 'flex',
            justifyContent: 'space-between',
            height: '60px',
            padding: '0 12px'
        }}>
            <div className="header-item">
                <h1 style={{color: '#1976d2'}}>Predictor Matrix Definition</h1>
            </div>
            <div className="header-item">
                <TextField label="Number of Rows"
                           size="small"
                           type="number"
                           value={numberOfRows}
                           onChange={e => {
                               setNumberOfRows(e.target.value)
                           }}/>
            </div>
        </header>
    );
}
