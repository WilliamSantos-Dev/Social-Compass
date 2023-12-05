/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import styles from "./page.module.scss";
import RegisterForm from "./registerForm";
import { NewUser } from "../util/models";

const registerImage = "register.png";

export default function Register() {
  const handleRegistrationSubmit = (formData: NewUser) => {
    console.log(formData);
  };

  return (
    <div className={styles.maincontent}>
      <div className={styles.register}>
        <RegisterForm onSubmitForm={handleRegistrationSubmit} />
      </div>
      <img className={styles.image} src={registerImage} alt="Image computer" />
    </div>
  );
}
