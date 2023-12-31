import styles from "@/styles/Home.module.css";
import { useRef, useEffect } from "react";
import { useInteractHorizontalJS } from "@/hooks/useInteractHorizontalJS";

interface MinuteControllerProps {
  isActive: boolean;
  setMinute: React.Dispatch<React.SetStateAction<number>>;
  minute: number;
}

export default function MinuteController({
  isActive,
  setMinute,
  minute,
}: MinuteControllerProps): React.JSX.Element {
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

  const calcMinute = (x_position: number) => {
    const minute = Math.round((x_position / interact.maxPosition.x) * 59);
    return minute;
  };
  const calcPosition = (minute: number) => {
    const x_position = Math.round((minute / 59) * interact.maxPosition.x);
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

  useEffect(() => {
    if (isActive) {
      interact.disable();
    } else {
      interact.enable();
    }
  }, [isActive, interact.position]);

  useEffect(() => {
    const newMinute = calcMinute(interact.position.x) || 0;
    if (newMinute !== minute) {
      setMinute(newMinute);
    }
  }, [interact.position.x]);

  useEffect(() => {
    const newPosition = { x: calcPosition(minute), y: interact.position.y };
    if (newPosition.x !== interact.position.x) {
      interact.setPosition(newPosition);
    }
  }, [minute]);

  return (
    <>
      <div className={styles.controller}>
        <div className={styles.caption}>
          <div>min</div>
        </div>
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
      </div>
    </>
  );
}
