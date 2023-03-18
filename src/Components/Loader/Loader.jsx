import React from "react";
import styles from './loader.module.css';

export default function Loader() {
  return (
    <div className={styles["loaderContainer"]}>
        <div className={styles["spinner"]}>
      <div className={styles["bounce1"]} />
      <div className={styles["bounce2"]} />
      <div className={styles["bounce3"]} />
    </div>
    </div>
  );
}
