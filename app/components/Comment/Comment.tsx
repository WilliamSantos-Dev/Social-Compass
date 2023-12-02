/* eslint-disable @next/next/no-img-element */
import styles from "./Comment.module.scss"
import { Comment } from "../../util/models"



export default function Comment({comment}:{ comment: Comment }){
    return(
    <div className={styles.comment}>
        {comment.author.image !== null && <img src={comment.author.image} alt="User image"/>}
        <p><span>{comment.author.name}: </span>{comment.content}</p>
    </div>
    );
}