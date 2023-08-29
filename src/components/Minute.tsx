import React, { ChangeEvent } from "react";
import styles from "@/styles/Home.module.css";

export default function Hour({
  displayMinute,
  minuteChangeHandler,
}): React.JSX.Element {
  return (
      <input
        className={`${styles.input} ${styles.noSpin}`}
        type="number"
        value={displayMinute}
        onChange={minuteChangeHandler}
      ></input>
  );
}