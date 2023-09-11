import Hour from "@/components/Hour";
import Minute from "@/components/Minute";
import Second from "@/components/Second";
import StartButton from "@/components/StartButton";
import StopButton from "@/components/StopButton";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import HourControler from "@/components/HourControler";
import MinuteControler from "@/components/MinuteControler";
import SecondControler from "@/components/SecondControler";

export default function Home() {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const audio = useRef<HTMLAudioElement | null>(null);

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

  // タイマーを止め,timeを初期化する。
  const stopAudio = useCallback(() => {
    console.log("stopAudio");
    audio.current?.pause();
    if (audio.current) {
      audio.current.currentTime = 0;
    }
    setIsActive(false);
  }, [audio, audio?.current]);

  // タイマーが0になったときにアラームを鳴らす
  useEffect(() => {
    if (isActive === true && time === 0) {
      // alert("Time's up!");
      console.log("Time's up!");
      audio.current = new Audio("/mixkit-tick-tock-clock-timer-1045.wav");
      audio.current.play();
      window.addEventListener("click", stopAudio);
    }
    return () => {
      window.removeEventListener("click", stopAudio);
    };
  }, [isActive, time]);

  // タイマーのカウントダウン
  // TODO: timeが依存配列にはいってるせいで,timeが変わるたびにsetIntervalが再設定されてしまう。
  useEffect(() => {
    let interval: any = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // 時間の入力を秒に変換
  useEffect(() => {
    const newTime = hour * 3600 + minute * 60 + second;
    if (newTime !== time) {
      setTime(newTime);
    }
  }, [hour, minute, second]);

  // timeの変更をhour, minute, secondに反映
  useEffect(() => {
    const newHour = Math.floor(time / 3600);
    const newMinute = Math.floor((time % 3600) / 60);
    const newSecond = Math.floor((time % 3600) % 60);
    if (newHour !== hour) {
      setHour(newHour);
    }
    if (newMinute !== minute) {
      setMinute(newMinute);
    }
    if (newSecond !== second) {
      setSecond(newSecond);
    }
  }, [time]);

  const hourChangeHandler = useCallback((e: { target: { value: any } }) => {
    if (Number(e.target.value) > 23) {
      setHour(23);
    } else {
      setHour(Number(e.target.value));
    }
  }, []);

  const minuteChangeHandler = useCallback((e: { target: { value: any } }) => {
    if (Number(e.target.value) > 59) {
      setMinute(59);
    } else {
      setMinute(Number(e.target.value));
    }
  }, []);

  const secondChangeHandler = useCallback((e: { target: { value: any } }) => {
    if (Number(e.target.value) > 59) {
      setSecond(59);
    } else {
      setSecond(Number(e.target.value));
    }
  }, []);

  const stopHandler = useCallback(() => {
    stopAudio();
  }, [audio, audio?.current, stopAudio]);

  const startHandler = useCallback(() => {
    if (time === 0) {
      return null;
    } else {
      setIsActive(true);
    }
  }, [time]);

  return (
    <div className={styles.container}>
      <div>
        <form className={styles.time}>
          <Hour
            displayHour={displayHour}
            hourChangeHandler={hourChangeHandler}
            isActive={isActive}
          ></Hour>
          <span>:</span>
          <Minute
            displayMinute={displayMinute}
            minuteChangeHandler={minuteChangeHandler}
            isActive={isActive}
          ></Minute>
          <span>:</span>
          <Second
            displaySecond={displaySecond}
            secondChangeHandler={secondChangeHandler}
            isActive={isActive}
          ></Second>
          <span className={styles.containerActiveButton}>
            {isActive ? (
              <StopButton stopHandler={stopHandler}></StopButton>
            ) : (
              <StartButton startHandler={startHandler}></StartButton>
            )}
          </span>
        </form>
        <div className={styles.controlerContainer}>
          <HourControler
            isActive={isActive}
            setHour={setHour}
            hour={hour}
          ></HourControler>
          <MinuteControler
            isActive={isActive}
            setMinute={setMinute}
            minute={minute}
          ></MinuteControler>
          <SecondControler
            isActive={isActive}
            setSecond={setSecond}
            second={second}
          ></SecondControler>
        </div>
      </div>
    </div>
  );
}
