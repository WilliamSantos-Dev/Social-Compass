/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Button from "../Button/Button";
import InputContent from "../InputContent/InputContent";
import styles from "./NewPost.module.scss";
import { NewPostType} from "../../util/models";

interface Props {
  userimage: string;
}

export default function NewPost(props: Props) {
  const [postText, setPostText] = useState("");
  const [newPost, setNewPost] = useState<NewPostType>()

  function handlePostSubmit(){
    return true
  }

  return (
    <div className={styles.container}>
      <InputContent
        userimage={props.userimage || "noprofile.jpg"}
        placeholder="No que você está pensando?"
        onPostSubmit={handlePostSubmit}
        isNewPost
      />
      <div className={styles.options}>
        <div className={styles.inputoptions}>
          <img src="/icons/cam.svg" alt="Icon Cam" />
          <img src="/icons/imageIcon.svg" alt="Icon Image" />
          <img src="/icons/paperClips.svg" alt="Icon paper Clips" />
          <img src="/icons/maps.svg" alt="Icon maps" />
          <img src="/icons/emoji.svg" alt="Icon Emoji" />
        </div>

        <Button
          width={101}
          text="Postar"
          type="button"
          action={handlePostSubmit}
        />
      </div>
    </div>
  );
}
