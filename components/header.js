import Image from 'next/image'
import { Inter } from 'next/font/google'
import {MoonIcon, SunIcon} from '@heroicons/react/24/outline'


const inter = Inter({ subsets: ['latin'] })

export default function header() {
  function toggleMode(){
    var htmlElement = document.querySelector("html");
    var moon = document.getElementById("moon");
    var sun = document.getElementById("sun");
    htmlElement.classList.toggle("dark")
    moon.classList.toggle("hidden")
    sun.classList.toggle("hidden")
  }
  return (
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed space-x-2 left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:text-white dark:border-neutral-500 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <p>
          Enjoy these Games&nbsp;
          <code className="font-mono font-bold">with love</code>
        </p>
        <div className='flex flex-row px-[4px] py-[2px] rounded-full space-x-1 relative w-6'>
          <MoonIcon className='w-4 h-4 rounded-full absolute ' id="moon" onClick={()=>{toggleMode()}}/>
          <SunIcon className='w-4 h-4 rounded-full absolute hidden' id="sun" onClick={()=>{toggleMode()}}/>
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
