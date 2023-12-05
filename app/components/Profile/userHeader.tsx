/* eslint-disable @next/next/no-img-element */
"use client"
import api from "../../util/api";
import { User } from "../../util/models";
import Button from "../Button/Button";
import styles from "./userHeader.module.scss";

interface Props {
  user: User;
  myProfile?: boolean;
  onEditClick?: ()=> void;
}

export default function UserHeader(props: Props) {
  const user = props.user;
  const cover = api.getCover();

  function click(){
    if(props.onEditClick){
      props.onEditClick()
      console.log("AAA", props.onEditClick)
    }
  }
  return (
    <div className={styles.profile}>
      <img src={cover} alt="Cover" className={styles.cover} />
      <div className={styles.profilecontainer}>
        <img
          src={user?.image || "/noprofile.jpg"}
          alt={user.name}
          className={styles.userimage}
        />
        <div className={styles.userdata}>
          <div>
            <h1>{user.name}</h1>
            <h2>{user.occupation}</h2>
          </div>
          {props.myProfile && <div onClick={click}><Button type="button" text="Editar Perfil" width={140}/></div>}
        </div>
      </div>
    </div>
  );
}
