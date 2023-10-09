import styles from "@/styles/Home.module.css";
import { useRef, useEffect, useState } from "react";
import { useInteractHorizontalJS } from "@/hooks/useInteractHorizontalJS";

interface SecondControllerProps {
  isActive: boolean;
  setSecond: React.Dispatch<React.SetStateAction<number>>;
  second: number;
}

export default function SecondController({
  isActive,
  setSecond,
  second,
}: SecondControllerProps): React.JSX.Element {
  const initPosition = { x: 0, y: 0 };
  const minPosition = { x: 0, y: 0 };
  const maxPosition = { x: 0, y: 0 };
  const barRef = useRef<HTMLDivElement | null>(null);
  const squareRef = useRef<HTMLDivElement | null>(null);
  const interact = useInteractHorizontalJS(
    initPosition,
    minPosition,
    maxPosition
  );
  const [isSquareActive, setIsSquareActive] = useState(false);

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
  }, []);

  // square操作中はスクロールさせない。
  useEffect(() => {
    if (isSquareActive) {
      document.body.style.overflow = "hidden";
      document.body.style.backgroundColor = "red";
    } else {
      document.body.style.overflow = "scroll";
      document.body.style.backgroundColor = "white";
    }
    return () => {
      document.body.style.overflow = "scroll";
      document.body.style.backgroundColor = "white";
    };
  }, [isSquareActive]);

  useEffect(() => {
    if (isActive) {
      interact.disable();
    } else {
      interact.enable();
    }
  }, [isActive, interact.position]);

  useEffect(() => {
    const newSecond = calcSecond(interact.position.x) || 0;
    if (newSecond !== second) {
      setSecond(newSecond);
    }
  }, [interact.position.x]);

  useEffect(() => {
    const newPosition = { x: calcPosition(second), y: interact.position.y };
    if (newPosition.x !== interact.position.x) {
      interact.setPosition(newPosition);
    }
  }, [second]);

  return (
    <>
      <div className={styles.controller}>
        <div className={styles.caption}>
          <div>sec</div>
        </div>
        <div>
          <div ref={barRef} className={styles.bar}>
            <div
              ref={(elem) => {
                interact.ref.current = elem;
                squareRef.current = elem;
              }}
              onTouchStart={() => {
                setIsSquareActive(true);
              }}
              onTouchEnd={() => {
                setIsSquareActive(false);
              }}
              className={styles.square}
              style={{
                ...interact.style,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
