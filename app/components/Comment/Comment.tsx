/* eslint-disable @next/next/no-img-element */
import styles from "./Comment.module.scss"
import { Comment } from "../../util/models"
import Link from "next/link";



export default function Comment({comment}:{ comment: Comment }){
    return(
    <div className={styles.comment}>
        <Link href={`/profile/${comment.author.id}`}>{comment.author.image !== null && <img src={comment.author.image} alt="User image"/>}</Link>
        <p><span>{comment.author.name}: </span>{comment.content}</p>
    </div>
    );
}