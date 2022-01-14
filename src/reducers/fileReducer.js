import { 
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAIL,
    UPLOAD_FILE_RESET,
} from "../constants/fileConstant";

const initialState = {
    // upload data
    loadingUploadFile: false,
    errorUploadFile: "",
    dataUploadFile: "",
    successUploadFile: false,

}


export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
        return {
            ...state,
            loadingUploadFile: true,
            errorUploadFile: "",
            successUploadFile: "",
            dataUploadFile: {}
        }
    case UPLOAD_FILE_SUCCESS:
        return {
            ...state,
            loadingUploadFile: false,
            dataUploadFile: action.payload,
            successUploadFile: true,
        }
    case UPLOAD_FILE_FAIL:
        return {
            ...state,
            loadingUploadFile: false,
            errorUploadFile: action.payload,
        }
    case UPLOAD_FILE_RESET:
        return {
            ...state,
            loadingUploadFile: false,
            errorUploadFile: "",
            dataUploadFile: "",
            successUploadFile: false,
        }
     
    default:
      return state;
  }
}