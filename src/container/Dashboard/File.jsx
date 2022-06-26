import React from "react";

//components
import { Button } from "react-bootstrap";

const File = ({ file }) => {
  return (
    <Button
      // to={{
      //   pathname: `/app/dashboard/file/${file._id}`,
      //   state: { file: file },
      // }}
      variant="outline-dark"
      className="text-truncate w-100"
      // as={Link}
    >
      <i className="fa fa-file mr-2" />
      {file && file.name}
    </Button>
  );
};

export default File;
