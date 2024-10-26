export const SERVER_URL = "http://younite.uk/";
export const IMAGES = "images";
export const CHARITY = "/charity";


export var END_POINTS = {
  GET_ALL_LIST_BLOG:"api/listAllBlogs",
  GET_BLOG_BY_QR_KEY: ({ qrCode }) =>
    "api/getMerchandiseByQrCode?qrCodePublicKey=" + qrCode,
  GET_BLOG_BY_UNIQUE_KEY: ({ key }) =>
    "api/getMerchandiseByUniqueKey?uniqueKey=" + key,
  GET_BLOG_DETAIL_BY_QR_KEY: ({ qrCode }) =>
    "api/getCharityBlogByQrcode/" + qrCode,
};
