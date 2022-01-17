import axios from "axios";
import {setErrorMessage, setHeader} from "../utils"

import {
    LIST_CAMPGROUNDS_REQUEST, 
    LIST_CAMPGROUNDS_SUCCESS,
    LIST_CAMPGROUNDS_FAIL,
    DETAIL_CAMPGROUND_REQUEST,
    DETAIL_CAMPGROUND_SUCCESS,
    DETAIL_CAMPGROUND_FAIL,
    CREATE_CAMPGROUND_REQUEST,
    CREATE_CAMPGROUND_SUCCESS,
    CREATE_CAMPGROUND_FAIL,
    UPDATE_CAMPGROUND_REQUEST,
    UPDATE_CAMPGROUND_SUCCESS,
    UPDATE_CAMPGROUND_FAIL,
    DELETE_CAMPGROUND_SUCCESS,
    DELETE_CAMPGROUND_FAIL,
    DELETE_CAMPGROUND_REQUEST,
    GET_CAMPGROUND_ARRAY,
} from "../constants/campgroundConstant"
import { UPLOAD_FILE_RESET } from "../constants/fileConstant";

export const listCampgrounds=() => dispatch =>  {
    dispatch({type: LIST_CAMPGROUNDS_REQUEST})
    axios
      .get("https://yelp-back-end.herokuapp.com/api/campgrounds")
      .then(res => dispatch({type: LIST_CAMPGROUNDS_SUCCESS, payload: res.data}))
      .then(() => dispatch({type: GET_CAMPGROUND_ARRAY}))
      .catch(err => dispatch({type: LIST_CAMPGROUNDS_FAIL, payload: setErrorMessage(err)}));
}

export const detailCampground=campgroundId => dispatch =>  {
    dispatch({type: DETAIL_CAMPGROUND_REQUEST})
    axios
      .get("https://yelp-back-end.herokuapp.com/api/campgrounds/" + campgroundId)
      .then(res => dispatch({type: DETAIL_CAMPGROUND_SUCCESS, payload: res.data}))
      .catch(err => dispatch({type: DETAIL_CAMPGROUND_FAIL, payload: setErrorMessage(err)}));
}

export const createCampground=(form) => (dispatch, getState) =>  {
  dispatch({type: CREATE_CAMPGROUND_REQUEST, payload: form})

  axios
    .post("https://yelp-back-end.herokuapp.com/api/campgrounds/", form, setHeader(getState))
    .then(res => {
        dispatch({type: CREATE_CAMPGROUND_SUCCESS, payload: res.data})
        dispatch({type: UPLOAD_FILE_RESET})
    })
    .catch(err => dispatch({type: CREATE_CAMPGROUND_FAIL, payload: setErrorMessage(err)}));
}

export const updateCampground=(campgroundId, form) => (dispatch, getState) =>  {
  dispatch({type: UPDATE_CAMPGROUND_REQUEST, payload: form})
  axios
    .put("https://yelp-back-end.herokuapp.com/api/campgrounds/" + campgroundId, form, setHeader(getState))
    .then(res => dispatch({type: UPDATE_CAMPGROUND_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: UPDATE_CAMPGROUND_FAIL, payload: setErrorMessage(err)}));
}

export const deleteCampground=(campgroundId) => (dispatch, getState) =>  {
  dispatch({type: DELETE_CAMPGROUND_REQUEST, payload: campgroundId})
  axios
    .delete("https://yelp-back-end.herokuapp.com/api/campgrounds/" + campgroundId,setHeader(getState))
    .then(res => dispatch({type: DELETE_CAMPGROUND_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: DELETE_CAMPGROUND_FAIL, payload: setErrorMessage(err)}));
}