import { useState } from 'react'
import style from './Songs.module.scss'
const Songs = () => {

    const [songs, setSongs] = useState([
        {
            title: 'test_title',
            artist: 'test_artist',
            url: "test_url"
        },
        {
            title: 'test_title2',
            artist: 'test_artist',
            url: "test_url"
        },
    ])
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