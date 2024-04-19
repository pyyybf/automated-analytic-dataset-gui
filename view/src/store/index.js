import {createStore, combineReducers} from 'redux';

import {generatorReducer} from "./generator/generator.reducer";
import {accountReducer} from "@/store/account/account.reducer";
import {assignmentReducer} from "@/store/assignment/assignment.reducer";
import {webReducer} from "@/store/web/web.reducer";

export default createStore(
    combineReducers({
        generator: generatorReducer,
        account: accountReducer,
        assignment: assignmentReducer,
        web: webReducer,
    })
);