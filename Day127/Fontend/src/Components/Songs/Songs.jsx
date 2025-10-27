import style from './Songs.module.scss'
const Songs = ({songs}) => {

  return (
    <div className={style.MusicContainer}>
        <h3>Recommended Tracks</h3>
        
        <ul>
            {songs.map((song, index) => (
                <li key={index}>
                <div className="songDetail">
                    <p>{song.title}</p>
                <p>{song.artist}</p>
                </div>
                <i className="ri-play-large-line"></i>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Songs