/* eslint-disable @next/next/no-img-element */
import styles from "./Header.module.scss";
interface Props {
  userimage: string;
  username: string
  menuOpen: boolean;
  updateMenu: () => void;
}
export default function Header(props: Props) {
  var icon ="Right"
  if(props.menuOpen === true){
    icon = "Left"
  }
  return (
    <header className={styles.header}>
      <div className={styles.leftcontent}>
        <img src={`/icons/ArrowFat${icon}.svg`} alt="Arrow Icon" onClick={props.updateMenu}/>
        <p>SocialCompass</p>
      </div>
      <div className={styles.rigthcontent}>
        <img src="/icons/GlobeHemisphereEast.svg" alt="Globe East" />
        <img src="/icons/Bell.svg" alt="Bell" />
        <p>{props.username}</p>
        <img className={styles.userimage}src={props.userimage} alt="User Image"/>
      </div>
    </header>
  );
}
