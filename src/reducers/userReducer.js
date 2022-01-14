import { 
    SIGNIN_USER_REQUEST, 
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAIL,
    SIGNIN_USER_RESET,
    SIGNOUT_USER,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_RESET,
    LIST_USERS_REQUEST,
    LIST_USERS_SUCCESS,
    LIST_USERS_FAIL,
    UPDATE_USER_ROLE_REQUEST,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL,
    UPDATE_USER_ROLE_RESET,
} from "../constants/userConstants";

const initialState={
    // General
    currentUser: localStorage.getItem("yelp_camp_user") ? JSON.parse(localStorage.getItem("yelp_camp_user")) : {},

    // sign in user
    loadingSignInUser:  false,
    errorSignInUser: "",
    successSignInUser: false,

    // register user
    loadingRegisterUser:  false,
    errorRegisterUser: "",
    successRegisterUser: false,

    // list users
    dataListUsers: [],
    loadingListUsers:  false,
    errorListUsers: "",

    // change user role
    loadingUpdateUserRole:  false,
    errorUpdateUserRole: "",
    successUpdateUserRole: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_USER_REQUEST:
        return {...state, loadingSignInUser:  true, errorSignInUser: "",}
    case SIGNIN_USER_SUCCESS:
        return {
            ...state,
            currentUser: action.payload,
            loadingSignInUser:  false,
            successSignInUser: true,
        }
    case SIGNIN_USER_FAIL:
        return {
            ...state, 
            loadingSignInUser:  false,
            errorSignInUser: action.payload,
        }
    case SIGNIN_USER_RESET:
        return {
            ...state, 
            loadingSignInUser:  false,
            errorSignInUser: "",
            successSignInUser: false,
        }

    case SIGNOUT_USER:
        return {
        ...state, 
        currentUser: {}
    }

    case REGISTER_USER_REQUEST:
        return {
            ...state,
            loadingRegisterUser:  true,
            errorRegisterUser: "",
        }
    case REGISTER_USER_SUCCESS:
        return {
            ...state,
            loadingRegisterUser:  false,
            successRegisterUser: true,
            currentUser: action.payload,
        }
    case REGISTER_USER_FAIL:
        return {
            ...state,
            loadingRegisterUser:  false,
            errorRegisterUser: action.payload,
        }
    case REGISTER_USER_RESET:
        return {
            ...state,
            loadingRegisterUser:  false,
            errorRegisterUser: "",
            successRegisterUser: false,
        }

    case LIST_USERS_REQUEST:
        return {
            ...state,
            loadingListUsers:  true,
            errorListUsers: "",
        }
    case LIST_USERS_SUCCESS:
        return {
            ...state,
            dataListUsers: action.payload.filter(({role})=> role !== "superAdmin"),
            loadingListUsers:  false,
        }
    case LIST_USERS_FAIL:
        return {
            ...state,
            loadingListUsers:  false,
            errorListUsers: action.payload,
        }

    case UPDATE_USER_ROLE_REQUEST:
        return {
            ...state,
            loadingUpdateUserRole:  true,
            errorUpdateUserRole: "",
        }
    case UPDATE_USER_ROLE_SUCCESS:
        return {
            ...state,
            loadingUpdateUserRole:  false,
            successUpdateUserRole: true,
        }
    case UPDATE_USER_ROLE_FAIL:
        return {
            ...state,
            loadingUpdateUserRole:  false,
            errorUpdateUserRole: action.payload,

        }
    case UPDATE_USER_ROLE_RESET:
        return {
            ...state,
            loadingUpdateUserRole:  false,
            errorUpdateUserRole: "",
            successUpdateUserRole: false,
        }
     
    default:
      return state;
  }
}