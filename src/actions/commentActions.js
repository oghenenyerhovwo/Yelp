import axios from "axios";
import {setErrorMessage, setHeader} from "../utils"

import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
    LIST_COMMENT_REQUEST,
    LIST_COMMENT_SUCCESS,
    LIST_COMMENT_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
} from "../constants/commentConstant"

export const createComment=(campgroundId, data) => (dispatch, getState) =>  {
    dispatch({type: CREATE_COMMENT_REQUEST, payload:  {campgroundId, data}})
    axios
      .post(`https://yelp-back-end.herokuapp.com/api/campgrounds/${campgroundId}/comments`, data, setHeader(getState))
      .then(res => dispatch({type: CREATE_COMMENT_SUCCESS, payload: res.data}))
      .catch(err => dispatch({type: CREATE_COMMENT_FAIL, payload: setErrorMessage(err)}));
}

export const listComment=(campgroundId) => dispatch =>  {
    dispatch({type: LIST_COMMENT_REQUEST, payload:  campgroundId})
    axios
      .get(`https://yelp-back-end.herokuapp.com/api/campgrounds/${campgroundId}/comments`,)
      .then(res => dispatch({type: LIST_COMMENT_SUCCESS, payload: res.data}))
      .catch(err => dispatch({type: LIST_COMMENT_FAIL, payload: setErrorMessage(err)}));
}

export const deleteComment=(campgroundId, commentId) => (dispatch, getState) =>  {
  dispatch({type: DELETE_COMMENT_REQUEST, payload:  {campgroundId, commentId}})
  axios
    .delete(`https://yelp-back-end.herokuapp.com/api/campgrounds/${campgroundId}/comments/${commentId}`, setHeader(getState))
    .then(res => dispatch({type: DELETE_COMMENT_SUCCESS, payload: commentId}))
    .catch(err => dispatch({type: DELETE_COMMENT_FAIL, payload: setErrorMessage(err)}));
}