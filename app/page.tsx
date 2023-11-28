import Link from "next/link";
import Input from "./components/Input/Input";
import styles from "./page.module.css"

export default function Home() {
  return (
    <div>
      <h1> Olá,</h1>
      <h2> Por favor, registra-se para continuar.</h2>
      <form action="" className={styles.form}>
        <h1> Cadastro</h1>
        <Input type="text" isRequired placeholder="Nome" name="name" icon="user"/>
        <Input type="text" isRequired placeholder="Usuário" name="name" icon="username"/>
        <Input type="date" isRequired placeholder="Nascimento" name="nascimento" icon="date"/>
        <Input type="email" isRequired placeholder="Email" name="email" icon="email"/>
        <Input type="text" isRequired placeholder="Senha" name="senha" icon="padlock"/>
        <Input type="text" isRequired placeholder="Confirmar Senha" name="confirmesenha" icon="security"/>

        <button>Registra-se</button>
        <h2>Já possui uma conta? <Link href={"/login"}>Faça Login</Link></h2>
      </form>
      
    </div>
  );
}
