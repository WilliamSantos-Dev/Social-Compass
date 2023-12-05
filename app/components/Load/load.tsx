import React from "react";
import ReactLoading from "react-loading";
import styles from "./load.module.scss";

const Load = () => (
  <div className={styles.load}>
    <ReactLoading height={20} width={80} />
  </div>
);

export default Load;
