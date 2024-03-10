import Draguploader from "@/components/Draguploader/DragUploader";
import Player from "@/components/Player/Player";
import { fetchFile } from '@ffmpeg/ffmpeg';
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Preview.css";
export default function Preview() {
  const [url, setUrl] = useState("")
  const { ffmpeg } = useSelector(state => state.common)

  return (
    <div className="upload-wrap">
      <div className="uploader">
        <Draguploader ffmpeg={ffmpeg} fetchFile={fetchFile} setUrl={setUrl} />
      </div>
      <div className="play-box">
        <Player url={url} />
      </div>
    </div>
  )
}
