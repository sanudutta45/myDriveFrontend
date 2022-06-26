import React, { useState } from "react"
import { Modal } from "react-bootstrap"

//actions
import { renameFolder } from "../../../actions/folderAction"

//form
import RenameFolderForm from "./RenameFolderForm"

const RenameFolderModal = (props) => {
  const [serverError, setServerError] = useState("")
  const [renaming, setRenaming] = useState(false)

  const handleSubmit = async ({ newName }) => {
    const folderObj = {
      folderId: props.folder._id,
      newName,
    }
    setServerError("")
    try {
      setRenaming(true)
      await renameFolder(folderObj)
      setRenaming(false)
      props.dispatch()
      props.onHide()
    } catch (error) {
      setRenaming(false)
      setServerError(error.message)
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='lg'
      backdrop={false}
      centered={true}
      dialogClassName='add_folder_modal'
    >
      <Modal.Header closeButton className='modal_header'>
        <Modal.Title>Rename Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameFolderForm
          close={props.onHide}
          handleSubmit={handleSubmit}
          renaming={renaming}
        />
        {serverError && (
          <div className='text-danger text-center'>{serverError}</div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default RenameFolderModal
