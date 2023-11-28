/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Input.module.scss";

interface inputProps{
    type: string;
    name: string;
    placeholder: string;
    isRequired?: boolean;
    icon: string;
}

export default function Input(props:inputProps) {
  return (
    <div className={styles.inputcontainer}>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required={props.isRequired}
      />
      <img src={`/icons/${props.icon}.svg` }alt={`${props.icon} Icon`} />
      
    </div>
  );
}
