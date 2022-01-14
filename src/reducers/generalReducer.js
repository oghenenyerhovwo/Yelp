import { 
  RESET_SUCCESS_MESSAGE , 
  SET_SUCCESS_MESSAGE,
  RESET_ERROR_MESSAGE,
  SET_ERROR_MESSAGE,
} from "../constants/generalConstant";

const initialState= {
    // General
    successMessage: "",
    errorMessage: "",
}

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_SUCCESS_MESSAGE: 
        return{...state, successMessage: "",}
     
    case SET_SUCCESS_MESSAGE: 
        return{...state, successMessage: action.payload,}

    case RESET_ERROR_MESSAGE: 
        return{...state, errorMessage: "",}
     
    case SET_ERROR_MESSAGE: 
        return{...state, errorMessage: action.payload,}
    default:
      return state;
  }
}