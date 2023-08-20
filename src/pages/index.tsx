import styles from "@/styles/Home.module.css";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useEffect, useRef } from "react";

type FormData = {
  hour: number;
  minute: number;
  second: number;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const wasActive = useRef<boolean>(false);

  // 表示用のhour, minute, second
  const [displayHour, setDisplayHour] = useState<string>("00");
  const [displayMinute, setDisplayMinute] = useState<string>("00");
  const [displaySecond, setDisplaySecond] = useState<string>("00");

  useEffect(()=>{
    setDisplayHour(hour.toString().padStart(2, "0"));
    setDisplayMinute(minute.toString().padStart(2, "0"));
    setDisplaySecond(second.toString().padStart(2, "0"));
  }, [hour, minute, second])

  // wasActiveを更新
  useEffect(() => {
    setIsActive((prevIsActive) => {
      wasActive.current = prevIsActive;
      return isActive;
    });
  }, [time]);

  // タイマーが0になったときにアラームを鳴らす
  useEffect(() => {
    if (wasActive.current === true && isActive === false && time === 0) {
      // alert("Time's up!");
      console.log("Time's up!");
      const audio = new Audio("/alarm.mp3");
      audio.play();
    }
  }, [isActive, time, wasActive.current]);

  // タイマーのカウントダウン
  useEffect(() => {
    let interval: any = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // タイマーが0になったときにisActiveをfalseにする
  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
    }
  }, [time]);

  // 時間の入力を秒に変換
  useEffect(() => {
    setTime(hour * 3600 + minute * 60 + second);
  }, [hour, minute, second]);

  // hour, minute, secondの初期表示を"00"にする
  useEffect(() => {
  }, []);


  // timeの変更をhour, minute, secondに反映
  useEffect(() => {
    setHour(Math.floor(time / 3600));
    setMinute(Math.floor((time % 3600) / 60));
    setSecond(Math.floor((time % 3600) % 60));
  }, [time]);

  return (
    <div className={styles.container}>
      <div >
        <form className={styles.time} onSubmit={handleSubmit((data) => console.log(data))}>
          <input
            className={`${styles.input} ${styles.noSpin}`}
            type="number"
            value={displayHour}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHour(Number(e.target.value))
            }
          ></input>
          <span>:</span>
          <input
            className={`${styles.input} ${styles.noSpin}`}
            type="number"
            value={displayMinute}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinute(Number(e.target.value))
            }
          ></input>
          <span>:</span>
          <input
            className={`${styles.input} ${styles.noSpin}`}
            type="number"
            value={displaySecond}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSecond(Number(e.target.value))
            }
          ></input>
          <span className={styles.containerActiveButton}>
            {isActive ? (
              <button
                className={styles.inactiveButton}
                type="button"
                onClick={() => setIsActive(false)}
              >
                Stop
              </button>
            ) : (
              <button
                className={styles.activeButton}
                type="button"
                onClick={() => setIsActive(true)}
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
