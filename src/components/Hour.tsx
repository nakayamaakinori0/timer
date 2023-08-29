import React, { ChangeEvent } from "react";
import styles from "@/styles/Home.module.css";

export default function Hour({
  displayHour,
  hourChangeHandler,
}): React.JSX.Element {
  return (
      <input
        className={`${styles.input} ${styles.noSpin}`}
        type="number"
        value={displayHour}
        onChange={hourChangeHandler}
      ></input>
  );
}
