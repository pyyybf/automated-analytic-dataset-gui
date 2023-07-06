import {createStore, combineReducers} from 'redux';

import {generatorReducer} from "./generator/generator.reducer";

export default createStore(
    combineReducers({
        generator: generatorReducer,
    })
);