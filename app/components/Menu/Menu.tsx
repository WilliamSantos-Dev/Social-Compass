/* eslint-disable @next/next/no-img-element */
import ItemMenu from "./ItemMenu";
import styles from "./Menu.module.scss";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <img src="/compass-white.png" alt="Compass Uol" className={styles.imgcompass}/>
      <div className={styles.options}>
        <ItemMenu text="Página Inicial" link="feed" />
        <ItemMenu text="Meu Perfil" link="myprofile/" />
        <ItemMenu text="Marketplace" link="marketplace/" />
        <ItemMenu text="Sair" link="login/" />
      </div>
    </div>
  );
}
