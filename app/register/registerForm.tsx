"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Register.module.scss";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { validations } from "./validations";
import api from "../util/api";
import { NewUser } from "../util/models";
import registerUser from "./register";

interface Props {
  onSubmitForm: any;
}

export default function RegisterForm(props: Props) {
  const { onSubmitForm } = props;
  const initialFormData: NewUser = {
    name: "",
    username: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<NewUser>(initialFormData);
  const [usernameValid, setUsernameValid] = useState<string | boolean>(
    "default"
  );
  const [emailValid, setEmailValid] = useState<string | boolean>("default");

  const handleInputChange = (name: keyof NewUser, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitForm(formData);
    setEmailValid(validations.email(formData));
    setUsernameValid(validations.username(formData));
    registerUser(formData)
    console.log("AAAAAAAAAA")
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
          onChange={(res: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("name", res.target.value)
          }
          value={formData.name}
          isValid={validations.fullname(formData)}
        />
        {validations.fullname(formData) !== true && (
          <p>{validations.fullname(formData)}</p>
        )}
        <Input
          isRequired
          type={"text"}
          placeholder={"Usuário"}
          icon={"username"}
          onChange={(res: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("username", res.target.value)
          }
          value={formData.username}
          isValid={usernameValid}
        />
        {validations.username(formData) !== true && (
          <p>{validations.username(formData)}</p>
        )}

        <Input
          isRequired
          type={"date"}
          placeholder={"Data de Nascimento"}
          icon={"date"}
          onChange={(res: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("birthdate", res.target.value)
          }
          value={formData.birthdate}
          isValid={validations.birthdate(formData)}
        />
        {validations.birthdate(formData) !== true &&
          validations.birthdate(formData) !== "default" && (
            <p>{validations.birthdate(formData)}</p>
          )}
        <Input
          isRequired
          type={"email"}
          placeholder={"Email"}
          icon={"email"}
          onChange={(res: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("email", res.target.value)
          }
          value={formData.email}
          isValid={emailValid}
        />
        {validations.email(formData) !== "default" &&
          validations.email(formData) !== true && (
            <p>{validations.email(formData)}</p>
          )}
        <Input
          isRequired
          type={"password"}
          placeholder={"Senha"}
          icon={"padlock"}
          onChange={(res: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("password", res.target.value)
          }
          value={formData.password}
          isValid={validations.password(formData)}
        />
        <Input
          isRequired
          type={"password"}
          placeholder={"Confimar Senha"}
          icon={"security"}
          onChange={(res: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("confirmPassword", res.target.value)
          }
          value={formData.confirmPassword}
          isValid={validations.password(formData)}
        />
        {validations.password(formData) !== "default" && (
          <p>{validations.password(formData)}</p>
        )}
        <Button type="submit" text="Registra-se" />
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
