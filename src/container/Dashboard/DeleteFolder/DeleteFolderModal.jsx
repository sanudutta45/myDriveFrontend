import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import Button from "../../../components/Button/Button"

//actions
import { deleteFolder } from "../../../actions/folderAction"

const DeleteFolderModal = (props) => {
  const [serverError, setServerError] = useState("")
  const [deleting, setDeleting] = useState(false)

  const handleYes = async () => {
    const folderObj = {
      folderId: props.folder._id,
    }
    setServerError("")
    try {
      setDeleting(true)
      await deleteFolder(folderObj)
      setDeleting(false)
      props.dispatch()
      props.onHide()
    } catch (error) {
      setDeleting(false)
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
        <Modal.Title>Delete Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-center'>
          Are you sure, you want to delete the folder and its associate files
          and folder ?
        </p>
        <div className='mt-3 text-center'>
          <Button
            type='button'
            text='Close'
            onClick={() => props.onHide()}
            btnClass='m-2'
          />
          <Button
            type='button'
            text='Delete'
            isDisable={deleting}
            btnClass='m-2'
            onClick={handleYes}
          />
        </div>
        {serverError && (
          <div className='text-danger text-center'>{serverError}</div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default DeleteFolderModal
