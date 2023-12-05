/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "./InputContent.module.scss";
import api from "../../util/api";

interface Props {
  placeholder?: string;
  inputsOptions?: boolean;
  isComment?: boolean;
  postId?: string;
  userimage: string;
  onCommentSubmit?: () => void;
}

export default function InputContent(props: Props) {
  const [inputText, setInputText] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  async function action(action: string) {
    if (action === "comment" && props.postId) {
      const author = localStorage.getItem("id") as string;
      const token = localStorage.getItem('token') as string;
      const comment = {
        content: inputText,
        authorId: author,
        postId: props.postId,
      };
      await api.createComment(comment, token);
      setInputText('');
      if(props.onCommentSubmit){
        props.onCommentSubmit();
      }
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && inputText.trim() !== "") {
      action("comment");
    }
  }
  

  return (
    <div className={styles.container}>
      <img
        src={props.userimage}
        alt="user image"
        className={styles.userimage}
      />
      <div className={styles.inputcontent}>
        <input
          type="text"
          placeholder={props.placeholder}
          className={styles.input}
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} 
        />
        {props.inputsOptions && (
          <div className={styles.inputoptions}>
            <img src="/icons/cam.svg" alt="Icon Cam" />
            <img src="/icons/imageIcon.svg" alt="Icon Image" />
            <img src="/icons/paperClips.svg" alt="Icon paper Clips" />
            <img src="/icons/maps.svg" alt="Icon maps" />
            <img src="/icons/emoji.svg" alt="Icon Emoji" />
            {inputText.trim() !== "" && (
              <img
                src="/icons/send.svg"
                alt="send"
                className={styles.sent}
                onClick={() => action("comment")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
