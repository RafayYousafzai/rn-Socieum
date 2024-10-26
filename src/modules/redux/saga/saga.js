// @flow

import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import {
  fetchBlogsByQrCode,
  fetchBlogsByUniqueKey,
  fetchBlogsDetailsByQrCode,
  getAllListBlogApi,
} from "../API/apiCalls";
import searchActionCreator from "../actions/actions";
import {
  GET_ALL_LIST_BLOG,
  GET_BLOG_BY_QR,
  GET_BLOG_BY_UNIQUE_KEY,
  GET_BLOG_DETAIL_BY_QR_KEY,
} from "../types/types";

function* getBlogByQrCodeSaga({ payload }) {
  try {
    const response = yield call(fetchBlogsByQrCode, payload);
    if (response?.data?.length > 0) {
      yield put(searchActionCreator.getBlogByQrCodeSuccess(response.data));
      yield put(
        searchActionCreator.saveBlogHistory({
          ...response.data[0],
          searchBy: "QR Code Searched",
          viewedAt: new Date(),
        })
      );
    } else {
      yield put(
        searchActionCreator.getBlogByQrCodeError(
          "No Support found against this qr-code."
        )
      );
    }
  } catch (e) {
    let error = Array.isArray(e)
      ? e[0].message
      : typeof e == "string"
      ? e
      : "FETCHING ERROR, CHECK BACK LATER !!";
    yield put(searchActionCreator.getBlogByQrCodeError(error));
  }
}

function* GetBlogsByUniqueKeySaga({ payload }) {
  try {
    const response = yield call(fetchBlogsByUniqueKey, payload);
    yield put(searchActionCreator.getBlogByUniqueSuccess(response.data));
    yield put(
      searchActionCreator.saveBlogHistory({
        ...response.data[0],
        searchBy: "Unique Code Searched",
        viewedAt: new Date(),
      })
    );
  } catch (e) {
    let error = Array.isArray(e)
      ? e[0].message
      : typeof e == "string"
      ? e
      : "FETCHING ERROR, CHECK BACK LATER !!";
    yield put(searchActionCreator.getBlogByUniqueError(error));
  }
}

function* GetBlogDetailByQRSaga({ payload }) {
  try {
    const response = yield call(fetchBlogsDetailsByQrCode, payload);
    if (response?.data !== []) {
      yield put(searchActionCreator.getBlogDetailSuccess(response?.data));
    } else {
      yield put(
        searchActionCreator.getBlogDetailError(
          "No Support found against this qr-code."
        )
      );
    }
  } catch (e) {
    let error = Array.isArray(e)
      ? e[0].message
      : typeof e == "string"
      ? e
      : "FETCHING ERROR, CHECK BACK LATER !!";
    yield put(searchActionCreator.getBlogDetailError(error));
  }
}

function* getAllListBlogSaga({ payload }) {
  try {
    const response = yield call(getAllListBlogApi, payload);
    if (response?.data !== []) {
      let filteredArray = new Array();
      response.data.filter((item) => {
        if (
          item?.blogStatus === "APPROVED" ||
          item?.blogStatus === "CHARITY_PUBLISH_BLOG"
        ) {
          //console.log('item',item.blogStatus)
          filteredArray.push(item);
        }
      });
      yield put(searchActionCreator.getAllListBlogsSuccess(filteredArray));
    } else {
      yield put(
        searchActionCreator.getAllListBlogsError(
          "No support found against this qr-code."
        )
      );
    }
  } catch (e) {
    console.log(e);
    yield put(
      searchActionCreator.getAllListBlogsError(
        "No support found against this qr-code."
      )
    );
  }
}

export function* watchGetBlogsByQrCode() {
  while (true) {
    const action = yield take(GET_BLOG_BY_QR);
    yield* getBlogByQrCodeSaga(action);
  }
}
export function* watchGetBlogsByUniqueKey() {
  while (true) {
    const action = yield take(GET_BLOG_BY_UNIQUE_KEY);
    yield* GetBlogsByUniqueKeySaga(action);
  }
}
export function* watchGetBlogDetailsByQrCode() {
  while (true) {
    const action = yield take(GET_BLOG_DETAIL_BY_QR_KEY);
    yield* GetBlogDetailByQRSaga(action);
  }
}

export function* watchGetListAllBlog() {
  while (true) {
    const action = yield take(GET_ALL_LIST_BLOG);
    yield* getAllListBlogSaga(action);
  }
}

export default function* () {
  yield all([
    fork(watchGetBlogsByQrCode),
    fork(watchGetBlogsByUniqueKey),
    fork(watchGetBlogDetailsByQrCode),
    fork(watchGetListAllBlog),
  ]);
}
