import { fileApiCalls } from "./apiCalls";

const ss_login_page_api_url = process.env.REACT_APP_SS_LOGIN_PAGE_API_URL;

export const addFile = async (values, onUploadProgress) => {
  const url =
    ss_login_page_api_url + `/api/v1/file/upload?id=${values.parentId}`;

  console.log("values", values);

  const formData = new FormData();

  formData.append("file", values.file);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: onUploadProgress
  };

  console.log(formData.getAll("file"));

  try {
    const result = await fileApiCalls("post", url, config, formData);
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
