import { 
    LIST_CAMPGROUNDS_REQUEST, 
    LIST_CAMPGROUNDS_SUCCESS,
    LIST_CAMPGROUNDS_FAIL,
    LIST_CAMPGROUNDS_RESET,
    DETAIL_CAMPGROUND_REQUEST,
    DETAIL_CAMPGROUND_SUCCESS,
    DETAIL_CAMPGROUND_FAIL,
    CREATE_CAMPGROUND_REQUEST,
    CREATE_CAMPGROUND_SUCCESS,
    CREATE_CAMPGROUND_FAIL,
    CREATE_CAMPGROUND_RESET,
    UPDATE_CAMPGROUND_REQUEST,
    UPDATE_CAMPGROUND_SUCCESS,
    UPDATE_CAMPGROUND_FAIL,
    UPDATE_CAMPGROUND_RESET,
    DELETE_CAMPGROUND_REQUEST,
    DELETE_CAMPGROUND_SUCCESS,
    DELETE_CAMPGROUND_FAIL,
    DELETE_CAMPGROUND_RESET,
    GET_CAMPGROUND_ARRAY,
    CAMPGROUND_SEARCH_DATA,
    CAMPGROUND_SEARCH_ARRAY,
} from "../constants/campgroundConstant";

const initialState= {
    // list campgrounds
    databaseCampground: [],
    loadingListCampgrounds:  false,
    errorListCampgrounds: "",
    successListCampgrounds: false,
    dataListCampgrounds: [],
    searchData: "",
    searchArray: [],
    isNeedReload: true,
    isNeedResearch: false,

    // detail campgrounds
    dataDetailCampground: {},
    loadingDetailCampground:  false,
    errorDetailCampground: "",

    // create campgrounds
    loadingCreateCampground:  false,
    errorCreateCampground: "",
    successCreateCampground: false,
    createdCampground:{},

    // update campgrounds
    loadingUpdateCampground:  false,
    errorUpdateCampground: "",
    successUpdateCampground: false,

    // update campgrounds
    loadingDeleteCampground:  false,
    errorDeleteCampground: "",
    successDeleteCampground: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LIST_CAMPGROUNDS_REQUEST:
      return {
        ...state,
        loadingListCampgrounds:  true,
        errorListCampgrounds: "",
      };
    
    case LIST_CAMPGROUNDS_SUCCESS:
      return {
        ...state,
        databaseCampground: action.payload,
        loadingListCampgrounds:  false,
        successListCampgrounds: true,
        isNeedReload: false,
      };

    case GET_CAMPGROUND_ARRAY:
      return {
        ...state,
        dataListCampgrounds: action.payload || state.databaseCampground,
      } 

    case CAMPGROUND_SEARCH_DATA:
      return{
        ...state,
        searchData: action.payload
      } 

    case CAMPGROUND_SEARCH_ARRAY:
      return{
        ...state,
        searchArray: action.payload
      } 

    case LIST_CAMPGROUNDS_FAIL:
      return {
        ...state,
        loadingListCampgrounds:  false,
        errorListCampgrounds: action.payload,
      };

    case LIST_CAMPGROUNDS_RESET:
      return {
        ...state,
        loadingListCampgrounds:  false,
        errorListCampgrounds: "",
        successListCampgrounds: false,
      };

    case DETAIL_CAMPGROUND_REQUEST:
      return {
        ...state,
        loadingDetailCampground:  true,
        errorDetailCampground: "",
      }

    case DETAIL_CAMPGROUND_SUCCESS:
      return {
        ...state,
        dataDetailCampground: action.payload,
        loadingDetailCampground:  false,
      }

    case DETAIL_CAMPGROUND_FAIL:
      return {
        ...state,
        loadingDetailCampground:  false,
        errorDetailCampground: action.payload,
      }

    case CREATE_CAMPGROUND_REQUEST:
      return {
        ...state,
        loadingCreateCampground:  true,
        errorCreateCampground: "",
      }
    case CREATE_CAMPGROUND_SUCCESS:
      return {
        ...state,
        loadingCreateCampground:  false,
        successCreateCampground: true,
        createdCampground:action.payload,
        isNeedReload: true,
        isNeedResearch: true
      }
    case CREATE_CAMPGROUND_FAIL:
      return {
        ...state,
        loadingCreateCampground:  false,
        errorCreateCampground: action.payload,
      }

    case CREATE_CAMPGROUND_RESET:
      return {
        ...state,
        loadingCreateCampground:  false,
        errorCreateCampground: "",
        successCreateCampground: false,
      }

    case UPDATE_CAMPGROUND_REQUEST:
        return {
          ...state,
          loadingUpdateCampground:  true,
          errorUpdateCampground: "",
        }
    case UPDATE_CAMPGROUND_SUCCESS:
        return {
          ...state,
          loadingUpdateCampground:  false,
          successUpdateCampground: true,
          isNeedReload: true,
          isNeedResearch: true
        }
    case UPDATE_CAMPGROUND_FAIL:
        return {
          ...state,
          loadingUpdateCampground:  false,
          errorUpdateCampground: action.payload,
        }
    case UPDATE_CAMPGROUND_RESET:
        return {
          ...state,
          loadingUpdateCampground:  false,
          errorUpdateCampground: "",
          successUpdateCampground: false,
        }

    case DELETE_CAMPGROUND_REQUEST:
        return {
          ...state,
          loadingDeleteCampground:  true,
          errorDeleteCampground: "",
        }
    case DELETE_CAMPGROUND_SUCCESS:
        return {
          ...state,
          loadingDeleteCampground:  false,
          successDeleteCampground: true,
          isNeedReload: true,
          isNeedResearch: true,
        }
    case DELETE_CAMPGROUND_FAIL:
        return {
          ...state,
          loadingDeleteCampground:  false,
          errorDeleteCampground: action.payload,
        }
    case DELETE_CAMPGROUND_RESET:
        return {
          ...state,
          loadingDeleteCampground:  false,
          errorDeleteCampground: "",
          successDeleteCampground: false,
        }
     
    default:
      return state;
  }
}