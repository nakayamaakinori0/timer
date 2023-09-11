import styles from "@/styles/Home.module.css";
import { useRef, useEffect } from "react";
import { useInteractJS } from "@/hooks/useInteractJS";

interface SecondControlerProps {
  isActive: boolean;
  setSecond: React.Dispatch<React.SetStateAction<number>>;
  second: number;
}

export default function SecondControler({
  isActive,
  setSecond,
  second,
}: SecondControlerProps): React.JSX.Element {
  const initPosition = { x: 0, y: 0 };
  const minPosition = { x: 0, y: 0 };
  const maxPosition = { x: 0, y: 0 };
  const barRef = useRef<HTMLDivElement | null>(null);
  const squareRef = useRef<HTMLDivElement | null>(null);
  const interact = useInteractJS(initPosition, minPosition, maxPosition);

  const calcSecond = (x_position: number) => {
    const second = Math.round((x_position / interact.maxPosition.x) * 59);
    return second;
  };
  const calcPosition = (second: number) => {
    const x_position = Math.round((second / 59) * interact.maxPosition.x);
    return x_position;
  };

  useEffect(() => {
    if (barRef.current && squareRef.current) {
      interact.setMaxPosition({
        x: barRef.current.clientWidth - squareRef.current.clientWidth,
        y: 0,
      });
    }
  }, [barRef.current, squareRef.current]);

  useEffect(() => {
    if (isActive) {
      interact.disable();
    } else {
      interact.enable();
    }
  }, [isActive, interact.position]);

  useEffect(() => {
    const newSecond = calcSecond(interact.position.x) | 0;
    if (newSecond !== second) {
      setSecond(newSecond);
    }
  }, [interact.position.x]);

  useEffect(() => {
    const newPosition = { x: calcPosition(second), y: 0 };
    if (newPosition.x !== interact.position.x) {
      interact.setPosition(newPosition);
    }
  }, [second]);

  return (
    <>
      <div>S</div>
      <div>
        <div ref={barRef} className={styles.bar}>
          <div
            ref={(elem) => {
              interact.ref.current = elem;
              squareRef.current = elem;
            }}
            className={styles.square}
            style={{
              ...interact.style,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
