import React, { ChangeEvent } from "react";
import styles from "@/styles/Home.module.css";

export default function Hour({
  displaySecond,
  secondChangeHandler,
  isActive,
}): React.JSX.Element {
  return (
    <input
      className={`${styles.input} ${styles.noSpin}`}
      type="number"
      value={displaySecond}
      onChange={secondChangeHandler}
      disabled={isActive}
    ></input>
  );
}
