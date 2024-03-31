import OperationPanel from '@/components/OperationPanel';
import Player from '@/components/Player/Player';
import Timetrack from '@/components/Timetrack';
import React from 'react';
import './index.css';

const EditorContainer: React.FC = () => {
    return (
      <div className='editor-wrapper'>
        <div className='editor'>
          <Player />
          <OperationPanel />
        </div>
        <Timetrack />
      </div>
    );
}

export default EditorContainer