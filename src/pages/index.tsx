import styles from "@/styles/Home.module.css";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  hour: number;
  minute: number;
  second: number;
};

const schema = yup.object().shape({
  hour: yup
    .number()
    .integer()
    .min(0)
    .max(1, "多いよ！")
    .required("hour is required"),
  minute: yup.number().integer().min(0).max(59),
  second: yup.number().integer().min(0).max(59),
});

export default function Home() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const { isDirty, isSubmitting, touchedFields, submitCount } = formState;

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const wasActive = useRef<boolean>(false);
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
      audio.current = new Audio("/mixkit-tick-tock-clock-timer-1045.wav");
      audio.current.play();
    }
  }, [isActive, time, wasActive.current]);

  useEffect(() => {
    const stopAudio = () => {
      audio.current?.pause();
      if (audio.current) {
        audio.current.currentTime = 0;
      }
    };
    window.addEventListener("click", stopAudio);
    return () => {
      window.removeEventListener("click", stopAudio);
    };
  }, []);

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

  // timeの変更をhour, minute, secondに反映
  useEffect(() => {
    setHour(Math.floor(time / 3600));
    setMinute(Math.floor((time % 3600) / 60));
    setSecond(Math.floor((time % 3600) % 60));
  }, [time]);

  return (
    <div className={styles.container}>
      <div>
        <form
          className={styles.time}
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <input
            // ref={register}
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
