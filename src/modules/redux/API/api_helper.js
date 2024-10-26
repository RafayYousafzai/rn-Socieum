import axios from "axios";
import _ from "lodash";

const headers = async () => {
  return {
    "Content-Type": "application/json",
    authorized: true,
  };
};

const API = async (options) => {
  console.log(options);
  if (options.authorized != false)
    options.headers = _.merge(await headers(), options.headers);

  return axios(options).catch((errorResponse) => {
    var errorMessages = "";
    let errorCode = errorResponse.response.status;
    console.log(options.url + " < Real Error Message > ", errorResponse);
    if (!options.silent) {
      if (errorResponse.response && errorResponse.response.data.errors) {
        errorMessages = errorResponse.response.data.errors;
      } else if (errorResponse.response && errorResponse.response.data.error) {
        errorMessages = errorResponse.response.data.error;
      } else if (
        errorResponse.response &&
        errorResponse.response.data.message
      ) {
        errorMessages = errorResponse.response.data.message;
      } else if (errorResponse.message == "Network Error") {
        errorMessages = "Please check your internet connection and try again.";
      } else if (errorResponse.message) {
        errorMessages = errorResponse.message;
      } else {
        errorMessages = "Something went wrong, please try again later.";
      }
    }

    throw errorMessages;
  });
};

export { API };
