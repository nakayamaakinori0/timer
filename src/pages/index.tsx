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

  useEffect(() => {
    setIsActive((prevIsActive) => {
      wasActive.current = prevIsActive;
      return isActive;
    });
  }, [time]);

  useEffect(() => {
    if (wasActive.current === true && isActive === false && time === 0) {
      // alert("Time's up!");
      const audio = new Audio("/alarm.mp3");
      audio.play();
    }
  }, [isActive, time, wasActive.current]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
    }
  }, [time]);

  useEffect(() => {
    setTime(hour * 3600 + minute * 60 + second);
  }, [hour, minute, second]);

  useEffect(() => {
    setHour(Math.floor(time / 3600));
    setMinute(Math.floor((time % 3600) / 60));
    setSecond(Math.floor((time % 3600) % 60));
  }, [time]);

  return (
    <>
      <form
        className={styles.time}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <input
          type="number"
          value={hour}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setHour(Number(e.target.value))
          }
        ></input>
        <span>:</span>
        <input
          type="number"
          value={minute}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMinute(Number(e.target.value))
          }
        ></input>
        <span>:</span>
        <input
          type="number"
          value={second}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSecond(Number(e.target.value))
          }
        ></input>
        {isActive ? (
          <button type="button" onClick={() => setIsActive(false)}>
            Stop
          </button>
        ) : (
          <button type="button" onClick={() => setIsActive(true)}>
            Start
          </button>
        )}
      </form>
    </>
  );
}
