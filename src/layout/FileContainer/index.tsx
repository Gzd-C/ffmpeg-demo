import Uploader from '@/components/Uploader';
import { Card, Space } from 'antd';
import React from 'react';
import './index.css';

const FileContainer: React.FC = () => {
  
    return (
      <Space direction="vertical" size={16} style={{margin: '0 10px'}}>
        <Card
          title='视频'
          style={{width: 500}}
        >
          <Uploader type='video' />
        </Card>
        <Card
          title='音频'
          style={{width: 500}}
        >
          <Uploader type='audio' />
        </Card>
        <Card
          title='图片'
          style={{width: 500}}
        >
          <Uploader type='image' />
        </Card>
      </Space>
    );
}

export default FileContainer