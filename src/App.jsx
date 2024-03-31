import { setFFmpeg } from '@/store/modules/common';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import EditorContainer from './layout/EditorContainer';
import FileContainer from "./layout/FileContainer";

function App() {

  // 初始化ffmpeg
  const ffmpeg = createFFmpeg({
    // corePath: '../../public/ffmpeg-core.js',// 'https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js',
    log: true,
    progress: (progress) => console.log("progress", progress)
  })

  const initFFmpeg = async () => {
    await ffmpeg.load()
    console.log("ffmpeg初始化完成")
  }
  const dispatch = useDispatch()
  useEffect(() => {
    initFFmpeg()
    dispatch(setFFmpeg(ffmpeg))
  }, [])

  return (
    <div className="App">
      <FileContainer />
      <EditorContainer />
    </div>
  );
}

export default App;
