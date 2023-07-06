import {useSelector} from "react-redux";

export default function Graph() {
    const numberOfRows = useSelector(state => state.generator.numberOfRows);

    return (
        <div>{numberOfRows}</div>
    );
}