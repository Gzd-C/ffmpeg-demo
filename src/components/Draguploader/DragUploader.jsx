import { UploadOutlined } from '@ant-design/icons';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove, SortableContext, useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';
import { Button, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
const DraggableUploadListItem = ({ originNode, file }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.uid,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
  };

  // prevent preview event when drag end
  const className = isDragging
    ? css`
        a {
          pointer-events: none;
        }
      `
    : '';
  return (
    <div ref={setNodeRef} style={style} className={className} {...attributes} {...listeners}>
      {/* hide error tooltip when dragging */}
      {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>
  );
};
const Draguploader = (props) => {
  const [fileList, setFileList] = useState([]);
  const {ffmpeg, fetchFile, setUrl} = props
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  // 预览的回调
  const handlePreview = async (file) => {
    try {
        // 如果内存中已经有该文件，则直接读取
        let url = ffmpeg.FS('readFile', file.originFileObj.name)
        let videoFileUrl = URL.createObjectURL(new Blob([url.buffer], { type: 'video/mp4' }))
        setUrl(videoFileUrl)
    } catch {
        const result = await fetchFile(file.originFileObj)
        ffmpeg.FS('writeFile', file.originFileObj.name, result);
        // 在内存中读取文件
        const data = ffmpeg.FS('readFile', file.originFileObj.name);
        // 获取内存中的播放地址
        let videoFileUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
        setUrl(videoFileUrl)
    }
  };
      // 上传时调用的方法
  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      newFileList.at(-1).status = 'done' 
      setFileList(newFileList);
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
    try {
      ffmpeg.FS('unlink', file.name);
      console.log('卸载该视频')
    } catch (e) {
      console.log('卸载失败', e)
    }
    // 从state中删除
    let newFileList = fileList.filter((val) => val.uid !== file.uid)
    setFileList(newFileList)
    setUrl('')
  }
  useEffect(() => {
    return () => {
      console.log('clear')
      fileList.forEach(file => {
        console.log('clearfile', file)
        try {
          ffmpeg.FS('unlink', file.name);
          console.log('卸载该视频')
        } catch (e) {
          console.log('卸载失败', e)
        }
      })
    }
  })

  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
        <Upload
          fileList={fileList}
          accept='video/mp4'
          onPreview = {handlePreview}
          onChange = {handleChange}
          beforeUpload = {handleBeforeUpload}
          onRemove = {handleRemove}
          itemRender={(originNode, file) => (
            <DraggableUploadListItem originNode={originNode} file={file} />
          )}
        >
          <Button icon={<UploadOutlined />}>上传视频</Button>
        </Upload>
      </SortableContext>
    </DndContext>
  );
};
export default Draguploader;