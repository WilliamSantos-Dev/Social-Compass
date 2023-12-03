/* eslint-disable @next/next/no-img-element */
import { User } from "../../util/models";
import styles from "./Profile.module.scss";

export default function About({ user }: { user: User }) {
  const userBirthday: string = user.birthdate;

  function coverterDate(userData: string) {
    const meses: string[] = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const data = new Date(userData);
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const resultado = `Nascido em ${dia} de ${mes}, ${ano}`;
    return resultado;
  }

  const birthdayText = coverterDate(userBirthday);

  return (
    <div className={styles.about}>
      <h1>Sobre</h1>
      <div>
        <div className={styles.aboutitem}>
          <img src="/icons/userwhite.svg" alt="" />
          <p>{user.sex}</p>
        </div>
        <div className={styles.aboutitem}>
        <img src="/icons/birthday.svg" alt="" />
          <p>{birthdayText}</p>
        </div>
        <div className={styles.aboutitem}>
        <img src="/icons/Location.svg" alt="" />
          <p>{user.address}</p>
        </div>
        <div className={styles.aboutitem}>
        <img src="/icons/Message.svg" alt="" />
          <p>{user.email}</p>
        </div>
        <div className={styles.aboutitem}>
        <img src="/icons/Call.svg" alt="" />
          <p>{user.phone}</p>
        </div>
      </div>
    </div>
  );
}
