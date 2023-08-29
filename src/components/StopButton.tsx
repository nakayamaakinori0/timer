import React from "react";
import styles from "@/styles/Home.module.css";
export default function StopButton({ stopHandler }) {
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
