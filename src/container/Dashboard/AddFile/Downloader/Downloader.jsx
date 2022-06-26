import React, { Fragment, useState } from "react";

//components
import DownloaderCard from "./DownloaderCard";

//scss
import "./Downloader.scss";

const Downloader = (props) => {
  const [uploaderShow, setUploaderShow] = useState(true);

  return (
    <Fragment>
      <div
        className={
          props.files.length !== 0
            ? "uploader__wrapper"
            : "uploader__wrapper--gone"
        }
      >
        <div className="uploader__header__wrapper">
          <h3 className="uploader__header__title">Downloads</h3>
          <div className="uploader__header__button_wrapper">
            <i
              className={`${
                uploaderShow ? "fas fa-angle-down" : "fas fa-angle-up"
              } uploader__header__button`}
              onClick={() => setUploaderShow(!uploaderShow)}
            />
            {/* <img
              className="uploader__header__button"
              onClick={() => setCancelAll(true)}
              src={`${ss_cdn_url}/images/close-white-png.png`}
              alt="..."
            /> */}
          </div>
        </div>
        <div
          className={
            uploaderShow
              ? "upload__item__block"
              : "upload__item__block upload__item__block--hide"
          }
        >
          {props.files.map((file) => (
            <DownloaderCard
              file={file}
              key={file.id}
              // cancelAll={cancelAll}
              // removeFromQueue={removeFromQueue}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Downloader;
