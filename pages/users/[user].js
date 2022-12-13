import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from "axios"
import Tippy from '@tippyjs/react';
import 'tw-elements';

String.prototype.timeConverter = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes + ':' + seconds;
}

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

    console.log(gameList)
    
    // const half = gameList.info.participants.slice(0,4)
    
    const summonerSpellArray = {
      '1': 'SummonerBoost',
      '3': 'SummonerExhaust',
      '4': 'SummonerFlash',
      '6': 'SummonerHaste',
      '7': 'SummonerHeal',
      '11': 'SummonerSmite',
      '12': 'SummonerTeleport',
      '13': 'SummonerMana',
      '14': 'SummonerDot',
      '21': 'SummonerBarrier',
      '30': 'SummonerPoroRecall',
      '31': 'SummonerPoroThrow',
      '32': 'SummonerSnowball',
      '39': 'SummonerSnowURFSnowball_Mark',
      '54': 'Summoner_UltBookPlaceholder',
      '55': 'Summoner_UltBookSmitePlaceholder'
      }
    
  return ( 

    
    <div className='bg-gray-700 font-KumbhSans '>
      <p className=''><a href='http://localhost:3000/' className='mx-10 pt-5 font-serif text-white text-3xl font-KumbhSans font-semibold'>Search.GG</a></p>
      <main className=''>


      {/* Summoner Data */}
      <div className=' bg-slate-50 '>
            <div className='flex ml-[150px] mt-[50px] pt-[50px] just'> 
            <img src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/" + playerData.profileIconId + ".png"} className="h-[100px] w-[100px] rounded-xl "/>
              <div className='flex w-[300px] ml-[50px] flex-col mb-[100px]'>
                  <h1 className='text-[50px]'>{user}</h1>
                  <h2 className=''>Level {playerData.summonerLevel}</h2>
              </div>
            </div>
      </div>

{/* start */}
<div className='accordian w-[60%] mx-auto'>

{gameList.map((gameData,index ) => 
    
  <div className="Bg-holder accordion-item bg-white border border-gray-200" key={index}> 

    <h2 className="accordion-header mb-0 flex " id="flush-headingOne" data-bs-toggle="collapse" data-bs-target={`#game-${index}`}>
      <div className=' w-full'>

          <div>
            {
              gameData.info.participants.map((data) => {
                if (data.summonerId == playerData.id) {
                  return(
                    <div className='flex' key={index}>
                      <div className='Game-Data w-[100px] text-center my-auto leading-2 ml-3'>
                        <div>{gameData.info.gameMode}</div>
                        <div>{data.win ? <>Victory</> : <>Defeat</>}</div>
                        <div>{String(gameData.info.gameDuration).timeConverter()}</div>
                      </div>
                      
                      <div className='w-[200px] flex my-auto pl-3'>
                        <div className='my-auto mr-3'>
                           <div><img className="Champion h-[50px] w-[50px] rounded-full my-auto" src= {"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/" + data.championName + ".png"}/></div>
                        </div>
                        <div className='flex'>
                          <div className='Summoner Spells '>
                            <Tippy content="I am a tip">
                              <div>
                                <img className='rounded-xl h-[50px] w-[50px] mb-1' src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/" + summonerSpellArray[data.summoner1Id] +".png"}/>
                              </div>
                            </Tippy>

                            <Tippy content="Tooltip">
                              <div>
                                <img className='rounded-xl h-[50px] w-[50px]' src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/" + summonerSpellArray[data.summoner2Id] +".png"}/>
                              </div>
                            </Tippy>
                          </div>
                        </div>
                      </div>

                      <div className='kda w-[70px] text-center my-auto pr-3'>
                        <div className=''>{data.kills}/{data.deaths}/{data.assists}</div>
                        <div>{}</div>
                      </div>

                      <div className='Items flex w-[400px] my-auto align-middle'>
                        <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item1 + ".png"} alt="" />
                        <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item2 + ".png"} alt="" />
                        <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item3 + ".png"} alt="" />
                        <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item4 + ".png"} alt="" />
                        <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item5 + ".png"} alt="" />
                        <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item6 + ".png"} alt="" />
                      </div> 

                      <div className='flex flex-col my-auto w-[200px]'>
                        <div>Vision Score {data.wardsPlaced}</div>
                        <div>Creep Score {data.totalMinionsKilled}</div>
                      </div>
                    
                      <div className='players w-[700px] pl-[25px] my-auto py-2'>
                      {gameData.info.participants.map((data) =>
                        <div className='flex my-auto' key={index}>
                          <img src= {"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/" + data.championName + ".png"} className="rounded-full h-[25px]"/>
                          <div className='pl-1 w-[250px]'>{data.summonerName}</div>
                        </div>
                      )}
                      </div>

                    </div>
                    ) 
                }
              })
            }
          </div>

    </div>
        
    <button className=" py-auto accordion-button relative flex items-center w-full  px-5 text-base text-gray-800 text-left bg-white  transition focus:outline-none" 
              type="button" data-bs-toggle="collapse" data-bs-target={`#game-${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
        </button>


    </h2>

    <div id={`game-${index}`} className="accordion-collapse border-0 collapse show" aria-labelledby="flush-headingOne">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                {gameData.info.participants.slice(0,1).map((data) =>
                  <tr className='mx-auto' key={index}>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    <div className='text-center'>{data.win ? <>Victory</> : <>Defeat</>}</div>
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      KDA
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Damage
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Wards
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      CS
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Items
                    </th>
                  </tr>
                )}
                </thead>
                <tbody>
                {gameData.info.participants.slice(0,5).map((data) =>
                  
                  <tr className="" key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 w-[250px]">
                      <div className=''>
                        <div className='flex my-auto '>
                            <div className='my-auto mr-3'>
                              <div key={index}><img className="Champion h-[40px] w-[40px] rounded-full my-auto" src= {"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/" + data.championName + ".png"}/></div>
                            </div>
                            <div className='flex'>
                              <div className='Summoner Spells '>
                                <Tippy content="I am a tip">
                                  <div>
                                    <img className='rounded-xl h-[20px] w-[20px] mb-1' src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/" + summonerSpellArray[data.summoner1Id] +".png"}/>
                                  </div>
                                </Tippy>
                                <Tippy content="Tooltip">
                                  <div>
                                    <img className='rounded-xl h-[20px] w-[20px]' src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/" + summonerSpellArray[data.summoner2Id] +".png"}/>
                                  </div>
                                </Tippy>
                              </div>
                              <div className='my-auto mx-3'>{data.summonerName}</div>
                            </div>
                          </div>
                      </div>
                    </td>

                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className=''>{data.kills}/{data.deaths}/{data.assists}</div> 
                      </div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap w-[100px]">
                      <div className='flex flex-row space-x-2 '>
                        <div className='mx-auto'>{data.totalDamageDealt}</div>
                        <div className='mx-auto'>{data.totalDamageTaken}</div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    <div className=''>{data.wardsPlaced}</div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                        <div>{data.totalMinionsKilled}</div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div className='Items my-auto'>
                        <div className='flex justify-center'>
                          <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item1 + ".png"} alt="" />
                          <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item2 + ".png"} alt="" />
                          <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item3 + ".png"} alt="" />
                          <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item4 + ".png"} alt="" />
                          <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item5 + ".png"} alt="" />
                          <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item6 + ".png"} alt="" />
                        </div> 
                      </div>
                    </td>
                  </tr>)}
                </tbody>

                <thead className="border-b">
                {gameData.info.participants.slice(5,6).map((data) =>
                  <tr key={index}>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                    <div>{data.win ? <>Victory</> : <>Defeat</>}</div>
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      KDA
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Damage
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Wards
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      CS
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Items
                    </th>
                  </tr>
                )}
                </thead>
                <tbody>
                {gameData.info.participants.slice(5,10).map((data) =>
                  <tr className="border-b" key={index}>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div>
                        <div className='flex my-auto '>
                            <div className='my-auto mr-3'>
                              <div key={index}><img className="Champion h-[40px] w-[40px] rounded-full my-auto" src= {"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/" + data.championName + ".png"}/></div>
                            </div>
                            <div className='flex'>
                              <div className='Summoner Spells '>
                                <Tippy content="I am a tip">
                                  <div>
                                    <img className='rounded-xl h-[20px] w-[20px] mb-1' src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/" + summonerSpellArray[data.summoner1Id] +".png"}/>
                                  </div>
                                </Tippy>

                                <Tippy content="Tooltip">
                                  <div>
                                    <img className='rounded-xl h-[20px] w-[20px]' src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/" + summonerSpellArray[data.summoner2Id] +".png"}/>
                                  </div>
                                </Tippy>
                              </div>
                              <div className='my-auto mx-3'>{data.summonerName}</div>
                            </div>
                          </div>
                      </div>
                    </td>

                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className=''>{data.kills}/{data.deaths}/{data.assists}</div> 
                      </div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap w-[100px]">
                      <div className='flex flex-row space-x-2 '>
                        <div className='mx-auto'>{data.totalDamageDealt}</div>
                        <div className='mx-auto'>{data.totalDamageTaken}</div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    <div className=''>{data.wardsPlaced}</div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                        <div>{data.totalMinionsKilled}</div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div className='Items my-auto'>
                          <div className='flex justify-center'>
                            <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item1 + ".png"} alt="" />
                            <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item2 + ".png"} alt="" />
                            <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item3 + ".png"} alt="" />
                            <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item4 + ".png"} alt="" />
                            <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item5 + ".png"} alt="" />
                            <img className='h-[35px] rounded-lg ' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" + data.item6 + ".png"} alt="" />
                          </div> 
                        </div>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

)}
</div>
    </main>
  </div>
  )
}

export default User