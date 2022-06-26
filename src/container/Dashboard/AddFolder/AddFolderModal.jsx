import React, { useState } from "react";
import { Modal } from "react-bootstrap";

//actions
import { addFolder } from "../../../actions/folderAction";

//constant
import {ROOT_FOLDER} from "../useFolder";

//form
import AddFolderForm from "./AddFolderForm";

const AddFolderModal = (props) => {
  const [serverError, setServerError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (values) => {
    const path = [...props.currentFolder.path];
    if (props.currentFolder !== ROOT_FOLDER)
      path.push({ name: props.currentFolder.name, id: props.currentFolder.id });

    const folderObj = {
      name: values.name,
      path: path,
      parentId: props.currentFolder.id,
    };
    setServerError("");
    try {
      setUploading(true);
      await addFolder(folderObj);
      setUploading(false);
      props.dispatch();
      props.onHide();
    } catch (error) {
      setUploading(false);
      setServerError(error.message);
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      backdrop={false}
      centered={true}
      dialogClassName="add_folder_modal"
    >
      <Modal.Header closeButton className="modal_header">
        <Modal.Title>Add Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddFolderForm
          close={props.onHide}
          handleSubmit={handleSubmit}
          uploading={uploading}
        />
        {serverError && (
          <div className="text-danger text-center">{serverError}</div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddFolderModal;
