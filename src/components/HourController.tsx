import styles from "@/styles/Home.module.css";
import { useRef, useEffect, useState } from "react";
import { useInteractHorizontalJS } from "@/hooks/useInteractHorizontalJS";

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
  const interact = useInteractHorizontalJS(
    initPosition,
    minPosition,
    maxPosition
  );
  const [isSquareActive, setIsSquareActive] = useState(false);

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
    const newHour = calcHour(interact.position.x) || 0;
    if (newHour !== hour) {
      setHour(newHour);
    }
  }, [interact.position.x]);

  // hourにinteract.position.xを同期する。
  useEffect(() => {
    const newPosition = { x: calcPosition(hour), y: interact.position.y };
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
              onTouchStart={() => {
                setIsSquareActive(true);
              }}
              onTouchEnd={() => {
                setIsSquareActive(false);
              }}
              // for iOS スクロールを防ぐ
              onTouchMove={(e) => {
                console.log("onTouchMove", e);
                e.preventDefault();
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
