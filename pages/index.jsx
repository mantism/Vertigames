import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import styles from '../styles/Home.module.css'
import { fetchPostJson } from '../utils/apiUtils'
import React from 'react';
import ChallengeEditor from '../components/ChallengeEditor'

export default function Home() {
  const [currentRound, setCurrentRound] = useState(0);
  const [round, setRound] = useState([]);
  const [challenge, setChallenge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [points, setPoints] = useState('');

  const handleKeyPress = useCallback(async (event) => {
    if (event.keyCode === 39) {
      if (currentRound < 3) {
        const data = await fetchPostJson('/api/games', {round: currentRound + 1});
        setRound(data.challenges);
        setPoints(data.points);
        setCurrentRound(currentRound + 1);
        setChallenge('');
      }
    } else if (event.keyCode === 32) {
      if (round.length === 0) {
        setChallenge('ROUND FINISHED');
        return;
      }
      setIsLoading(true);
      let num = Math.floor(Math.random() * round.length);
      setTimeout(() => {
        setChallenge(round[num]);
        round.splice(num, 1);
        setIsLoading(false);
      }, 3000)
      
    }
  }, [currentRound, round]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
        window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Vertigames App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}>
          2023 Vertigames
        </h1>
        {false && <h2>
          {currentRound === 0 ? 
            <div className='logos'>
              <Image src='/V-Logo.png' alt='v-logo' width='320' height='320'/>
            </div>
            :
            <div className='caption'>
               Round {currentRound} - {points} {currentRound < 3 ? 'POINTS NEEDED TO MOVE ON' : 'POINTS WINS'}
            </div>
          }
        </h2>}
        {false && <h2>
          {!isLoading && challenge}
        </h2>}
        {isLoading && 
          <Image src='/intro.gif' alt='intro gif' width='320' height='180'/>
        }
        <ChallengeEditor />
      </div>
      
      <style jsx>{`
        main {
          text-align: center;
        }

        .red {
          color: red;
        }

        h1 {
          font-size: 5em;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  )
}
