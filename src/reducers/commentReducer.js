import { 
    CREATE_COMMENT_SUCCESS, 
    CREATE_COMMENT_FAIL, 
    CREATE_COMMENT_RESET, 
    CREATE_COMMENT_REQUEST,
    LIST_COMMENT_REQUEST,
    LIST_COMMENT_SUCCESS,
    LIST_COMMENT_FAIL,
    LIST_COMMENT_RESET,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_RESET,
} from "../constants/commentConstant";

const initialState ={
    // create comment state
    loadingCreateComment:  false,
    errorCreateComment: "",
    successCreateComment: false,

    // list comment state
    dataListComment: [],
    loadingListComment:  false,
    errorListComment: "",
    successListComment: false,

    // delete comment state
    loadingDeleteComment:  false,
    errorDeleteComment: "",
    successDeleteComment: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
        return {
            ...state,
            loadingCreateComment: true,
        }

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loadingCreateComment:  false,
        successCreateComment: true,
      }
    case CREATE_COMMENT_FAIL:
      return {
        ...state,
        loadingCreateComment:  false,
        errorCreateComment: action.payload,
      }

    case CREATE_COMMENT_RESET:
      return {
        ...state,
        loadingCreateComment:  false,
        errorCreateComment: "",
        successCreateComment: false,
      }

    case LIST_COMMENT_REQUEST:
        return {
          ...state,
          loadingListComment:  true,
        }
    case LIST_COMMENT_SUCCESS:
        return {
          ...state,
          dataListComment: action.payload,
          loadingListComment:  false,
          successListComment: true,
        }
    case LIST_COMMENT_FAIL:
        return {
          ...state,
          loadingListComment:  false,
          errorListComment: action.payload,
        }

    case LIST_COMMENT_RESET:
        return {
          ...state,
          loadingListComment:  false,
          errorListComment: "",
          successListComment: false,
        }

    case DELETE_COMMENT_REQUEST:
        return {
          ...state,
          loadingDeleteComment:  true,
        }
    case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          loadingDeleteComment:  false,
          successDeleteComment: true,
        }
    case DELETE_COMMENT_FAIL:
        return {
          ...state,
          loadingDeleteComment:  false,
          errorDeleteComment: action.payload,
        }
    case DELETE_COMMENT_RESET:
        return {
          ...state,
          loadingDeleteComment:  false,
          errorDeleteComment: "",
          successDeleteComment: false,
        }
     
    default:
      return state;
  }
}