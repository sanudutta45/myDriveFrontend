import React, { useState, useEffect, useRef } from "react"
import { CircularProgressbar } from "react-circular-progressbar"
import Axios from "axios"
import { v4 as uuidv4 } from "uuid"

//actions
import {
  saveUpload,
  doGetSignedPart,
  doGetUploadId,
  abortUpload,
} from "../../../../actions/fileAction"
import { Spinner } from "react-bootstrap"

const axios = Axios.create()

const SLICE_SIZE = 10_000_000

const DownloaderCard = ({ file, setReFetchChild, currentFolder }) => {
  const [chunks, setChunks] = useState([])
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [showRestart, setShowRestart] = useState(false)
  const [status, setStatus] = useState("pending")
  const listItemRef = useRef(null)
  const folderIdRef = useRef(currentFolder.id)
  const axiosSourceRef = useRef(Axios.CancelToken.source())
  const bucketFileName = useRef(null)

  let uploadIdRef = useRef(null)

  const onUploadProgress = (fileSize, id, e) => {
    const completeProgress = (e.loaded / fileSize) * 100 || 0
    setChunks((prevChunks) =>
      prevChunks.map((chunk) => {
        if (chunk.id === id) return { ...chunk, progress: completeProgress }
        return chunk
      })
    )
  }

  const handleUpload = async (fileData) => {
    const promises = []
    const urls = Object.keys(fileData.partsUrl)
    const file = fileData.file
    const type = fileData.file.type
    const fileSize = fileData?.file?.size
    const cancelToken = axiosSourceRef.current.token
    axios.defaults.headers.put["content-Type"] = type

    for (const indexStr of urls) {
      const partIndex = parseInt(indexStr)
      const start = partIndex * SLICE_SIZE
      const end = (partIndex + 1) * SLICE_SIZE
      const blob =
        partIndex < urls.length ? file.slice(start, end) : file.slice(start)
      const config = {
        onUploadProgress: (e) => onUploadProgress(fileSize, partIndex, e),
        cancelToken,
      }
      const chunk = {
        id: partIndex,
        progress: 0,
      }

      setChunks((prevChunks) => [...prevChunks, chunk])
      blob &&
        promises.push(axios.put(fileData?.partsUrl[partIndex], blob, config))
    }
    try {
      setStatus("in-progress")
      setShowProgress(true)
      const resParts = await Promise.all(promises)
      const parts = resParts.map((part, index) => ({
        ETag: part.headers.etag,
        PartNumber: index + 1,
      }))

      const values = {
        fileName: fileData.name,
        bucketFileName: fileData.bucketFileName,
        uploadId: fileData.uploadId,
        parentId: currentFolder.id,
        fileSize,
        parts,
      }

      await saveUpload(values)
      setStatus("done")
      if (currentFolder.id === folderIdRef.current) {
        console.log(
          "current folder ",
          currentFolder.id,
          " ",
          folderIdRef.current
        )
        setReFetchChild((refetch) => !refetch)
      }
    } catch (error) {
      if (Axios.isCancel(error)) setStatus("canceled")
      else setStatus("failed")
    }
  }
  const prepareUpload = async () => {
    const selectedFile = file
    const fileSize = selectedFile.size
    const noOfParts = Math.floor(fileSize / SLICE_SIZE) + 1
    const fileName = selectedFile.name
    bucketFileName.current = `${uuidv4().substring(0, 8)}_${fileName}`
    try {
      uploadIdRef.current = await doGetUploadId(bucketFileName.current)

      const values = {
        bucketFileName: bucketFileName.current,
        parts: noOfParts,
        uploadId: uploadIdRef.current,
      }
      const signedUrl = await doGetSignedPart(values)

      const currentFile = {
        name: fileName,
        bucketFileName: bucketFileName.current,
        file: selectedFile,
        partsUrl: signedUrl,
        uploadId: uploadIdRef.current,
      }
      handleUpload(currentFile)
    } catch (error) {
      setStatus("failed")
    }
  }

  useEffect(() => {
    folderIdRef.current = currentFolder.id
  }, [currentFolder])

  useEffect(() => {
    const scrollToView = () => {
      return listItemRef?.current?.scrollIntoView({
        behaviour: "smooth",
        block: "nearest",
      })
    }

    scrollToView()
    prepareUpload()
  }, [])

  useEffect(() => {
    if (chunks.length === 0) return
    let totalProgress = 0
    chunks.forEach((chunk) => (totalProgress += chunk.progress))
    setProgress(totalProgress)
  }, [chunks])

  const handleCancel = async () => {
    const reqObj = {
      bucketFileName: bucketFileName.current,
      uploadId: uploadIdRef.current,
    }
    try {
      axiosSourceRef.current.cancel()
      axiosSourceRef.current = Axios.CancelToken.source()
      setChunks([])
      abortUpload(reqObj)
    } catch (error) {
      console.log("error in aborting")
    }
  }

  return (
    <div className='upload__item__wrapper' ref={listItemRef}>
      <div className='upload__item__item'>
        {/* <span className="play__pause">
          {state.status === "progress" ? (
            <i className="fa fa-pause" onClick={() => handlePause()}></i>
          ) : state.status === "paused" ? (
            <i className="fa fa-play" onClick={() => handleResume()}></i>
          ) : (
            ""
          )}
        </span> */}
        <h3>{file.name}</h3>
      </div>
      <div className='upload__item__item__wrapper' id='uploader'>
        {status === "done" && Math.floor(progress) === 100 && (
          <div>
            <span className='fa fa-check icon_select'></span>
          </div>
        )}
        {status === "pending" && (
          // <div className='spinner-border preloader' role='status'>
          //   <span className='sr-only'>Loading...</span>
          // </div>
          <div>
            <Spinner animation='border' role='status' className='preloader'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          </div>
        )}
        {status === "in-progress" && (
          <div
            onMouseOver={() => setShowProgress(false)}
            onMouseLeave={() => setShowProgress(true)}
            onClick={() => handleCancel()}
          >
            {showProgress ? (
              <CircularProgressbar
                value={progress}
                maxValue={100}
                strokeWidth={15}
              />
            ) : (
              <span className='fa fa-times mouse_cancel'></span>
            )}
          </div>
        )}

        {status === "failed" && (
          <div>
            <span className='fa fa-warning text-danger p-1'></span>
          </div>
        )}
        {status === "canceled" && (
          <div
            onMouseOver={() => setShowRestart(true)}
            onMouseLeave={() => setShowRestart(false)}
            onClick={() => prepareUpload()}
          >
            {showRestart ? (
              <span className='fa fa-refresh cancel_refresh'></span>
            ) : (
              <span className='fa fa-times cancel_status'></span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DownloaderCard
