import React, { Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

//component
import AddFolder from "./AddFolder/AddFolder";
import useFolder from "./useFolder";
import Folder from "./Folder";
import File from "./File";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import AddFile from "./AddFile/AddFile";

function DashedBoard(props) {
  const { user } = props;
  const { folderId } = useParams();
  const { state = {} } = useLocation();

  const { folder, children, setReFetchChild } = useFolder(
    folderId,
    state && state.folder
  );

  return (
    <section id="dashboard">
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadCrumbs currentFolder={folder} />
          <AddFile currentFolder={folder} setReFetchChild={setReFetchChild} />
          <AddFolder
            currentUser={user}
            currentFolder={folder}
            setReFetchChild={setReFetchChild}
          />
        </div>

        <div className="row">
          {children.length > 0 && (
            <Fragment>
              <div className="col-md-12 d-flex flex-wrap">
                {children.map(
                  (child) =>
                    child.isDir && (
                      <div
                        key={child._id}
                        style={{ maxWidth: "150px" }}
                        className="p-2"
                      >
                        <Folder folder={child} />
                      </div>
                    )
                )}
              </div>
              <div className="col-md-12 d-flex flex-wrap">
                {children.map(
                  (child) =>
                    !child.isDir && (
                      <div
                        key={child._id}
                        style={{ maxWidth: "150px" }}
                        className="p-2"
                      >
                        <File file={child} />
                      </div>
                    )
                )}
              </div>
            </Fragment>
          )}
        </div>
      </Container>
    </section>
  );
}
export default DashedBoard;
