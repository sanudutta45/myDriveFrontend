import React, { Fragment, useState } from "react"

//components
import { Button, ButtonGroup, Dropdown } from "react-bootstrap"
import { downloadFile } from "../../actions/fileAction"
import DeleteFileModal from "./DeleteFile/DeleteFileModal"

const File = ({ file, setReFetchChild }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async (fileId) => {
    setDownloading(true)
    try {
      console.log("fileId", file._id)
      const downloadUrl = await downloadFile(fileId)
      window.open(downloadUrl.url)
    } catch (error) {
      console.log(error)
    }
    setDownloading(false)
  }

  return (
    <Fragment>
      {showDeleteModal && (
        <DeleteFileModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          file={file}
          dispatch={() => setReFetchChild((prev) => !prev)}
        />
      )}
      <Dropdown
        as={ButtonGroup}
        className={downloading ? "pointer_disable" : ""}
      >
        <Button
          variant='outline-dark'
          disabled={downloading}
          className='text-truncate file_card'
          style={{ maxWidth: "150px" }}
        >
          <i className='fa fa-file me-2' />
          {file && file.name}
        </Button>
        <Dropdown.Toggle split id='file_options' variant='outline-dark' />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleDownload(file._id)}>
            Download
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  )
}

export default File
