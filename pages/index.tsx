import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { fetchPostJson } from "../utils/apiUtils";
import ChallengeEditor from "../components/ChallengeEditor";
import TrickAutoComplete from "../components/TrickAutoComplete";
import { Trick, TricksClient } from "@trickingapi/tricking-ts";
import { TrickNode } from "../lexical/nodes/TrickNode";
import CountdownWidget from "../components/CountdownWidget";
import CurrentRoundToggle from "../components/CurrentRoundToggle";

export default function Home() {
  const [currentRound, setCurrentRound] = useState(0);
  const [round, setRound] = useState([]);
  const [challenge, setChallenge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [points, setPoints] = useState("");
  const [tricks, setTricks] = useState<string[]>([]);
  const [currentTrick, setCurrentTrick] = useState("Butterfly Twist");

  const handleKeyPress = useCallback(
    async (event) => {
      if (event.keyCode === 39) {
        if (currentRound < 3) {
          const data = await fetchPostJson("/api/games", {
            round: currentRound + 1,
          });
          setRound(data.challenges);
          setPoints(data.points);
          setCurrentRound(currentRound + 1);
          setChallenge("");
        }
      } else if (event.keyCode === 32) {
        if (round.length === 0) {
          setChallenge("ROUND FINISHED");
          return;
        }
        setIsLoading(true);
        let num = Math.floor(Math.random() * round.length);
        setTimeout(() => {
          setChallenge(round[num]);
          round.splice(num, 1);
          setIsLoading(false);
        }, 3000);
      }
    },
    [currentRound, round]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const tricksClient = new TricksClient();
    tricksClient.getAllTricks().then((tricks) => {
      const trickNames: string[] = [];
      Object.entries(tricks).forEach(([key, value]) => {
        trickNames.push(value.name);
      });
      setTricks(trickNames);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Vertigames App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>VERTIGO V</h1>
      <div className={styles.main}>
        <CountdownWidget />
      </div>
      <style jsx>{`
        body {
          margin: 0;
          background: 0;
          width: 100vw;
          height: 100vh;
          text-align: center;
          background-color: black;
        }

        h1 {
          font-family: "Times New Roman", Times, serif;
          text-align: center;
          font-size: 20em;
          color: white;
          padding-top: 1em;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
