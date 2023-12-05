/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "./InputContent.module.scss";
import api from "../../util/api";
import Link from "next/link";
import { useAuth } from "../../Contexts/AuthContext";

interface Props {
  placeholder?: string;
  inputsOptions?: boolean;
  isComment?: boolean;
  postId?: string;
  userimage: string;
  isNewPost?: boolean;
  onCommentSubmit?: () => void;
  onPostSubmit?: () => any;
  onSubmitAction?: () => void;
}

export default function InputContent(props: Props) {
  const [inputText, setInputText] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const auth = useAuth();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  async function action() {
    if (props.postId && props.isComment) {
      const author = auth.id;
      const token = auth.token;
      const comment = {
        content: inputText,
        authorId: author,
        postId: props.postId,
      };
      await api.createComment(comment, token);
      setInputText("");
      if (props.onCommentSubmit) {
        props.onCommentSubmit();
      }
    }

    if (props.isNewPost) {
      await api.createPost(
        {
          text: inputText,
          location: location,
          image: image,
          authorId: auth.id,
        },
        auth.token
      );
      setInputText("");
      if (props.onPostSubmit) {
        props.onPostSubmit();
      }

      if (props.onSubmitAction) {
        props.onSubmitAction();
      }
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && inputText.trim() !== "") {
      action();
    }
  }
  return (
    <div className={styles.container}>
      <Link href={`/profile/myprofile`}>
        <img
          src={props.userimage}
          alt="user image"
          className={styles.userimage}
        />
      </Link>
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
                onClick={() => action()} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}