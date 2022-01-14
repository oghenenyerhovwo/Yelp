import { combineReducers } from "redux";
import campgroundReducer from "./campgroundReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";
import generalReducer from "./generalReducer";
import fileReducer from "./fileReducer";

export default combineReducers({
    campgroundState: campgroundReducer,
    commentState: commentReducer,
    userState: userReducer,
    generalState: generalReducer,
    fileState: fileReducer,
});
