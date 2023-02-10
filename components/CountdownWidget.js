import React, { useCallback, useEffect } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';;

let countdownApi = null;

const CountdownWidget = () => {
  const handleKeyPress = useCallback((event) => {
    const handleReset = () => {
      setDate(Date.now() + 20000);
      handlePauseClick();
    }

    const handlePauseClick = () => {
      countdownApi && countdownApi.pause();
    };

    const handlePlayClick = () => {
      countdownApi && countdownApi.start();
    };

    if (event.keyCode === 39) {
      handleReset();
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
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
        window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Countdown 
      date={date} 
      handleUpdate={handleUpdate}
      ref={setRef}
      autoStart={false}
      renderer={({ formatted: { hours, minutes, seconds }, completed }) => {
        if (countdownApi && countdownApi.isCompleted()) {
          return <h1 className='red'>X</h1>
        }
        return <h1>{seconds}</h1>
      }}
    />
  );
}