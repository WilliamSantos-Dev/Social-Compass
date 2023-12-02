/* eslint-disable @next/next/no-img-element */
import ItemMenu from "./ItemMenu";
import styles from "./Menu.module.scss";

export default function Menu() {
  return <div className={styles.menu}>
    <img src="compass-white.png" alt="Compass Uol" className={styles.imgcompass}/>
    
    <div className={styles.options}>
        <ItemMenu text="Página Inicial" link="register"/>
        <ItemMenu text="Meu Perfil" link=""/>
        <ItemMenu text="Marketplace" link=""/>
        <ItemMenu text="Sair" link=""/>
    </div>
  </div>;
}
