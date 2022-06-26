import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";

//components
import DownloaderModal from "./Downloader/Downloader";

//actions
import { addFile } from "../../../actions/fileAction";

const AddFile = ({ currentFolder, setReFetchChild }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const onUploadProgress = (id) => (e) => {
    const completeProgress = (e.loaded / e.total) * 100 || 0;
    setUploadingFiles((prevUploading) => {
      return prevUploading.map((file) => {
        if (file.id === id) return { ...file, progress: completeProgress };
        return file;
      });
    });
  };

  const upload = async (obj, id) => {
    try {
      await addFile(obj, onUploadProgress(id));

      setReFetchChild((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleUpload(e) {
    const reqObj = {
      parentId: currentFolder.id,
    };

    [...e.target.files].forEach((file) => {
      const id = uuidv4();
      setUploadingFiles((prevUploading) => [
        ...prevUploading,
        { id: id, fileName: file.name, progress: 0, error: "" },
      ]);
      upload({ ...reqObj, file: file }, id);
    });
  }

  return (
    <Fragment>
      <label className="btn btn-outline-success btn-sm m-0 mr-2">
        File +
        <input
          type="file"
          onChange={handleUpload}
          multiple={true}
          style={{ opacity: 0, position: "absolute", left: "-999999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <DownloaderModal files={uploadingFiles} />,
          document.body
        )}
    </Fragment>
  );
};

export default AddFile;
