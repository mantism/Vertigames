import React, { useCallback, useEffect, useState } from "react";

export default function CurrentRoundToggle() {
  const [round, setRound] = useState(1);
  const handleKeyPress = useCallback((event) => {
    // Set round to the key pressed
    switch (event.keyCode) {
      case 49:
        setRound(1);
        break;
      case 50:
        setRound(2);
        break;
      case 51:
        setRound(3);
        break;
      case 52:
        setRound(4);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <h1>Round {round}</h1>
      <style jsx>
        {`
          h1 {
            text-align: center;
            font-size: 7em;
            color: white;
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </>
  );
}
