import React, { useEffect } from "react";
import useTimer from "../hooks/useTimer";
import useAudio from "../hooks/useAudio";

export default function TestCustomHooks() {
  const { time, setTime, timerOn, startTimer, stopTimer, resetTimer } =
    useTimer();

  useEffect(() => {
    setTime(1000);
  }, []);

  useEffect(() => {
    startTimer();
  }, [time]);

  console.log("time", time);
  console.log("timerOn", timerOn);

  const useaudio = useAudio("alarm-clock-short-6402.mp3");

  return (
    <>
      <button onClick={startTimer}>on</button>
      <button onClick={stopTimer}>off</button>
      <button onClick={resetTimer}>reset</button>
      <div>{time}</div>
    </>
  );
}
