import React, { MouseEventHandler } from "react";
import styles from "@/styles/Home.module.css";

interface StartButtonProps {
  startHandler: MouseEventHandler<HTMLButtonElement>;
}

export default function StartButton({
  startHandler,
}: StartButtonProps): React.JSX.Element {
  return (
    <button
      className={styles.activeButton}
      type="button"
      onClick={startHandler}
    >
      Start
    </button>
  );
}
