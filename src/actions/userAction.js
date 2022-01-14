import axios from "axios";
import {setErrorMessage, setHeader} from "../utils"
import { 
    SIGNIN_USER_REQUEST, 
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAIL,
    SIGNOUT_USER,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LIST_USERS_REQUEST,
    LIST_USERS_SUCCESS,
    LIST_USERS_FAIL,
    UPDATE_USER_ROLE_REQUEST,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL
} from "../constants/userConstants";

export const signInUser=(userData) => dispatch =>  {
    dispatch({type: SIGNIN_USER_REQUEST, payload:  userData})
    axios
      .post(`/api/users/signin`, userData)
      .then(res => {
        dispatch({type: SIGNIN_USER_SUCCESS, payload: res.data})
        localStorage.setItem("yelp_camp_user", JSON.stringify(res.data))
      })
      .catch(err => dispatch({type: SIGNIN_USER_FAIL, payload: setErrorMessage(err)}));
}

export const signOutUser=() => dispatch =>  {
  dispatch({type: SIGNOUT_USER,})
  localStorage.removeItem("yelp_camp_user")
}

export const registerUser=(userData) => dispatch =>  {
  dispatch({type: REGISTER_USER_REQUEST, payload:  userData})
  axios
    .post(`/api/users/register`, userData)
    .then(res => {
      dispatch({type: REGISTER_USER_SUCCESS, payload: res.data})
      localStorage.setItem("yelp_camp_user", JSON.stringify(res.data))
    })
    .catch(err => dispatch({type: REGISTER_USER_FAIL, payload: setErrorMessage(err)}));
}

export const listUsers=() => (dispatch, getState) =>  {
  dispatch({type: LIST_USERS_REQUEST,})
  axios
    .get(`/api/users/`, setHeader(getState))
    .then(res => {
      dispatch({type: LIST_USERS_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: LIST_USERS_FAIL, payload: setErrorMessage(err)}));
}

export const updateUserRole=(userId, data) => (dispatch, getState) =>  {
  dispatch({type: UPDATE_USER_ROLE_REQUEST,})
  axios
    .put(`/api/users/${userId}/role`,{role: data}, setHeader(getState))
    .then(res => {
      dispatch({type: UPDATE_USER_ROLE_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: UPDATE_USER_ROLE_FAIL, payload: setErrorMessage(err)}));
}