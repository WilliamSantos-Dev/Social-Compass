"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Register.module.scss";
import Input from "../components/Input/Input";
import {
  validEmail,
  validUsername,
  validName,
  validPassword,
  FormData,
  validDate,
  validForm,
} from "./validations";
import Button from "../components/Button/Button";

interface Props {
  onSubmitForm: any;
}

export default function RegisterForm(props: Props) {
  const { onSubmitForm } = props;
  const initialFormData: FormData = {
    name: "",
    username: "",
    nascimento: null,
    email: "",
    senha: "",
    confirmesenha: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [usernameValid, setUsernameValid] = useState<string | boolean>(
    "default"
  );
  const [emailValid, setEmailValid] = useState<string | boolean>("default");

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    onSubmitForm(formData);
    setEmailValid(validEmail(formData));
    setUsernameValid(validUsername(formData));
    if (validForm(formData)) console.log("APROVADO");
    else {
      console.log("Nao aprovado");
    }
  };

  return (
    <div className={styles.maincontent}>
      <h1> Olá,</h1>
      <h2> Por favor, registre-se para continuar.</h2>
      <h1 className={styles.title}> Cadastro</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          isRequired
          type={"text"}
          placeholder={"Nome"}
          icon={"user"}
          onChange={(res: any) => handleInputChange("name", res.target.value)}
          value={formData.name}
          isValid={validName(formData)}
        />
        {validName(formData) !== true && <p>{validName(formData)}</p>}
        <Input
          isRequired
          type={"text"}
          placeholder={"Usuário"}
          icon={"username"}
          onChange={(res: any) =>
            handleInputChange("username", res.target.value)
          }
          value={formData.username}
          isValid={usernameValid}
        />
        {emailValid !== "default" && <p>{validUsername(formData)}</p>}
        <Input
          isRequired
          type={"date"}
          placeholder={"Data de Nascimento"}
          icon={"date"}
          onChange={(res: any) =>
            handleInputChange("nascimento", res.target.value)
          }
          value={formData.nascimento}
          isValid={validDate(formData)}
        />
        {validDate(formData) !== true && validDate(formData) !== "default" && (
          <p>{validDate(formData)}</p>
        )}
        <Input
          isRequired
          type={"email"}
          placeholder={"Email"}
          icon={"email"}
          onChange={(res: any) => handleInputChange("email", res.target.value)}
          value={formData.email}
          isValid={emailValid}
        />
        {validEmail(formData) !== "default" &&
          validEmail(formData) !== true && <p>{validEmail(formData)}</p>}
        <Input
          isRequired
          type={"password"}
          placeholder={"Senha"}
          icon={"padlock"}
          onChange={(res: any) => handleInputChange("senha", res.target.value)}
          value={formData.senha}
          isValid={validPassword(formData)}
        />
        <Input
          isRequired
          type={"password"}
          placeholder={"Confimar Senha"}
          icon={"security"}
          onChange={(res: any) =>
            handleInputChange("confirmesenha", res.target.value)
          }
          value={formData.confirmesenha}
          isValid={validPassword(formData)}
        />
        {validPassword(formData) !== "default" && (
          <p>{validPassword(formData)}</p>
        )}
        <Button type="submit" text="Registra-se"/>
        <h2>
          Já possui uma conta?
          <Link href={"/"}>
            <span> Faça Login</span>
          </Link>
        </h2>
      </form>
    </div>
  );
}
