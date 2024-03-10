import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';

export default function Uploader(props) {
    const {setFile, buttonText, acceptImg, acceptFile, maxCount} = props
    const [fileList, setFileList] = useState([]);
    const handleChange = ({ fileList: newFileList }) => {
        if (newFileList.length > 0) {
          newFileList.at(-1).status = 'done' 
          setFileList(newFileList);
          console.log(fileList)
          setFile(newFileList[0].originFileObj)
        }
    }
      // 限制只能上传mp4文件
    const handleBeforeUpload = (file) => {
        const isMP4 = file.type === 'video/mp4';
        if (!isMP4) {
            message.error('只能上传mp4文件！');
        } 
        return isMP4 || Upload.LIST_IGNORE;
    }
    // 移除视频时的回调
    const handleRemove = (file) => {
        console.log('remove',file)
        // 从state中删除
        let newFileList = fileList.filter((val) => val.uid !== file.uid)
        setFileList(newFileList)
        setFile('')
    } 
    return (
        <Upload
            accept={acceptImg ? acceptFile ? '.srt' : 'image/*' :'video/mp4'}
            fileList={fileList}
            maxCount={maxCount ? maxCount : 1}
            onChange={handleChange}
            beforeUpload = {acceptImg || acceptFile ? null : handleBeforeUpload}
            onRemove = {handleRemove}
        >
          <Button icon={<UploadOutlined />}>{buttonText ? buttonText : '上传视频'}</Button>
        </Upload>
    )
}
