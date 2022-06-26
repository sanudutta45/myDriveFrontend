import axios from "axios";
import LocalStorageService from "../service/LocalStorageService";

const ss_login_page_api_url = process.env.REACT_APP_SS_LOGIN_PAGE_API_URL;

//api calls
export const apiCalls = (method, url, data = {}) => {
  if (method === "get") {
    //only for get
    return axios({ method: method, url: url, params: data });
  } else {
    //post,put,delete
    return axios({ method: method, url: url, data: data });
  }
};

export const fileApiCalls = (method, url, config = {}, data = {}) => {
  return axios({
    method,
    url,
    ...config,
    data: data,
  });
};

/**
 * Add a request interceptor
 */

axios.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Add a response interceptor
 */
axios.interceptors.request.use(
  (response) => {
    return response;
  },
  function (error) {
    if (typeof error.status !== "undefined") {
      //do something
      const originalRequest = error.config;
      const url = ss_login_page_api_url + "/api/v1/auth/refresh_token";

      //stop infinite loop
      if (error.response.status === 401 && originalRequest.url === url) {
        LocalStorageService.clearAll();
        console.log("Logged out!");
        window.location.href = "/";
        return Promise.reject(error);
      } else if (error.response.status === 401 && !originalRequest._retry) {
        console.log("Refreshing token...");
        originalRequest._retry = true;
        const refreshToken = LocalStorageService.getRefreshToken();
        const reqBody = { refresh_token: refreshToken };
        return axios({ method: "post", url: url, data: reqBody }).then(
          (res) => {
            if (res.status === 200) {
              LocalStorageService.setToken(res.data.token);
              const token = LocalStorageService.getAccessToken();
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
              return axios(originalRequest);
            }
          }
        );
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

axios.defaults.headers.post["Content-Type"] = "application/json";
