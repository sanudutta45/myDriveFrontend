import React, { useState, Fragment } from "react";

//modal
import AddFolderModal from "./AddFolderModal";

const AddFolder = ({ currentFolder, setReFetchChild }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-success btn-sm"
        onClick={() => setOpenModal(!openModal)}
      >
        Folder +
      </button>
      {openModal && (
        <AddFolderModal
          show={openModal}
          onHide={() => setOpenModal(false)}
          currentFolder={currentFolder}
          dispatch={() => setReFetchChild((prev) => !prev)}
        />
      )}
    </Fragment>
  );
};

export default AddFolder;
