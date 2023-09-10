import styles from "@/styles/Home.module.css";
import { useRef, useEffect, useState } from "react";
import { useInteractJS } from "@/hooks/hook";

interface HourControlerProps {
  isActive: boolean;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  hour: number;
}

export default function HourControler({
  isActive,
  setHour,
  hour,
}: HourControlerProps): React.JSX.Element {
  const initPosition = { x: 0, y: 0 };
  const minPosition = { x: 0, y: 0 };
  const [maxPosition, setMaxPosition] = useState({ x: 0, y: 0 });
  const barRef = useRef<HTMLDivElement | null>(null);
  const squareRef = useRef<HTMLDivElement | null>(null);
  const interact = useInteractJS(initPosition, minPosition, maxPosition);

  useEffect(() => {
    if (barRef.current && squareRef.current) {
      setMaxPosition({
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
  }, [isActive]);

  return (
    <>
      <div>H</div>
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
