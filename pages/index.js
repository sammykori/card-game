import Image from 'next/image'
import Header from '@/components/header'
import { Inter } from 'next/font/google';
import { setCookie, hasCookie, getCookie } from 'cookies-next';
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { data } from 'autoprefixer';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [card, setCard] = useState({})
  const [cardImage, setCardImage] = useState('https://www.deckofcardsapi.com/static/img/back.png')
  const [cardColor, setCardColor] = useState()
  const [rightGuesses, setRightGuesses] = useState(0)
  const [remaining, setRemaining] = useState(52)
  const [error, setError] = useState()
  const [score, setScore] = useState(0);

  const {data: session } = useSession()

  
  useEffect(()=>{
    createDeck()
    fetchData()
  },[])

  useEffect(() => {
    if(window.localStorage.getItem("remaining")){
      console.log(JSON.parse(window.localStorage.getItem("remaining")));
      setRemaining(JSON.parse(window.localStorage.getItem("remaining")));
      setRightGuesses(JSON.parse(window.localStorage.getItem("guess")));
      setCardImage(window.localStorage.getItem("cardImage"));
    }
    
  }, []);
  

  async function fetchData(){
  
    if(session){
      console.log("header");
      const res = await fetch('/api/getUser', {
        method : 'POST',
        body : JSON.stringify({
            email: session.user.email,
        }),
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    const data = await res.json();
    console.log(data);
    setScore(data)
    }
  }
  const createDeck = async () =>{
    let repo;
    console.log(hasCookie("deck"));
    if(!hasCookie("deck")){
      const res = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      repo = await res.json();
      console.log(repo);
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
      }).then( async (obj)=>{
        if(!obj.success && obj.remaining === 0){
          if(session){
            console.log("update score");
            const res = await fetch("/api/updatescore", {
              method: "POST",
              body: JSON.stringify({
                score: rightGuesses,
                email: session.user.email
              }),
              headers : {
                'Content-Type' : 'application/json'
            }
            })
            console.log(res);
          }
          
          const modal = document.getElementById("modal")
          modal.classList.toggle("hidden")
          modal.classList.toggle("flex")
          setError(obj.error)
        }
        console.log(obj);

        setCard(obj)
        setCardImage(obj.cards[0].image)
        setCardColor(obj.cards[0].suit)
        setRemaining(obj.remaining)
        window.localStorage.setItem("remaining", obj.remaining);
        window.localStorage.setItem("cardImage", obj.cards[0].image);


        if(color === "red"){
          if(obj.cards[0].suit === "HEARTS" || obj.cards[0].suit === "DIAMONDS"){
            setRightGuesses(rightGuesses+1)
            window.localStorage.setItem("guess", rightGuesses+1);
          }
        }
        if(color === "black"){
          if(obj.cards[0].suit === "SPADES" || obj.cards[0].suit === "CLUBS"){
            setRightGuesses(rightGuesses+1)
            window.localStorage.setItem("guess", rightGuesses+1);
          }
        }
      })
    } catch (error) {
      console.log("error", error)
    }



    

    
  }
  const shuffle = async (color) => {

    
    const deckId = getCookie('deck')

    try {
      const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`)
      .then((response)=>{
        return response.json()
      }).then((obj)=>{
        if(obj.shuffled){
          alert("shuffled")
        }
      })
    } catch (error) {
      console.log("error", error)
    }



    

    
  }
  const restart = async () => {

    const modal = document.getElementById("modal")
    modal.classList.toggle("hidden")
    modal.classList.toggle("flex")
    const deckId = getCookie('deck')

    try {
      const res = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/`)
      .then((response)=>{
        return response.json()
      }).then((obj)=>{
        if(obj.success){
          setCookie("deck", obj.deck_id)
          setRemaining(52)
          setRightGuesses(0)
          setCardImage('https://www.deckofcardsapi.com/static/img/back.png')
          window.localStorage.setItem("remaining", 52);
          window.localStorage.setItem("guess", 0);
          window.localStorage.setItem("cardImage", 'https://www.deckofcardsapi.com/static/img/back.png');
        }
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  const mod = () => {
    const modal = document.getElementById("modal")
    modal.classList.toggle("hidden")
    modal.classList.toggle("flex")
  }
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-8 pt-4 m:p-24 bg-inherit dark:bg-black ${inter.className}`}
    >
      <Header score={score} />



      <div className='max-w-5xl w-full flex flex-col items-center justify-center'>
        <div className='p-8 flex flex-col justify-center items-center'>
          {/* <h1 className='text-xl md:text-3xl dark:text-white font-bold'>TumTum anaa s3 KorKor</h1> */}
          <h1 className='text-xl dark:text-white md:text-3xl'><span className='text-black font-black'>Black</span> or <span className='text-red-600 font-black'>Red</span></h1>
        </div>

        <div className="flex w-full justify-between items-center border-b mb-4 border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:text-white dark:border-neutral-500 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200">
          <button className='bg-black text-white text-sm w-16 p-1 px-2 rounded-xl' onClick={()=>shuffle()}>Shuffle</button>
          <div>pile : {remaining}</div>
          <button className='bg-green-900 text-white text-sm w-16 p-1 px-2 rounded-xl' onClick={()=>restart()}>Restart</button>
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
      <div id="modal" className='absolute inset-0 bg-white bg-opacity-90 flex-col justify-center items-center z-20 hidden'>
        <p>{error}</p>
        <button className='bg-green-800 text-white text-sm  p-4 px-10 rounded-xl' onClick={()=>restart()}>New Game</button>
      </div>

      
    </main>
  )
}
