import { useState } from "react";
import style from "./Songs.module.scss";
const Songs = ({ songs }) => {
  const [isPlaying, setisPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setisPlaying(null);
    } else setisPlaying(index);
  };
  return (
    <div className={style.MusicContainer}>
      <h3>Recommended Tracks</h3>

      <ul>
        {Array.isArray(songs) && songs.length > 0 ? (
          songs.map((song, index) => (
            <li key={index}>
              <div className="songDetail">
                <p>{song.title}</p>
                <p>{song.artist}</p>
              </div>
              <div className={style.playPauseBtn}>
                {
                    isPlaying === index &&
                    <audio src={song.audio} autoPlay={isPlaying === index} controls></audio>
                }
                <button onClick={() => handlePlayPause(index)}>{isPlaying === index ? <i className="ri-pause-line"></i> : <i className="ri-play-large-line"></i>}</button>
              </div>
              <div className="audioPlayer">
                
              </div>
            </li>
          ))
        ) : (
          <li>No songs available</li>
        )}
      </ul>
    </div>
  );
};

export default Songs;
