/* eslint-disable @next/next/no-img-element */
import api from "../../util/api";
import { Post } from "../../util/models";
import InputContent from "../InputContent/InputContent";
import Actions from "./Actions";
import styles from "./Post.module.scss";
import calculateTime from "./calculateTime";

interface Props {
  post?: Post;
}

export default async function Post(props: Props) {
  const post = await api.testePost();
  const user = await api.testAutor();
  return (
    <div className={styles.postcontainer}>
      <div className={styles.userinfo}>
        <img src={user.image} alt="Image User" className={styles.userimage} />
        <div className={styles.userinfotext}>
          <h1 className={styles.username}>{user.name}</h1>
          <div className={styles.clock}>
            <img src="/icons/clock.svg" alt="Clock Icon" />
            <p className={styles.datepost}>{calculateTime(new Date(post.createdAt))}</p>{" "}
            {post.location && (
              <p className={styles.datepost}>
                {" "}
                em <span className={styles.location}> {post.location}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <p>{post.text}</p>
      {post.image && (
        <img src={post.image} alt="Image Post" className={styles.postimage} />
      )}
      <Actions post={post} />
      <InputContent userimage={user.image} inputsOptions />
    </div>
  );
}
