import React, { MouseEventHandler } from "react";
import styles from "@/styles/Home.module.css";

interface StopButtonProps {
  stopHandler: MouseEventHandler<HTMLButtonElement>;
}

export default function StopButton({
  stopHandler,
}: StopButtonProps): React.JSX.Element {
  return (
    <button
      className={styles.inactiveButton}
      type="button"
      onClick={stopHandler}
    >
      Stop
    </button>
  );
}
