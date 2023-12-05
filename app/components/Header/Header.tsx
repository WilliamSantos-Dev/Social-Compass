/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
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
  var image = props.userimage;
  return (
    <header className={styles.header}>
      <div className={styles.leftcontent}>
        <img src={`/icons/ArrowFat${icon}.svg`} alt="Arrow Icon" onClick={props.updateMenu}/>
        <Link href="/feed"><p>SocialCompass</p></Link>
      </div>
      <div className={styles.rigthcontent}>
        <img src="/icons/GlobeHemisphereEast.svg" alt="Globe East" />
        <img src="/icons/Bell.svg" alt="Bell" />
        <Link href="/profile/myprofile"><p>{props.username}</p></Link>
       <Link href="/profile/myprofile"> <img className={styles.userimage}src={image} alt="User Image" /></Link>
      </div>
    </header>
  );
}
