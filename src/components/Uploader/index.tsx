import {
  setAudioList, setCurrentVideo, setImageList, setVideoList
} from '@/store/modules/common';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchFile } from '@ffmpeg/ffmpeg';
import type { UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface UploaderProps {
  type: string
}

const Uploader: React.FC<UploaderProps> = (props) => {
  const { type } = props
  const { ffmpeg } = useSelector((state:any) => state.common)
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useDispatch()
  const handleChange: UploadProps['onChange'] = (info) => {
    setLoading(true)
    let newFileList: any = [...info.fileList];
    if (newFileList.length) {
      newFileList.at(-1).status = 'done' 
    }
    setFileList(newFileList);
    switch(type) {
      case 'video':
        dispatch(setVideoList(newFileList)); break;
      case 'audio':
        dispatch(setAudioList(newFileList)); break;
      case 'image':
        dispatch(setImageList(newFileList)); break;
      default: console.log('null')
    }
    setLoading(false)
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  // 预览的回调
  const handlePreview = async (file: any) => {
    try {
        // 如果内存中已经有该文件，则直接读取
        let url = ffmpeg.FS('readFile', file.originFileObj.name)
        let videoFileUrl = URL.createObjectURL(new Blob([url.buffer], { type: 'video/mp4' }))
        dispatch(setCurrentVideo({
          url: videoFileUrl,
          name: file.originFileObj.name
        }))
    } catch {
        const result = await fetchFile(file.originFileObj)
        ffmpeg.FS('writeFile', file.originFileObj.name, result);
        // 在内存中读取文件
        const data = ffmpeg.FS('readFile', file.originFileObj.name);
        // 获取内存中的播放地址
        let videoFileUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
        dispatch(setCurrentVideo({
          url: videoFileUrl,
          name: file.originFileObj.name
        }))
    }
  };
  return (
    <Upload
        name="avatar"
        className="avatar-uploader"
        fileList={fileList}
        onChange={handleChange}
        onPreview = {handlePreview}
    >
        {fileList.length > 8 ? null : uploadButton}
    </Upload>
  );
};

export default Uploader