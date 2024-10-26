import { END_POINTS, SERVER_URL } from "../../../common/routes";
import { API } from "./api_helper";

export function fetchBlogsByQrCode(payload) {
  return API({
    method: "GET",
    url: `${SERVER_URL}${END_POINTS.GET_BLOG_BY_QR_KEY(payload)}`,
  }).then((response) => response.data);
}

export function fetchBlogsByUniqueKey(payload) {
  return API({
    method: "GET",
    url: `${SERVER_URL}${END_POINTS.GET_BLOG_BY_UNIQUE_KEY(payload)}`,
  }).then((response) => response.data);
}

export function fetchBlogsDetailsByQrCode(payload) {
  return API({
    method: "GET",
    url: `${SERVER_URL}${END_POINTS.GET_BLOG_DETAIL_BY_QR_KEY(payload)}`,
  }).then((response) => response.data);
}

export function getAllListBlogApi() {
  return API({
    method: "GET",
    url: `${SERVER_URL}${END_POINTS.GET_ALL_LIST_BLOG}`,
  }).then((response) => response);
}
