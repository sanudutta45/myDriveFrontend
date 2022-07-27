import React, { useState, Fragment } from "react"
import ReactDOM from "react-dom"
//components
import DownloaderModal from "./Downloader/Downloader"

const AddFile = ({ currentFolder, setReFetchChild }) => {
  const [uploadingFiles, setUploadingFiles] = useState([])

  const handleFiles = async (files) => {
    setUploadingFiles((prevUploading) => [...prevUploading, ...files])
  }

  return (
    <Fragment>
      <label className='btn btn-outline-success btn-sm m-0 me-2'>
        File +
        <input
          type='file'
          onChange={(ev) => handleFiles(ev.target.files)}
          multiple={true}
          style={{ opacity: 0, position: "absolute", left: "-999999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <DownloaderModal
            files={uploadingFiles}
            currentFolder={currentFolder}
            setReFetchChild={setReFetchChild}
          />,
          document.body
        )}
    </Fragment>
  )
}

export default AddFile
