import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Dropdown, ButtonGroup } from "react-bootstrap"
import { useState } from "react"
import RenameFolderModal from "./RenameFolder/RenameFolderModal"
import DeleteFolderModal from "./DeleteFolder/DeleteFolderModal"

const Folder = ({ folder, setReFetchChild }) => {
  const [showRenameModal, setRenameModel] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <Fragment>
      {showRenameModal && (
        <RenameFolderModal
          show={showRenameModal}
          onHide={() => setRenameModel(false)}
          folder={folder}
          dispatch={() => setReFetchChild((prev) => !prev)}
        />
      )}
      {showDeleteModal && (
        <DeleteFolderModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          folder={folder}
          dispatch={() => setReFetchChild((prev) => !prev)}
        />
      )}
      <Dropdown as={ButtonGroup}>
        <Button
          to={{
            pathname: `/app/dashboard/folder/${folder._id}`,
            state: { folder: folder },
          }}
          variant='outline-dark'
          className='text-truncate w-100'
          as={Link}
        >
          <i className='fa fa-folder mr-2' />
          {folder.name}
        </Button>
        <Dropdown.Toggle split id='file_options' variant='outline-dark' />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setRenameModel(true)}>
            Rename
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  )
}

export default Folder
