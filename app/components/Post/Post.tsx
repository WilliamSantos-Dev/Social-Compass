/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import api from "../../util/api";
import {
  Post as PostType,
  User,
  Comment as CommentType,
  Post,
} from "../../util/models";
import InputContent from "../InputContent/InputContent";
import Actions from "./Actions";
import styles from "./Post.module.scss";
import calculateTime from "./calculateTime";
import Comments from "../Comment/Comments";
import Link from "next/link";
import { useAuth } from "../../Contexts/AuthContext";

interface Props {
  post: PostType;
  user: User;
  action: ()=>void;
}

export default function Post(props: Props) {
  const auth = useAuth();
  const author = props.post.author;
  const [post, setPost] = useState(props.post);
  const [deleteActive, setDeleteActive] = useState(false);
  var isMyPost = false;
  async function handleCommentSubmit() {
    const allPosts = await api.getPosts(auth.token);
    const updatePost = allPosts.find((postItem) => postItem.id === post.id);
    setInputText("");
    setPost(updatePost as PostType);
  }

  function actualizedelete(){
    setDeleteActive(!deleteActive)
  }

  async function deletePost(){    
    props.post.comments.map(async (comment)=> {
      await api.deleteComment(comment.id,auth.token)
    })
    if(props.post.comments.length < 1){
      props.action()
      await api.deletePostByIn(props.post.id, auth.token)
      props.action()
    }
    await api.deletePostByIn(props.post.id, auth.token)
    props.action()
  }

  const [inputText, setInputText] = useState("");
  const comments = [...post.comments].reverse();
  if (props.user.id === props.post.author.id) {
    isMyPost = true;
  }
  return (
    <div className={styles.postcontainer}>
      <div className={styles.userinfo}>
        <Link href={`/profile/${author.id}`}>
          <img
            src={author.image || "/noprofile.jpg"}
            alt="Image User"
            className={styles.userimage}
          />
        </Link>

        <div className={styles.userinfotext}>
          <h1 className={styles.username}>{author.name}</h1>
          <div className={styles.clock}>
            <img src="/icons/clock.svg" alt="Clock Icon" />
            <p className={styles.datepost}>
              {calculateTime(new Date(post.createdAt))}
            </p>{" "}
            {post.location && (
              <p className={styles.datepost}>
                {" "}
                em <span className={styles.location}> {post.location}</span>
              </p>
            )}
          </div>
        </div>
        {isMyPost && (
          <div className={styles.deleteblock}>
            <img src="/icons/postaction.svg" alt="" onClick={actualizedelete}/>{" "}
            {deleteActive && <button className={styles.delete} onClick={deletePost}>Deletar</button>}
          </div>
        )}
      </div>
      <p>{post.text}</p>
      {post.image && (
        <img src={post.image} alt="Image Post" className={styles.postimage} />
      )}
      <Actions post={post} />
      <InputContent
        userimage={props.user.image || "/noprofile.jpg"}
        inputsOptions
        placeholder="Tem algo a dizer?"
        isComment
        postId={post.id}
        onCommentSubmit={handleCommentSubmit}
      />
      {post.comments.length > 0 && <Comments comments={comments} />}
    </div>
  );
}
