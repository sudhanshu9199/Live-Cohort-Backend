import FacialExpression from './Components/FacialExpression/FacialExpression.jsx'
import Songs from "./Components/Songs/Songs.jsx";
import { useState } from 'react'

const App = () => {
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
    <div>
      <FacialExpression setSongs={setSongs}/>
      <Songs songs = {songs}/>
    </div>
  )
}

export default App