import axios from "../../node_modules/axios/index";
import {
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAIL,
} from "../constants/fileConstant"

import { setHeader, setErrorMessage } from "../utils";

export const uploadFile = file => (dispatch, getState) => {
    dispatch({type: UPLOAD_FILE_REQUEST});
    const bodyFormData = new FormData()
    bodyFormData.append("image", file)
    axios
        .post("/api/files/", bodyFormData, setHeader(getState))
        .then(res =>
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => dispatch({type: UPLOAD_FILE_FAIL, payload: setErrorMessage(err)}))
};