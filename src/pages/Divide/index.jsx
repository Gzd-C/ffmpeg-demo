import Player from '@/components/Player/Player';
import Uploader from '@/components/Uploader/Uploader';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { useSelector } from "react-redux";
import './index.css';

export default function Divide() {
    const { ffmpeg } = useSelector(state => state.common)
    const [file, setFile] = useState(null)
    const [timeUrl, setTimeUrl] = useState('')
    const [url1, setUrl1] = useState('')
    const [url2, setUrl2] = useState('')
    const [title1, setTitle1] = useState('')
    const [title2, setTitle2] = useState('')
    const handleClick = async () => {
        if (file) {
            let input = document.getElementById('divideInput')
            console.log('加载要剪切的视频',input.value, file)

            let videoArr = document.querySelectorAll("video")
            console.log('videoArr', videoArr)
            console.log('总时长',videoArr[2].duration)
            // -ss 00:00:00 -i sample_Input.mp4 -c copy -t 01:17:55 sample_Output-part1.mp4 #Start～01:17:55
            const cmd1 = '-ss 00:00:00 -i ' + file.name + ' -t ' + input.value + ' -c copy 1.mp4'
            const cmd2 = '-ss ' + input.value + ' -i ' + file.name + ' -t ' + videoArr[2].duration + ' -c copy 2.mp4'
            if(!ffmpeg.isLoaded()) {
                alert('请加载视频')
                return
            }
            let args1 = cmd1.split(' ')
            console.log('args',args1)
            await ffmpeg.run(...args1)
            let args2 = cmd2.split(' ')
            console.log('args',args2)
            await ffmpeg.run(...args2)
            const data1 = ffmpeg.FS( 'readFile' , '1.mp4' );
            const data2 = ffmpeg.FS( 'readFile' , '2.mp4' );
            let u1 = URL.createObjectURL( new Blob( [data1.buffer] , { type: 'video/mp4' } ) );
            let u2 = URL.createObjectURL( new Blob( [data2.buffer] , { type: 'video/mp4' } ) );
            setUrl1(u1)
            setUrl2(u2)
        }
    }
    // 加载视频
    const loadVideo = async () => {
        console.log('挂载视频')
        console.log('ffmpeg', ffmpeg)
        ffmpeg.FS('writeFile', file.name, await fetchFile(file));
        const data = ffmpeg.FS('readFile', file.name);
        // 用一个不显示的video获取总时长
        let getTime = URL.createObjectURL( new Blob( [data.buffer] , { type: 'video/mp4' } ) );
        setTimeUrl(getTime)
    }
    return (
        <div>
            <h3>将视频按输入时间点剪切成两部分,时间的格式为XX:XX:XX</h3>
            <div className="divide-uploader">
                <Uploader setFile={setFile}/>
            </div>
            <div>上传之后点击加载视频</div>
            <Button style={{margin: '10px 0'}} onClick={loadVideo}>加载视频</Button>
            <div style={{width: '300px', display: 'flex'}}>
                <Input id='divideInput' styles={{width: '300px', height: '500px'}} placeholder="请输入视频分割的时间点" />
                <Button onClick={handleClick}>确认</Button>
            </div>
            <div className='divide-wrap'>
                <div className="player1">
                    <Player url={url1} title={title1}/>
                </div>
                <div className="player2">
                    <Player url={url2} title={title2}/>
                </div>
                <video style={{display: 'none'}} src={timeUrl}></video>
            </div>
        </div>
    )
}
