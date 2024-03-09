import Hour from "@/components/Hour";
import Minute from "@/components/Minute";
import Second from "@/components/Second";
import StartButton from "@/components/StartButton";
import StopButton from "@/components/StopButton";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";
import HourController from "@/components/HourController";
import MinuteController from "@/components/MinuteController";
import SecondController from "@/components/SecondController";
import SaveTime from "@/components/SaveTime";
import useTimer from "@/hooks/useTimer";
import useAudio from "@/hooks/useAudio";
import useNotification from "@/hooks/useNotification";
import React from "react";
import useGetViewportSize from "@/hooks/useGetViewportSize";

export default function Home() {
  const viewportSize = useGetViewportSize();
  console.log("viewportSize", viewportSize);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const timer = useTimer();
  const audio = useAudio("alarm-clock-short-6402.mp3");
  const { showNotification } = useNotification();
  const limSec = 59;
  const limMin = 59;
  const limHour = 23;

  // 表示用のhour, minute, second
  const [displayHour, setDisplayHour] = useState<string>("00");
  const [displayMinute, setDisplayMinute] = useState<string>("00");
  const [displaySecond, setDisplaySecond] = useState<string>("00");

  // 表示用のhour, minute, secondを更新する。
  // 10の位は0埋めする。
  useEffect(() => {
    setDisplayHour(hour.toString().padStart(2, "0"));
    setDisplayMinute(minute.toString().padStart(2, "0"));
    setDisplaySecond(second.toString().padStart(2, "0"));
  }, [hour, minute, second]);

  // タイマーが0になったときにアラームを鳴らす
  useEffect(() => {
    if (timer.isActive === true && timer.time === 0) {
      if (audio.loaded) {
        audio.play();
        showNotification({ title: "timer", body: "times up!" });
        window.addEventListener("click", stopHandler);
      }
    }
    return () => {
      window.removeEventListener("click", stopHandler);
    };
  }, [timer.isActive, timer.time, audio.loaded]);

  const confirmBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
    const confirmationMessage = "Are you sure you want to leave?";
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }, []);

  // count down中はページを離れるときに確認を出す
  useEffect(() => {
    if (timer.isActive) {
      window.addEventListener("beforeunload", confirmBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", confirmBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", confirmBeforeUnload);
    };
  }, [timer.isActive]);

  // 時間の入力を秒に変換
  useEffect(() => {
    const newTime = hour * 3600 + minute * 60 + second;
    if (newTime !== timer.time) {
      timer.setTime(newTime);
    }
  }, [hour, minute, second]);

  // timeの変更をhour, minute, secondに反映
  useEffect(() => {
    const newHour = Math.floor(timer.time / 3600);
    const newMinute = Math.floor((timer.time % 3600) / 60);
    const newSecond = Math.floor((timer.time % 3600) % 60);
    if (newHour !== hour) {
      setHour(newHour);
    }
    if (newMinute !== minute) {
      setMinute(newMinute);
    }
    if (newSecond !== second) {
      setSecond(newSecond);
    }
  }, [timer.time]);

  const hourChangeHandler = useCallback((e: { target: { value: any } }) => {
    if (Number(e.target.value) > limHour) {
      setHour(limHour);
    } else {
      setHour(Number(e.target.value));
    }
  }, []);

  const minuteChangeHandler = useCallback((e: { target: { value: any } }) => {
    if (Number(e.target.value) > limMin) {
      setMinute(limMin);
    } else {
      setMinute(Number(e.target.value));
    }
  }, []);

  const secondChangeHandler = useCallback((e: { target: { value: any } }) => {
    if (Number(e.target.value) > limSec) {
      setSecond(limSec);
    } else {
      setSecond(Number(e.target.value));
    }
  }, []);

  const stopHandler = () => {
    audio.stop();
    timer.stop();
  };

  const startHandler = useCallback(() => {
    if (timer.time === 0) {
      return null;
    } else {
      timer.start();
      audio.load();
    }
  }, [timer.time]);

  return (
    <div className={styles.container}>
      <div>
        <form className={styles.time}>
          <Hour
            displayHour={displayHour}
            hourChangeHandler={hourChangeHandler}
            isActive={timer.isActive}
          ></Hour>
          <span>:</span>
          <Minute
            displayMinute={displayMinute}
            minuteChangeHandler={minuteChangeHandler}
            isActive={timer.isActive}
          ></Minute>
          <span>:</span>
          <Second
            displaySecond={displaySecond}
            secondChangeHandler={secondChangeHandler}
            isActive={timer.isActive}
          ></Second>
          <span className={styles.containerActiveButton}>
            {timer.isActive ? (
              <StopButton stopHandler={stopHandler}></StopButton>
            ) : (
              <StartButton startHandler={startHandler}></StartButton>
            )}
          </span>
        </form>
        <div className={styles.controllerContainer}>
          <HourController
            isActive={timer.isActive}
            setHour={setHour}
            hour={hour}
          ></HourController>
          <MinuteController
            isActive={timer.isActive}
            setMinute={setMinute}
            minute={minute}
          ></MinuteController>
          <SecondController
            isActive={timer.isActive}
            setSecond={setSecond}
            second={second}
          ></SecondController>
        </div>
        <SaveTime
          hour={hour}
          minute={minute}
          second={second}
          setHour={setHour}
          setMinute={setMinute}
          setSecond={setSecond}
          isActive={timer.isActive}
        ></SaveTime>
      </div>
    </div>
  );
}
