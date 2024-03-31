import { Button, Card, Form } from 'antd';
import React from 'react';
import './index.css';

const OperationPanel: React.FC = () => {
  
    return (
      <div className='operation-wrapper'>
        <Card
          title='操作'
          style={{width: '95%', height: '50%', margin: '10px 10px 0'}}
        >
          <div className='opration'>
            <Button>分割视频</Button>
            <Button>分割视频</Button>
            <Button>分割视频</Button>
          </div>
        </Card>
        <Card
          title='参数设置'
          style={{width: 400, height: '50%', margin: '10px 10px 0'}}
        >
          <Form>

          </Form>
        </Card>
      </div>
    );
}

export default OperationPanel