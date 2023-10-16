import Image from 'next/image'
import { Inter } from 'next/font/google'
import {MoonIcon, SunIcon} from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function header({score}) {
  const {data: session } = useSession()
  
 
     

  function toggleMode(){
    var htmlElement = document.querySelector("html");
    var moon = document.getElementById("moon");
    var sun = document.getElementById("sun");
    htmlElement.classList.toggle("dark")
    moon.classList.toggle("hidden")
    sun.classList.toggle("hidden")
  }

  function toggleDropdown(){
    var dropElement = document.getElementById("dropdown");
    dropElement.classList.toggle("hidden")
    dropElement.classList.toggle("flex")
  }
  return (
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10">
        <div className='fixed lg:static flex flex-row justify-center items-center space-x-4'>
          <div className=" space-x-2 left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 to-white p-2 backdrop-blur-2xl dark:text-white dark:border-neutral-500 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <p className='text-xs'>
              Enjoy these Games&nbsp;
              <code className="font-mono font-bold">with love</code>
            </p>
            <div className='flex flex-row px-[4px] py-[2px] rounded-full space-x-1 relative w-6'>
              <MoonIcon className='w-4 h-4 rounded-full absolute ' id="moon" onClick={()=>{toggleMode()}}/>
              <SunIcon className='w-4 h-4 rounded-full absolute hidden' id="sun" onClick={()=>{toggleMode()}}/>
            </div>
        
          </div>
          <div className=''>
            {session? <img src={session.user.image} width={40} height={50} className="rounded-full" onClick={()=>toggleDropdown()} /> : <button className=' dark:border-gray-300 dark:bg-gradient-to-b dark:from-zinc-200 dark:to-white  p-1 text-white dark:text-black border-neutral-500 bg-zinc-800/30 from-inherit rounded-lg' onClick={()=> signIn()}>Login</button>}
            <div className='bg-slate-100 w-32 rounded-xl p-4 shadow-md hidden justify-start items-start absolute mt-2' id="dropdown">
              <ul className='flex flex-col justify-start items-start'>
                <li>PHS: {score}</li>
                <li onClick={()=>signOut()} className="underline font-bold cursor-pointer">logout</li>
              </ul>
            </div>
          </div>

        </div>
        
        
        <div className="fixed bottom-0 left-0 flex h-20 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black dark:text-white lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Samuel
          </a>
        </div>
      </div>
  )
}
