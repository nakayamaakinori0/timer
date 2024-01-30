import React, { useEffect } from "react";
import useTimer from "../hooks/useTimer";
import useAudio from "../hooks/useAudio";

export default function TestCustomHooks() {
  const timer = useTimer();

  useEffect(() => {
    timer.setTime(1000);
  }, []);

  useEffect(() => {
    timer.start();
  }, [timer.time]);

  console.log("time", timer.time);
  console.log("timerOn", timer.isActive);

  const { load, play, stop, loaded } = useAudio("alarm-clock-short-6402.mp3");

  return (
    <>
      <h1>TestCustomHooks</h1>
      <h2>useTimer</h2>
      <button onClick={timer.start}>on</button>
      <button onClick={timer.stop}>off</button>
      <button onClick={timer.reset}>reset</button>
      <div>{timer.time}</div>
      <h2>useAudio</h2>
      <button onClick={load}>load</button>
      <button onClick={play}>play</button>
      <button onClick={stop}>stop</button>
      <div>{`loaded:${loaded}`}</div>
    </>
  );
}
