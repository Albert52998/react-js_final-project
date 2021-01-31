import React from "react";
import styles from "./NFstyle.module.css";

export default function NotFound() {
  return (
    <div style={{ marginTop: "200px" }}>
      <section class={styles["error-container"]}>
        <span class={styles.four}>
          <span class={styles["screen-reader-text"]}>4</span>
        </span>
        <span class={styles.zero}>
          <span class={styles["screen-reader-text"]}>0</span>
        </span>
        <span class={styles.four}>
          <span class={styles["screen-reader-text"]}>4</span>
        </span>
        <h1>Page Not Found!</h1>
      </section>
    </div>
  );
}
