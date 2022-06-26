import React, { Fragment } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const DownloaderCard = ({ file }) => {
  console.log("id", file.id, " ", "progress", file.progress);

  return (
    <Fragment>
      {file && (
        <div className="upload__item__wrapper">
          <div className="upload__item__item">
            {/* <span className="play__pause">
          {state.status === "progress" ? (
            <i className="fa fa-pause" onClick={() => handlePause()}></i>
          ) : state.status === "paused" ? (
            <i className="fa fa-play" onClick={() => handleResume()}></i>
          ) : (
            ""
          )}
        </span> */}
            <h3>{file.fileName}</h3>
          </div>
          <div className="upload__item__item__wrapper" id="uploader">
            {Math.floor(file.progress) === 100 && (
              <div>
                <span className="fa fa-check icon_select"></span>
              </div>
            )}
            {Math.floor(file.progress) === 0 && (
              <div className="spinner-border preloader" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {Math.floor(file.progress) > 0 && Math.floor(file.progress) < 100 && (
              <div
              // onMouseOver={() => setShowProgress(false)}
              // onMouseLeave={() => setShowProgress(true)}
              // onClick={() => handleCancel()}
              >
                {/* {showProgress ? ( */}
                <CircularProgressbar
                  value={file.progress}
                  maxValue={100}
                  strokeWidth={15}
                />
                {/* ) : (
              <span className="icon-cancel mouse_cancel"></span>
            )} */}
              </div>
            )}

            {file.error !== "" && (
              <div>
                <span className="icon-caution"></span>
              </div>
            )}
            {/* {state.status === "canceled" && (
          <div
            onMouseOver={() => setShowRestart(true)}
            onMouseLeave={() => setShowRestart(false)}
            onClick={() => handleDownload()}
          >
            {showRestart ? (
              <span className="icon-refresh cancel_refresh"></span>
            ) : (
              <span className="icon-cancel cancel_status"></span>
            )}
          </div>
        )} */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DownloaderCard;
