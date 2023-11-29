/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import styles from "./page.module.scss";
import RegisterForm from "./registerForm";

const registerImage = "register.png";

interface FormData {
  name: string;
  username: string;
  nascimento: string;
  email: string;
  senha: string;
  confirmesenha: string;
}

export default function Home() {
  const handleRegistrationSubmit = (formData: FormData) => {
    console.log("Dados do formulário no Home:", formData);
  };

  return (
    <div className={styles.maincontent}>
      <div className={styles.register}>
        <RegisterForm onSubmitForm={handleRegistrationSubmit} />
      </div>
      <div className={styles.image}>
        <img src={registerImage} alt="Image computer" />
      </div>
    </div>
  );
}
