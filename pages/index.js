import Image from 'next/image'
import Header from '@/components/header'
import { Inter } from 'next/font/google';
import { setCookie, hasCookie, getCookie } from 'cookies-next';
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [card, setCard] = useState({})
  const [cardImage, setCardImage] = useState('https://www.deckofcardsapi.com/static/img/back.png')
  const [cardColor, setCardColor] = useState()
  const [rightGuesses, setRightGuesses] = useState(0)
  const [remaining, setRemaining] = useState(0)

  
  useEffect(()=>{
    createDeck()
  },[])

  const createDeck = async () =>{
    let repo;
    console.log(hasCookie("deck"));
    if(!hasCookie("deck")){
      const res = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      repo = await res.json();
      console.log(repo.deck_id);
    }
    console.log(repo);
  } 

  const deal = async (color) => {

    
    const deckId = getCookie('deck')
    console.log(color, deckId);

    try {
      const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((response)=>{
        return response.json()
      }).then((obj)=>{
        console.log(obj);

        setCard(obj)
        setCardImage(obj.cards[0].image)
        setCardColor(obj.cards[0].suit)
        setRemaining(obj.remaining)

        if(color === "red"){
          if(obj.cards[0].suit === "HEARTS" || obj.cards[0].suit === "DIAMONDS"){
            setRightGuesses(rightGuesses+1)
          }
        }
        if(color === "black"){
          if(obj.cards[0].suit === "SPADES" || obj.cards[0].suit === "CLUBS"){
            setRightGuesses(rightGuesses+1)
          }
        }
      })
    } catch (error) {
      console.log("error", error)
    }



    

    
  }
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-8 pt-16 m:p-24 bg-inherit dark:bg-black ${inter.className}`}
    >
      <Header />



      <div className='max-w-5xl w-full flex flex-col items-center justify-center'>
        <div className='p-8 flex flex-col justify-center items-center'>
          <h1 className='text-xl md:text-3xl dark:text-white font-bold'>TumTum anaa s3 KorKor</h1>
          <h1 className='text-xl dark:text-white md:text-3xl'>(Guess Black or Red)</h1>
        </div>

        <div className="flex w-full justify-between items-center border-b mb-4 border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:text-white dark:border-neutral-500 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200">
          <div>shuffle</div>
          <div>remaining:{remaining}</div>
          <div>new game</div>
        </div>
        

        <div className="w-full max-w-md grid grid-cols-2 md:grid-cols-2 gap-10">
          <div className='flex items-center justify-center'>
            <img src={cardImage} height={200} width={100} alt="Cards" className='' />
          </div>
          <div className='flex flex-col items-center justify-center relative'>
            <img src="https://www.deckofcardsapi.com/static/img/back.png" height={200} width={150} alt="Cards" className='' />
            <img src="https://www.deckofcardsapi.com/static/img/back.png" height={200} width={150} alt="Cards" className='absolute' />
          </div>
        </div>
        <p>remaining: {remaining}</p>

        <div className='flex flex-row justify-center items-center mt-12 space-x-4 dark:text-white'>
              <button className='bg-red-400 text-white px-10 py-2 rounded-xl' onClick={()=>deal('red')}>Red</button>
              <p>OR</p>
              <button className='bg-slate-700 text-white px-10 py-2 rounded-xl' onClick={()=>deal('black')}>Black</button>
        </div>
        <div >
          <p className='text-black text-xl p-4 dark:text-white'>{rightGuesses}/52</p>
        </div>

        <div className='border-2 border-black dark:border-neutral-500 dark:bg-zinc-800/30 dark:text-white w-full p-4 flex justify-center items-center rounded-lg'>
          Ads
        </div>

      </div>

      
    </main>
  )
}
