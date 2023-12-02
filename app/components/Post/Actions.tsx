/* eslint-disable @next/next/no-img-element */
import styles from "./Actions.module.scss";
import Share from "../../../public/icons/share.svg";
import Like from "../../../public/icons/like.svg";
import Comment from "../../../public/icons/comment.svg";
import { Post } from "../../util/models";

interface Props {
  post: Post;
}

export default function Actions(props: Props) {
  const liked = true;
  var likes, comments;
  var stylelike = styles.button;
  if (liked) {
    stylelike = styles.liked;
  }

  if (props.post.likes) {
    if (props.post.likes < 1000) {
      likes = props.post.likes;
    } else {
      likes = `${props.post.likes / 1000}k`;
    }
  }
  if (props.post.comments.length) {
    if (props.post.comments.length < 1000) {
      comments = props.post.comments.length;
    } else {
      comments = `${props.post.comments.length / 1000}k`;
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.button}>
        <div className={stylelike}>
          <Like />
          <p>Curtiu</p>{likes && <span className={styles.contActions}>{likes}</span>}
        </div>
      </div>
      <div className={styles.button}>
        <Comment />
        <p>Comentários</p> {comments && <span className={styles.contActions}>{comments}</span>}
      </div>
      <div className={styles.button}>
        <Share />
        <p>Compartilhar</p>
      </div>
    </div>
  );
}
