import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'

// import img1 from "/assests/wavesOpacity.svg"


export default function Home() {
  const [searchText, setSearchtext] = useState("")
  const router = useRouter()

  
  
  return (

    
  <div className='min-h-screen bg-gray-700'>
    <img src={"assests/wavesOpacity.svg"} />
    <nav>
      <p className=''><a href='http://localhost:3000/' className='mx-10 pt-5 font-serif text-white text-xl'>Search.GG</a></p>
    </nav>
    <main>
      <div className='flex min-h-screen max-w-[80%] flex-col bg-gray-700 text-white justify-center mx-auto '>
          {/* <h2 className='text-center my-5 '>Welcome to our proxy server app</h2>
          <div className='flex flex-col bg-white rounded-full mx-[10%] absolute'>
            <label className='text-black' >Search</label>
            <input className='text-black mx-[10%]' type="text" onChange={e=> setSearchtext(e.target.value)}></input>
            <button className='text-black' onClick={()=>{router.push('/users/'+  searchText)}}>Submit</button>
          </div> */}
        
        <img src={'https://purepng.com/public/uploads/large/purepng.com-king-tryndamere-skin-splashart-lolsplashartchampionleague-of-legendsskintryndamere-3315199305772wh4j.png'} className="w-[50%] h-100 mx-auto"/>
        <div>   
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white bg-white">Search</label>
            <div className="relative max-w-[80%] mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={e=> setSearchtext(e.target.value)} type="text" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Summoner" required/>
                <button onClick={()=>{router.push('/users/'+  searchText)}} className="text-white absolute mr-2 right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </div>
      </div>
    </main>


    </div>
  )
}
