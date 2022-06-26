import { apiCalls } from "./apiCalls";

const ss_login_page_api_url = process.env.REACT_APP_SS_LOGIN_PAGE_API_URL;

export const addFolder = async (values) => {
  const url =
    ss_login_page_api_url + `/api/v1/folder?id=${values.parentId}`;
  const reqObj = {
    name: values.name,
    path: values.path ? values.path : [],
  };
  try {
    const result = await apiCalls("post", url, reqObj);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("add folder, server err:", error.message);
      throw new Error(error.message);
    }
  }
};

export const getFolderInfo = async (folderId) => {
  const url = ss_login_page_api_url + "/api/v1/folder";
  const reqObj = {
    id: folderId,
  };
  try {
    const result = await apiCalls("get", url, reqObj);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("get folder info, server err:", error.message);
      throw new Error(error.message);
    }
  }
};

export const getFolderChildren = async (folderId) => {
  const url = ss_login_page_api_url + "/api/v1/folder/children";
  const reqObj = {
    id: folderId,
  };
  try {
    const result = await apiCalls("get", url, reqObj);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("get folder children, server err:", error.message);
      throw new Error(error.message);
    }
  }
};
