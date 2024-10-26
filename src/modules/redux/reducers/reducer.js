import {
  GET_BLOG_BY_QR,
  GET_BLOG_BY_QR_SUCCESS,
  GET_BLOG_BY_QR_ERROR,
  GET_BLOG_BY_UNIQUE_KEY,
  GET_BLOG_BY_UNIQUE_KEY_SUCCESS,
  GET_BLOG_BY_UNIQUE_KEY_ERROR,
  GET_BLOG_DETAIL_BY_QR_KEY,
  GET_BLOG_DETAIL_BY_QR_KEY_SUCCESS,
  GET_BLOG_DETAIL_BY_QR_KEY_ERROR,
  SAVE_BLOG_IN_HISTORY,
  SCAN_QR,
  SCAN_QR_SUCCESS,
  SCAN_QR_ERROR,
  GET_ALL_LIST_BLOG,
  GET_ALL_LIST_BLOG_SUCCESS,
  GET_ALL_LIST_BLOG_ERROR,
} from "../types/types";

export const DEFAULT = {
  blogHistory: [],
};

const UpdateStateHistory = (history, item) => {
  let resultantHistory = history;

  const indexReplace = history.map((blog) => blog?._id).indexOf(item._id);
  if (indexReplace !== -1) {
    resultantHistory.splice(indexReplace, 1);
    resultantHistory.unshift(item);
  } else {
    resultantHistory.unshift(item);
  }
  return resultantHistory;
};

export default function searchReducer(state = DEFAULT, action = {}) {
  const { type, payload } = action;
  switch (type) {
    //   ------------------------------------- ALL LIST BLOGS  --------------------------------------

    case GET_ALL_LIST_BLOG: {
      return {
        ...state,
        gettingAllBlogs: true,
        getAllBlogsSuccess: false,
        getAllBlogsError: false,
        getAllBlogsMessage: "",
      };
    }
    case GET_ALL_LIST_BLOG_SUCCESS: {
      return {
        ...state,
        gettingAllBlogs: false,
        getAllBlogsSuccess: true,
        getAllBlogsError: false,
        getAllBlogsMessage: "",
        allBlogs: payload ? payload : [],
      };
    }
    case GET_ALL_LIST_BLOG_ERROR: {
      return {
        ...state,
        gettingAllBlogs: false,
        getAllBlogsSuccess: false,
        getAllBlogsError: true,
        getAllBlogsMessage: payload,
        //allBlogs: [],
      };
    }

    //   ------------------------------------- QR Code --------------------------------------

    case GET_BLOG_BY_QR: {
      return {
        ...state,
        gettingBlogByQrCode: true,
        getBlogByQrCodeSuccess: false,
        getBlogError: false,
        getBlogErrorMessage: "",
      };
    }
    case GET_BLOG_BY_QR_SUCCESS: {
      return {
        ...state,
        gettingBlogByQrCode: false,
        getBlogByQrCodeSuccess: true,
        getBlogError: false,
        getBlogErrorMessage: "",
        searchedBlog: payload ? payload[0] : {},
      };
    }
    case GET_BLOG_BY_QR_ERROR: {
      return {
        ...state,
        gettingBlogByQrCode: false,
        getBlogByQrCodeSuccess: false,
        getBlogError: true,
        getBlogErrorMessage: payload,
      };
    }

    //   ------------------------------------- Unique Code --------------------------------------
    case GET_BLOG_BY_UNIQUE_KEY: {
      return {
        ...state,
        gettingBlogByUniqueKey: true,
        getBlogByUniqueKeySuccess: false,
        getBlogError: false,
        getBlogErrorMessage: "",
      };
    }
    case GET_BLOG_BY_UNIQUE_KEY_SUCCESS: {
      return {
        ...state,
        gettingBlogByUniqueKey: false,
        getBlogByUniqueKeySuccess: true,
        getBlogError: false,
        getBlogErrorMessage: "",
        searchedBlog: payload ? payload[0] : {},
      };
    }
    case GET_BLOG_BY_UNIQUE_KEY_ERROR: {
      return {
        ...state,
        gettingBlogByUniqueKey: false,
        getBlogByUniqueKeySuccess: false,
        getBlogError: true,
        getBlogErrorMessage: payload,
      };
    }
    //   ------------------------------------- Unique Code Blog Details--------------------------------------
    case GET_BLOG_DETAIL_BY_QR_KEY: {
      return {
        ...state,
        gettingBlogDetails: true,
        getBlogDetailsSuccess: false,
        getBlogDetailsError: false,
        getBlogDetailsErrorMessage: "",
      };
    }
    case GET_BLOG_DETAIL_BY_QR_KEY_SUCCESS: {
      return {
        ...state,
        gettingBlogDetails: false,
        getBlogDetailsSuccess: true,
        getBlogDetailsError: false,
        getBlogDetailsErrorMessage: "",
        blogDetails: payload,
      };
    }
    case GET_BLOG_DETAIL_BY_QR_KEY_ERROR: {
      return {
        ...state,
        gettingBlogDetails: false,
        getBlogDetailsSuccess: false,
        getBlogDetailsError: true,
        getBlogDetailsErrorMessage: payload,
      };
    }

    // -------------------------   History Flow  ---------------------------
    case SAVE_BLOG_IN_HISTORY: {
      let hist = UpdateStateHistory(
        state?.blogHistory ? state?.blogHistory : [],
        payload
      );
      return {
        ...state,
        blogHistory: hist,
      };
    }
    // -------------------------   ScanQR Code Flow  ---------------------------

    case SCAN_QR: {
      return {
        ...state,
        scanning: true,
        scanSuccess: false,
        scanError: false,
      };
    }
    case SCAN_QR_SUCCESS: {
      return {
        ...state,
        scanning: false,
        scanSuccess: true,
        scanError: false,
        ScannedQrCode: payload,
      };
    }

    case SCAN_QR_ERROR: {
      return {
        ...state,
        scanning: false,
        scanSuccess: false,
        scanError: true,
      };
    }
    default:
      return state;
  }
}
