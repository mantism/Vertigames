import React, { useCallback, useEffect, useState } from "react";
import Countdown, { CountdownApi } from "react-countdown";

let countdownApi = null;

export default function CountdownWidget() {
  const [date, setDate] = useState(Date.now() + 20000);

  const handleKeyPress = useCallback((event) => {
    const handleReset = () => {
      setDate(Date.now() + 20000);
      handlePauseClick();
    };

    const handlePauseClick = () => {
      countdownApi && countdownApi.pause();
    };

    const handlePlayClick = () => {
      countdownApi && countdownApi.start();
    };
    // Right Arrow Key
    if (event.keyCode === 39) {
      handleReset();
      // Spacebar
    } else if (event.keyCode === 32) {
      handlePauseClick();
    } else {
      handlePlayClick();
    }
  }, []);

  const handleUpdate = () => {
    this.forceUpdate();
  };

  const setRef = (countdown) => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Countdown
        date={date}
        //@ts-ignore
        handleUpdate={handleUpdate}
        ref={setRef}
        autoStart={false}
        renderer={({ formatted: { hours, minutes, seconds }, completed }) => {
          if (countdownApi && countdownApi.isCompleted()) {
            return <h1>X</h1>;
          }
          return <h1>{seconds}</h1>;
        }}
      />
      <style jsx>
        {`
          h1 {
            font-size: 40em;
            padding: 0;
            margin: 0;
            color: white;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
