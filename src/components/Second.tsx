import React, { ChangeEvent } from "react";
import styles from "@/styles/Home.module.css";

interface SecondProps {
  displaySecond: string;
  secondChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
}

export default function Hour({
  displaySecond,
  secondChangeHandler,
  isActive,
}: SecondProps): React.JSX.Element {
  return (
    <input
      className={`${styles.input} ${styles.noSpin}`}
      type="number"
      value={displaySecond}
      onChange={secondChangeHandler}
      disabled={isActive}
      inputMode="numeric"
    ></input>
  );
}
