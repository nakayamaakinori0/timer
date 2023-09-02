import React, { ChangeEvent } from "react";
import styles from "@/styles/Home.module.css";

interface MinuteProps {
  displayMinute: string;
  minuteChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
}

export default function Hour({
  displayMinute,
  minuteChangeHandler,
  isActive,
}: MinuteProps): React.JSX.Element {
  return (
      <input
        className={`${styles.input} ${styles.noSpin}`}
        type="number"
        value={displayMinute}
        onChange={minuteChangeHandler}
        disabled={isActive}
      ></input>
  );
}
