import styles from "@/styles/Home.module.css";
import { useRef, useEffect } from "react";
import { useInteractJS } from "@/hooks/useInteractJS";

interface HourControllerProps {
  isActive: boolean;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  hour: number;
}

export default function HourController({
  isActive,
  setHour,
  hour,
}: HourControllerProps): React.JSX.Element {
  const initPosition = { x: 0, y: 0 };
  const minPosition = { x: 0, y: 0 };
  const maxPosition = { x: 0, y: 0 };
  const barRef = useRef<HTMLDivElement | null>(null);
  const squareRef = useRef<HTMLDivElement | null>(null);
  const interact = useInteractJS(initPosition, minPosition, maxPosition);

  const calcHour = (x_position: number) => {
    const hour = Math.round((x_position / interact.maxPosition.x) * 23);
    return hour;
  };
  const calcPosition = (hour: number) => {
    const x_position = Math.round((hour / 23) * interact.maxPosition.x);
    return x_position;
  };

  // barとsquareがレンダリングされたら、maxPositionを設定する。
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
    const handleTouchStart = () => {
      document.body.style.overflowY = "hidden";
    };
    const handleTouchEnd = () => {
      document.body.style.overflowY = "scroll";
    };
    squareRef.current?.addEventListener("touchstart", handleTouchStart);
    squareRef.current?.addEventListener("touchend", handleTouchEnd);
    return () => {
      squareRef.current?.removeEventListener("touchstart", handleTouchStart);
      squareRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Active→interactを無効化、InActive→interactを有効化
  useEffect(() => {
    if (isActive) {
      interact.disable();
    } else {
      interact.enable();
    }
  }, [isActive, interact.position]);

  // interact.position.xにhourを同期する。
  useEffect(() => {
    const newHour = calcHour(interact.position.x) | 0;
    if (newHour !== hour) {
      setHour(newHour);
    }
  }, [interact.position.x]);

  // hourにinteract.position.xを同期する。
  useEffect(() => {
    const newPosition = { x: calcPosition(hour), y: 0 };
    if (newPosition.x !== interact.position.x) {
      interact.setPosition(newPosition);
    }
  }, [hour]);

  return (
    <>
      <div className={styles.controller}>
        <div className={styles.caption}>
          <div>hour</div>
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
