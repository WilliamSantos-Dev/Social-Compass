/* eslint-disable @next/next/no-img-element */
import { useAuth } from "../../Contexts/AuthContext";
import ItemMenu from "./ItemMenu";
import styles from "./Menu.module.scss";

interface Props {
  feed?: boolean;
  myprofile?: boolean;
  marketplace?: boolean;
}

export default function Menu(props: Props) {
  const Auth = useAuth()
  var feed, profile, market = false
  if(props.feed) feed = true
  if(props.myprofile) profile = true
  if(props.marketplace) market = true 

  function logout(){
    Auth.logout()
    console.log("clicou")
  }
  return (
    <div className={styles.menu}>
      <img
        src="/compass-white.png"
        alt="Compass Uol"
        className={styles.imgcompass}
      />
      <div className={styles.options}>
        <ItemMenu text="Página Inicial" link="feed" active={feed}/>
        <ItemMenu text="Meu Perfil" link="profile/myprofile/" active={profile} />
        <ItemMenu text="Marketplace" link="market/" active={market}/>
        <div onClick={logout}>
        <ItemMenu text="Sair" link="/" />
        </div>
      </div>
    </div>
  );
}
