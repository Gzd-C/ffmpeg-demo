import './Player.css'

export default function Player(props) {
  const {url, title} = props
  return (
    <div className='player-wrap'>
        <h3>{title ? title : 'video title'}</h3>
        <div className='player'>
          <video controls src={url ? url : ''}></video>
        </div>
    </div>
  )
}
