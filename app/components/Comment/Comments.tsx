import { Comment as CommentType } from "../../util/models";
import CommentComponent from "./Comment";
import styles from "./Comment.module.scss";

export default function Comments({ comments }: { comments: CommentType[] }) {
  return (
    <div className={styles.container}>
      <p>Todos os comentários:</p>
      <CommentComponent comment={comments[0]} />
      {comments.length > 1 && (
        <div>
          <hr className={styles.line} />
          <p className={styles.allcomments}>Ver todos os comentários</p>
        </div>
      )}
    </div>
  );
}
