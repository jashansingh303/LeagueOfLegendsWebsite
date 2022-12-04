import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from "axios"

const User = () => {
  const router = useRouter()
  const {user} = router.query
  const [gameList, setGameList] = useState([])

  // const count = useSelector((state) => state.counter.value)
  // const requests = useSelector((state) => state.reqs.value)
  
    useEffect(() => {
      axios.get("http://localhost:4000/past5Games", {params: {username: user}})
    .then(function (response) {
      setGameList(response.data)
    })
    .catch(function(error) {
      console.log(error)
      setPlayerData(response.data)
    })
    },[]) 
    
    if (gameList.length == 0){
      return (<div>Loading</div>)
    }

  return ( 
    <>
      {/* <div>{playerData}</div> */}
      {/* <div>{count}</div> */}
    {
    gameList.map((gameData, index) => 
    <>
      <h1>Game {index + 1}</h1>
      <div>
        {gameData.info.participants.map((data, participantIndex)=>
      <p>Player {participantIndex + 1}: {data.summonerName}, KDA: {data.kda}</p>)
      }
      </div>
    </>
    )
  }


  </>
  )
}

export default User