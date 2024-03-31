import { setDuration } from '@/store/modules/common';
import { useDispatch, useSelector } from 'react-redux';
import './Player.css';

export default function Player(props: any) {
  const { currentVideo } = useSelector((state: any) => state.common)
  const dispatch = useDispatch()
  return (
    <div className='player-wrap'>
        <h3>{currentVideo.name ? currentVideo.name : 'title'}</h3>
        <div className='player'>
          <video
            controls
            src={currentVideo.url ? currentVideo.url : ''}
            id='video'
            onDurationChange={(e) => {
              const videoDom = document.getElementById('video') as HTMLVideoElement
              dispatch(setDuration(videoDom.duration))
            }}
            />
        </div>
    </div>
  )
}
