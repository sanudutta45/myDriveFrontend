import React, { useState } from "react"

//components
import DownloaderCard from "./DownloaderCard"

//scss
import "./Downloader.scss"

const Downloader = (props) => {
  const [uploaderShow, setUploaderShow] = useState(true)

  return (
    <div className='uploader__wrapper'>
      <div className='uploader__header__wrapper'>
        <h3 className='uploader__header__title'>Downloads</h3>
        <div className='uploader__header__button_wrapper'>
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
            currentFolder={props.currentFolder}
            file={file}
            key={file.name}
            setReFetchChild={props.setReFetchChild}
          />
        ))}
      </div>
    </div>
  )
}

export default Downloader
