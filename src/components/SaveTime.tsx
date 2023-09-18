import styles from "@/styles/Home.module.css";
import { useState, useCallback, useEffect } from "react";

interface SaveTimeProps {
  // 型定義
  hour: number;
  minute: number;
  second: number;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  setMinute: React.Dispatch<React.SetStateAction<number>>;
  setSecond: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
}

interface TimeObj {
  hour: number;
  minute: number;
  second: number;
}

interface DisplayTimeObj {
  hour: string;
  minute: string;
  second: string;
}

export default function SaveTime({
  hour,
  minute,
  second,
  setHour,
  setMinute,
  setSecond,
  isActive,
}: SaveTimeProps): React.JSX.Element {
  // 保存用のHour, Minute, Second
  const [saveArr, setSaveArr] = useState<TimeObj[]>([]);
  console.log("saveArr", saveArr);
  const [displaySaveArr, setDisplaySaveArr] = useState<DisplayTimeObj[]>([]);
  console.log("displaySaveArr", displaySaveArr);

  const saveHandler = useCallback(() => {
    if (saveArr.length === 0) {
      setSaveArr([{ hour: hour, minute: minute, second: second }]);
    }
    if (
      saveArr[saveArr.length - 1]?.hour === hour &&
      saveArr[saveArr.length - 1]?.minute === minute &&
      saveArr[saveArr.length - 1]?.second === second
    ) {
      return null;
    }
    // もし、saveArrの最後の要素が現在の時間と同じだったら、保存しない。
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
      setHour(saveArr[key].hour);
      setMinute(saveArr[key].minute);
      setSecond(saveArr[key].second);
    },
    [saveArr]
  );

  const deleteHandler = useCallback(() => {
    setSaveArr(saveArr.slice(0, saveArr.length - 1));
  }, [saveArr]);

  return (
    <div>
      <button onClick={saveHandler} disabled={isActive}>
        save
      </button>
      <button onClick={deleteHandler} disabled={isActive}>
        del
      </button>
      <div className={styles.saveTimes}>
        {displaySaveArr?.map((obj, key) => {
          return (
            <button
              key={key}
              className={styles.saveTime}
              onClick={() => {
                loadHandler(key);
              }}
              disabled={isActive}
            >{`${obj.hour}:${obj.minute}:${obj.second}`}</button>
          );
        })}
      </div>
    </div>
  );
}
