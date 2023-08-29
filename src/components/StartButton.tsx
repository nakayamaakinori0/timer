import React from "react";
import styles from "@/styles/Home.module.css";
export default function StopButton({ startHandler }) {
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