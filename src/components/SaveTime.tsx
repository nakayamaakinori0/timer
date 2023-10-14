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
  const [displaySaveArr, setDisplaySaveArr] = useState<DisplayTimeObj[]>([]);
  const [disableSave, setDisableSave] = useState<boolean>(false);

// localStorageに保存されているsaveArrを読み込む
  useEffect(() => {
    const saveArrJSON = window.localStorage.getItem("saveArr");
    if (saveArrJSON) {
      const saveArrFromLocalStorage = JSON.parse(saveArrJSON);
      setSaveArr(saveArrFromLocalStorage);
    };
  }, []);

// saveArrの要素が3つ以上あったら、saveボタンを無効化する
  useEffect(() => {
    if (saveArr.length >= 3) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  }, [saveArr]);

// saveArrの要素が変更されたら、表示用のsaveArrを更新する
  useEffect(() => {
    setDisplaySaveArr(
      saveArr.map((obj) => {
        return {
          hour: obj?.hour?.toString().padStart(2, "0"),
          minute: obj?.minute?.toString().padStart(2, "0"),
          second: obj?.second?.toString().padStart(2, "0"),
        };
      })
    );
  }, [saveArr]);

  const saveHandler = useCallback(() => {
    // もし、saveArrの要素が3つ以上あったら、保存しない。
    if (saveArr.length >= 3) {
      return null;
    }
    const newSaveArr = [...saveArr, { hour: hour, minute: minute, second: second }];
    setSaveArr(newSaveArr);
    window.localStorage.setItem("saveArr", JSON.stringify(newSaveArr));
  }, [hour, minute, second, saveArr]);

  const loadHandler = useCallback(
    (key: number) => {
      setHour(saveArr[key].hour);
      setMinute(saveArr[key].minute);
      setSecond(saveArr[key].second);
    },
    [saveArr]
  );

  const deleteHandler = useCallback(() => {
    const newSaveArr = saveArr.slice(0, saveArr.length - 1);
    setSaveArr(newSaveArr);
    window.localStorage.setItem("saveArr", JSON.stringify(newSaveArr));
  }, [saveArr]);

  return (
    <div>
      <div className={styles.saveTimeButtons}>
        <button
          className={styles.saveButton}
          onClick={saveHandler}
          disabled={isActive || disableSave}
        >
          save
        </button>
        <button
          className={styles.delButton}
          onClick={deleteHandler}
          disabled={isActive}
        >
          del
        </button>
      </div>
      <div className={styles.savedTimes}>
        {displaySaveArr?.map((obj, key) => {
          return (
            <button
              key={key}
              className={styles.savedTime}
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
