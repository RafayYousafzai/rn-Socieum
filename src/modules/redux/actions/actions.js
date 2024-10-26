import { createAction } from "redux-actions";
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

const searchActionCreator = {
  getBlogByQrCode: createAction(GET_BLOG_BY_QR),
  getBlogByQrCodeSuccess: createAction(GET_BLOG_BY_QR_SUCCESS),
  getBlogByQrCodeError: createAction(GET_BLOG_BY_QR_ERROR),

  getBlogByUnique: createAction(GET_BLOG_BY_UNIQUE_KEY),
  getBlogByUniqueSuccess: createAction(GET_BLOG_BY_UNIQUE_KEY_SUCCESS),
  getBlogByUniqueError: createAction(GET_BLOG_BY_UNIQUE_KEY_ERROR),

  getBlogDetail: createAction(GET_BLOG_DETAIL_BY_QR_KEY),
  getBlogDetailSuccess: createAction(GET_BLOG_DETAIL_BY_QR_KEY_SUCCESS),
  getBlogDetailError: createAction(GET_BLOG_DETAIL_BY_QR_KEY_ERROR),

  saveBlogHistory: createAction(SAVE_BLOG_IN_HISTORY),

  scanQR: createAction(SCAN_QR),
  scanQRSuccess: createAction(SCAN_QR_SUCCESS),
  scanQRError: createAction(SCAN_QR_ERROR),

  getAllListBlogs: createAction(GET_ALL_LIST_BLOG),
  getAllListBlogsSuccess: createAction(GET_ALL_LIST_BLOG_SUCCESS),
  getAllListBlogsError: createAction(GET_ALL_LIST_BLOG_ERROR),
};

export default searchActionCreator;
