/* eslint-disable @next/next/no-img-element */
"use client";
import React, { SyntheticEvent, useState } from "react";
import styles from "./page.module.scss";
import Input from "./components/Input/Input";
import Link from "next/link";
import Button from "./components/Button/Button";
import { useRouter } from "next/navigation";
import api from "./util/api";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import NewPost from "./components/UI/NewPost/NewPost";
const registerImage = "register.png";

export default function Home() {
  const [username, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userValid, setUserValid] = useState<string | boolean>("default");
  const router = useRouter();

  async function handleLoginSubmit(event: SyntheticEvent){
    event.preventDefault();
   
    const result = await api.authorizeUser(username, password)
    if(result === false){
      console.log("Erro ao fazer login [arquivo login]")
      console.log(result)
      return
    }else{
      console.log("[LOGIN FEITO]")
      console.log(result)
      console.log("getAllUsers:", api.getAllUsers())
      //router.replace('/register')
    }
    
  };
  const img = "https://img.freepik.com/fotos-gratis/isolado-feliz-sorridente-cao-fundo-branco-retrato-4_1562-693.jpg"
  return (<>
  <Menu/> <NewPost userimage={img}/>
    <Header username="Wiliam Santos" userimage={img}></Header>
    <div className={styles.maincontent}>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <div className={styles.formcontent}>
          <div className={styles.infoform}>
            <h1> Olá,</h1>
            <h2> Para continuar navegando de forma segura, efetue o login.</h2>
            <h1 className={styles.titlelogin}>Login</h1>
          </div>
          <Input
            isRequired
            type={"text"}
            placeholder={"Usuário"}
            icon={"user"}
            onChange={(e: any) => {setUser(e.target.value);}}
            value={username}
            isValid={userValid}
          />
          <Input
            isRequired
            type={"password"}
            placeholder={"Senha"}
            icon={"padlock"}
            onChange={(e: any) => {setPassword(e.target.value);}}
            value={password}
            isValid={userValid}
          />
        </div>
        {!userValid && userValid !== "default" && (<p>Usuário e/ou Senha inválidos.<br></br>por favor, tente novamente!</p>)}
        <Button type="submit" text="Entrar" />
        <h2 className={styles.register}>Novo por aqui?{" "}<Link href={"/register"}><span>Registre-se</span></Link></h2>
      </form>
      <img className={styles.image} src={registerImage} alt="Image computer" />
    </div>
    </>
  );
}
