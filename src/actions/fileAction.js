import { apiCalls } from "./apiCalls"

const ss_login_page_api_url = process.env.REACT_APP_SS_LOGIN_PAGE_API_URL

// export const doGetUploadId = async (value) => {
//   const url = ss_login_page_api_url + "/api/v1/file/upload_id/" + value
//   try {
//     const result = await apiCalls("get", url)
//     return result.data
//   } catch (error) {
//     if (error.response) {
//       throw new Error(error.response.data.error)
//     } else {
//       console.error("failed to get upload id, server err:", error.message)
//       throw new Error(error.message)
//     }
//   }
// }

export const doGetSignedPart = async (values) => {
  const url = ss_login_page_api_url + "/api/v1/file/signed_url"
  const reqObject = {
    bucketFileName: values.bucketFileName,
    fileSize: values.fileSize,
    uploadId: values.uploadId,
  }
  try {
    const result = await apiCalls("post", url, reqObject)
    return result.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error)
    } else {
      console.error("get signed part url, server err:", error.message)
      throw new Error(error.message)
    }
  }
}

export const saveUpload = async (values) => {
  const url = ss_login_page_api_url + `/api/v1/file/save?id=${values?.parentId}`

  const reqObject = {
    uploadId: values.uploadId,
    fileName: values.fileName,
    fileSize: values.fileSize,
    parts: values.parts,
    bucketFileName: values.bucketFileName,
  }

  try {
    const result = await apiCalls("post", url, reqObject)
    return result.data
  } catch (error) {
    console.error("save upload, server err:", error.message)
    throw new Error(error.message)
  }
}

export const abortUpload = async (values) => {
  const url = ss_login_page_api_url + "/api/v1/file/abort_upload"

  const reqObject = {
    bucketFileName: values.bucketFileName,
    uploadId: values.uploadId,
  }

  try {
    const result = await apiCalls("post", url, reqObject)
    return result.data
  } catch (error) {
    console.error("abort upload failed, server err:", error.message)
    throw new Error(error.message)
  }
}

export const deleteFile = async (values) => {
  const url = ss_login_page_api_url + "/api/v1/file/delete/" + values.fileId

  try {
    const result = await apiCalls("put", url)
    return result.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error)
    } else {
      console.error("delete file, server err:", error.message)
      throw new Error(error.message)
    }
  }
}

export const downloadFile = async (fileId) => {
  console.log("file id",fileId)
  const url = ss_login_page_api_url + "/api/v1/file/download/" + fileId

  try {
    const result = await apiCalls("get", url)
    return result.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error)
    } else {
      console.error("delete file, server err:", error.message)
      throw new Error(error.message)
    }
  }
}
