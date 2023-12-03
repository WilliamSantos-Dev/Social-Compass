/* eslint-disable @next/next/no-img-element */
import api from "../../util/api";
import { User } from "../../util/models";
import styles from "./userHeader.module.scss";

interface Props {
  user: User;
  myProfile?: boolean;
}

export default function UserHeader(props: Props) {
  const user = props.user;
  const cover = api.getCover();
  return (
    <div className={styles.profile}>
      <img src={cover} alt="Cover" className={styles.cover}/>
      <div className={styles.profilecontainer}>
        <img
          src={user.image || "/noprofile.jpg"}
          alt={user.name}
          className={styles.userimage}
        />
        <div>
          <h1>{user.name}</h1>
          <h2>{user.occupation}</h2>
        </div>
      </div>
    </div>
  );
}
