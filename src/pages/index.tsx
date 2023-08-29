import styles from "@/styles/Home.module.css";
import { ChangeEvent, useState, useEffect, useRef, useCallback } from "react";

type FormData = {
  hour: number;
  minute: number;
  second: number;
};

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

  const stopAudio = useCallback(() => {
    audio.current?.pause();
    if (audio.current) {
      audio.current.currentTime = 0;
    }
    setIsActive(false);
  }, []);

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

  return (
    <div className={styles.container}>
      <div>
        <form className={styles.time}>
          <input
            className={`${styles.input} ${styles.noSpin}`}
            type="number"
            value={displayHour}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (Number(e.target.value) > 23) {
                setHour(23);
              } else {
                setHour(Number(e.target.value));
              }
            }}
          ></input>
          <span>:</span>
          <input
            className={`${styles.input} ${styles.noSpin}`}
            type="number"
            value={displayMinute}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (Number(e.target.value) > 59) {
                setMinute(59);
              } else {
                setMinute(Number(e.target.value));
              }
            }}
          ></input>
          <span>:</span>
          <input
            className={`${styles.input} ${styles.noSpin}`}
            type="number"
            value={displaySecond}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (Number(e.target.value) > 59) {
                setSecond(59);
              } else {
                setSecond(Number(e.target.value));
              }
            }}
          ></input>
          <span className={styles.containerActiveButton}>
            {isActive ? (
              <button
                className={styles.inactiveButton}
                type="button"
                onClick={() => {
                  setIsActive(false);
                  if (audio.current) {
                    audio.current.pause();
                    audio.current.currentTime = 0;
                  }
                }}
              >
                Stop
              </button>
            ) : (
              <button
                className={styles.activeButton}
                type="button"
                onClick={() => {
                  if (time === 0) {
                    return null;
                  } else {
                    setIsActive(true);
                  }
                }}
              >
                Start
              </button>
            )}
          </span>
        </form>
      </div>
    </div>
  );
}
