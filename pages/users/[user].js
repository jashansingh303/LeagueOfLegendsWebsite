import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from "axios"
import playerInfo from "../components/playerInfo.js"

const User = () => {
  const router = useRouter()
  const {user} = router.query
  const [gameList, setGameList] = useState([])
  const [playerData, setPlayerData] = useState([])
  const [playerRankedData, setPlayerRankedData] = useState([])

  // const count = useSelector((state) => state.counter.value)
  // const requests = useSelector((state) => state.reqs.value)
  
    useEffect(() => {
      axios.get("http://localhost:4000/playerData", {params: {username: user}})
    .then(function (response) {
        setPlayerData(response.data)
    })
    .catch(function(error) {
      return error
    })
    },[]) 

    // useEffect(() => {
    //     axios.get("http://localhost:4000/rankedData", {params: {username: user}})
    //   .then(function (response) {
    //     setPlayerRankedData(response.data)
    //     console.log(playerRankedData)
    //   })
    //   .catch(function(error) {
    //     return error
    //   })
    //   },[]) 
    
    useEffect(() => {
        axios.get("http://localhost:4000/past5Games", {params: {username: user}})
      .then(function (response) {
        setGameList(response.data)
      })
      .catch(function(error) {
        return error
      })
      },[]) 

    if (playerData.name == "undefined") {
        return (<div>User is not registered with Riot Games, please check the spelling</div>)
    }

    if (gameList.length === 0){
      return (<div>Loading</div>)
    }

  return ( 
    
    <div className='bg-gray-700 font-KumbhSans '>
        <p className=''><a href='http://localhost:3000/' className='mx-10 pt-5 font-serif text-white text-3xl font-KumbhSans font-semibold'>Search.GG</a></p>
        <main className='max-w-[80%] mx-auto py-10'>
        <div className=''>
        <div className=''>

        <div className='flex'>
            <img src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/" + playerData.profileIconId + ".png"} className="h-[100px] w-[100px] rounded-xl "/>
            <div className='flex w-[300px] ml-[50px] flex-col mb-[100px]'>
                <h1 className='text-[50px]'>{user}</h1>
                <h2 className=''  >Level {playerData.summonerLevel}</h2>
            </div>
        </div>
        
        {/* <p>{playerRankedData.tier}</p> */}


      {/* <div>{playerData}</div> */}
      {/* <div>{count}</div> */}
    {/* <playerInfo></playerInfo> */}
    
    <div className='flex flex-col'>
        {gameList.map((gameData, index) => 
    <div>
      
      {/* <h1>Game {index + 1}</h1> */}
      <h2 className='text-center'>{gameData.info.gameMode}</h2>
      
      <div className=''>{gameData.info.participants.map((data)=>
        <div className=''>
            <div className='flex min-w-[90%] justify-center'>
                <img src= {"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/" + data.championName + ".png"} className="rounded-full flex flex-row h-[30px] w-[30px]"/>
                <p>{data.champLevel}</p>
                    {/* <div>
                        <img src= {"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/" + data.summoner1Id + ".png"}/>
                        <img src= {"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/" + data.summoner2Id + ".png"}/>
                    </div>  */}
                {data.summonerName},  
                KDA: {data.kills}/{data.deaths}/{data.assists}, 
                Damage Dealt: {data.totalDamageDealt}, 
                Damage Taken: {data.totalDamageTaken}, 
                Vison Score: {data.visionScore} ,
                CS: {data.totalMinionsKilled}   
                Items: 
                <div className='flex h-[30px] w-[30px]'>
                    <img src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item1 + ".png"} alt="" />
                    <img src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item2 + ".png"} alt="" />
                    <img src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item3 + ".png"} alt="" />
                    <img src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item4 + ".png"} alt="" />
                    <img src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item5 + ".png"} alt="" />
                    <img src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item6 + ".png"} alt="" />
                </div>
                <br></br>
            </div>
         
         </div>)}</div>
         
    </div>
    )
  }</div>


  </div>
  </div>
  </main>
  </div>
  )
}

export default User