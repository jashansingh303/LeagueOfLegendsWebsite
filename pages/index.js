import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [searchText, setSearchtext] = useState("")
  const [gameList, setGameList] = useState([])
  const router = useRouter()

  function getPlayerGames(){
    axios.get("http://localhost:4000/past5Games", {params: {username: searchText}})
    .then(function (response) {
      setGameList(response.data)
      console.log(gameList)
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  return (
    <div className={styles.container}>
      <h2>Welcome to our proxy server app</h2>
      <input type="text" onChange={e=> setSearchtext(e.target.value)}></input>
      <button onClick={()=>{router.push('/users/'+  searchText)}}>Submit</button>
              {/* {
          gameList.map((gameData, index) => 
          <>
            <h1>Game {index + 1}</h1>
            <div>
              {gameData.info.participants.map((data, participantIndex)=>
            <p>Player {participantIndex + 1}: {data.summonerName}, KDA: {data.kills}/{data.deaths}</p>)
            }
            </div>
          </>
          )
        } */}
    </div>
  )
}
