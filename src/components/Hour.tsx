import React, { ChangeEvent } from "react";
import styles from "@/styles/Home.module.css";

interface HourProps {
  displayHour: string;
  hourChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
}

export default function Hour({
  displayHour,
  hourChangeHandler,
  isActive,
}: HourProps): React.JSX.Element {
  return (
    <input
      className={`${styles.input} ${styles.noSpin}`}
      type="number"
      value={displayHour}
      onChange={hourChangeHandler}
      disabled={isActive}
      inputMode="numeric"
    ></input>
  );
}
