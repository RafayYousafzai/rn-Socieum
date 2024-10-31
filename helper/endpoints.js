import { Platform, ToastAndroid } from "react-native";

export const SERVER_URL = "https://younite.uk";
export const IMAGES = "images";
export const CHARITY = "/charity";
export const BASE_API_URL = `${SERVER_URL}/api`;

export const END_POINTS = {
  GET_ALL_LIST_BLOG: `${BASE_API_URL}/listAllBlogs`,
  GET_BLOG_BY_QR_KEY: ({ qrCode }) =>
    `${BASE_API_URL}/getMerchandiseByQrCode?qrCodePublicKey=${qrCode}`,
  GET_BLOG_BY_UNIQUE_KEY: ({ key }) =>
    `${BASE_API_URL}/getMerchandiseByUniqueKey?uniqueKey=${key}`,
  GET_BLOG_DETAIL_BY_QR_KEY: ({ qrCode }) =>
    `${BASE_API_URL}/getBlogByQrCode/${qrCode}`,
};

export const showToast = (message) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }
};
