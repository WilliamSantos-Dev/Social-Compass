/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Input from "./components/Input/Input";
import Link from "next/link";
import Button from "./components/Button/Button";
const registerImage = "register.png";

export default function Home() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = () => {
    console.log("Sumeteu");
  };

  return (
    <div className={styles.maincontent}>
      <form className={styles.form}>
        <div className={styles.formcontent}>
          <div className={styles.infoform}>
            <h1> Olá,</h1>
            <h2> Para continuar navegando de forma segura, efetue o login.</h2>
            <h1 className={styles.titlelogin}>Login</h1>
          </div>
          <Input isRequired  type={"text"} placeholder={"Usuário"}
            icon={"user"} onChange={(e: any) => { setUser(e.target.value);}} value={user} isValid={""}/>
          <Input isRequired type={"text"} placeholder={"Senha"}
            icon={"padlock"} onChange={(e: any) => { setPassword(e.target.value);}} value={password}isValid={""}/>
        </div>
        <Button type="submit" text="Entrar" />
        <h2 className={styles.register}>
          Novo por aqui?{" "}
          <Link href={"/register"}>
            <span>Registre-se</span>
          </Link>
        </h2>
      </form>
      <img className={styles.image} src={registerImage} alt="Image computer" />
    </div>
  );
}
