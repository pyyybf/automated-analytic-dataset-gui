import React from "react";
import {useSelector} from "react-redux";

export default function Graph() {
    const fieldList = useSelector(state => state.generator.fieldList);

    return (
        <React.Fragment>
            {fieldList.map((field, index) =>
                <p key={index}>{field.name}</p>
            )}
        </React.Fragment>
    );
}