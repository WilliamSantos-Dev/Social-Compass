/* eslint-disable @next/next/no-img-element */
import api from "../../util/api";
import { User } from "../../util/models";
import styles from "./Profile.module.scss";
import About from "./about";
import UserHeader from "./userHeader";

interface Props {
  user: User;
  myProfile?: boolean;
}

export default function Profile(props: Props) {
  const user = props.user;
  const cover = api.getCover();

  return (
    <div className={styles.container}>
      <UserHeader user={user} />
      <div className={styles.maincontent}>
        <About user={user} />
        <div className={styles.feed}>
          <div className={styles.options}>
            <p>Followers</p> <p>Following</p>
            <p>
              <span>Posts</span>
            </p>
          </div>
          <div className={styles.feed}>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
