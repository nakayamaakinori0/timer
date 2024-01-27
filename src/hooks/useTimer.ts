import { useState, useEffect } from "react";

export default function useTimer() {
  const [time, setTime] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  // タイマーのカウントダウン
  // 1秒ごとにtargetTimeと現在時刻の差を計算して、timeを更新する。
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (timerOn) {
      const msec = Date.now() % 1000;
      const targetTime = Date.now() + msec + time * 1000;
      interval = setInterval(() => {
        const now = Date.now();
        const remainTime = Math.floor((targetTime - now) / 1000);
        if (remainTime <= 0) {
          clearInterval(interval);
          setTime(0);
          setTimerOn(false);
        } else {
          setTime(remainTime);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const startTimer = () => {
    if (time <= 0) return;
    setTimerOn(true);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    setTime(0);
    setTimerOn(false);
  };

  return { time, timerOn, startTimer, stopTimer, resetTimer };
}
