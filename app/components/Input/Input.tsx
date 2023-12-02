"use client"
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Input.module.scss"
import { InputProps } from "../../util/model";

export default function Input(props:InputProps) {
  var validate = styles.default
  if(props.isValid !== true && props.isValid !== "default" ){
    validate = styles.invalid
  }
  if(props.isValid === true){
    validate = styles.valid
  }

  return (
    <div className={[styles.inputcontainer, validate].join(' ')}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        required={props.isRequired}
        onChange={props.onChange}
        value={props.value}
      />
      <img src={`/icons/${props.icon}.svg` }alt={`${props.icon} Icon`} />
      
    </div>
  );
}
