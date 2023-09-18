import Hour from "@/components/Hour";
import Minute from "@/components/Minute";
import Second from "@/components/Second";
import StartButton from "@/components/StartButton";
import StopButton from "@/components/StopButton";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import HourController from "@/components/HourController";
import MinuteController from "@/components/MinuteController";
import SecondController from "@/components/SecondController";

export default function Home() {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const audio = useRef<HTMLAudioElement | null>(null);
  const [targetTime, setTargetTime] = useState<number>(0);

  // 表示用のhour, minute, second
  const [displayHour, setDisplayHour] = useState<string>("00");
  const [displayMinute, setDisplayMinute] = useState<string>("00");
  const [displaySecond, setDisplaySecond] = useState<string>("00");

  // 保存用のHour, Minute, Second
  const [saveArr, setSaveArr] = useState<object[]>([
    { hour: hour, minute: minute, second: second },
  ]);
  const [displaySaveArr, setDisplaySaveArr] = useState<object[]>([
    { hour: "00", minute: "00", second: "00" },
  ]);

  // 表示用のhour, minute, secondを更新する。
  // 10の位は0埋めする。
  useEffect(() => {
    setDisplayHour(hour.toString().padStart(2, "0"));
    setDisplayMinute(minute.toString().padStart(2, "0"));
    setDisplaySecond(second.toString().padStart(2, "0"));
  }, [hour, minute, second]);

  // タイマーを止める
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

  // Startした時、targetTimeを設定する。
  useEffect(() => {
    if (isActive) {
      setTargetTime(Date.now() + time * 1000);
    }
  }, [isActive]);

  // タイマーのカウントダウン
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        const now = Date.now();
        const remainTime = Math.floor((targetTime - now) / 1000);
        if (remainTime <= 0) {
          clearInterval(interval);
          setTime(0);
        } else {
          setTime(remainTime);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, targetTime]);

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

  const saveHandler = useCallback(() => {
    // もし、saveArrの最後の要素が現在の時間と同じだったら、保存しない。
    if (
      saveArr[saveArr.length - 1].hour === hour &&
      saveArr[saveArr.length - 1].minute === minute &&
      saveArr[saveArr.length - 1].second === second
    ) {
      return null;
    }
    setSaveArr([...saveArr, { hour: hour, minute: minute, second: second }]);
  }, [hour, minute, second, saveArr]);

  useEffect(() => {
    setDisplaySaveArr(
      saveArr.map((obj) => {
        console.log(obj);
        return {
          hour: obj?.hour?.toString().padStart(2, "0"),
          minute: obj?.minute?.toString().padStart(2, "0"),
          second: obj?.second?.toString().padStart(2, "0"),
        };
      })
    );
  }, [saveArr]);

  const loadHandler = useCallback(
    (key: string | number) => {
      console.log("key", key);
      setHour(saveArr[key].hour);
      setMinute(saveArr[key].minute);
      setSecond(saveArr[key].second);
    },
    [saveArr]
  );

  const deleteHandler = useCallback(() => {
    if (saveArr.length === 1) {
      return null;
    }
    setSaveArr(saveArr.slice(0, saveArr.length - 1));
  }, [saveArr]);

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
        <div className={styles.controllerContainer}>
          <HourController
            isActive={isActive}
            setHour={setHour}
            hour={hour}
          ></HourController>
          <MinuteController
            isActive={isActive}
            setMinute={setMinute}
            minute={minute}
          ></MinuteController>
          <SecondController
            isActive={isActive}
            setSecond={setSecond}
            second={second}
          ></SecondController>
        </div>
        <button onClick={saveHandler}>save</button>
        <button onClick={deleteHandler}>del</button>
        <div className={styles.saveTimes}>
          {displaySaveArr.map((obj, key) => {
            return (
              <button
                key={key}
                className={styles.saveTime}
                onClick={() => {
                  loadHandler(key);
                }}
              >{`${obj.hour}:${obj.minute}:${obj.second}`}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
