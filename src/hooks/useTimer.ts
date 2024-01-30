import { useState, useEffect } from "react";

export default function useTimer() {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  // タイマーのカウントダウン
  // 1秒ごとにtargetTimeと現在時刻の差を計算して、timeを更新する。
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (isActive) {
      const msec = Date.now() % 1000;
      const targetTime = Date.now() + msec + time * 1000;
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
  }, [isActive]);

  const start = () => {
    if (time <= 0) return;
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
  };

  const reset = () => {
    setTime(0);
    setIsActive(false);
  };

  return { time, setTime, isActive, start, stop, reset };
}
