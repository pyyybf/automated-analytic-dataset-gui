import React from "react";
import {useSelector} from "react-redux";

export default function Graph() {
    const fieldList = useSelector(state => state.generator.fieldList);

    return (
        <React.Fragment>
            {fieldList.map(field =>
                <p key={field.name}>{field.name}</p>
            )}
        </React.Fragment>
    );
}