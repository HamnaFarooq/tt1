import { combineReducers } from "redux";
import auth from "./auth";
import date from "./date";
import project from "./project";


export default combineReducers({
    auth,
    date,
    project
});