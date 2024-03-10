import Navbar from "@/layout/Navbar/index";
import routes from '@/routes';
import { setFFmpeg } from '@/store/modules/common';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import './App.css';

function App() {

  const router = useRoutes(routes)

  // 初始化ffmpeg
  const ffmpeg = createFFmpeg({
    // corePath: '../../public/ffmpeg-core.js',// 'https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js',
    log: true,
    progress: (log) => console.log("ffmpeglog", log)
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
      <Navbar />
      {router}
    </div>
  );
}

export default App;
