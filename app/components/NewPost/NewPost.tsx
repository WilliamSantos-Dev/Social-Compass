/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Button from "../Button/Button";
import InputContent from "../InputContent/InputContent";
import styles from "./NewPost.module.scss";
import { NewPostType } from "../../util/models";
import api from "../../util/api";
import { useAuth } from "../../Contexts/AuthContext";

interface Props {
  userimage: string,
  action: ()=>void,
}

export default function NewPost(props: Props) {
  const [inputText, setInputText] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [showMapsInput, setShowMapsInput] = useState(false);
  const auth = useAuth();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  async function action() {
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
    setLocation("");
    setImage("");
    setShowImageInput(false);
    setShowMapsInput(false);
    props.action()
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && inputText.trim() !== "") {
      action();
    }
  }

  function handleImageClick() {
    setShowImageInput(!showImageInput);
  }

  function handleMapsClick() {
    setShowMapsInput(!showMapsInput);
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputcontent}>
        <input
          type="text"
          placeholder={"No que você está pensando?"}
          className={styles.input}
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        {showImageInput && (
          <input
          placeholder="Insira a URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        )}

        {showMapsInput && (
          <input
          placeholder="Insira a localização"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        )}
      </div>
      <div className={styles.options}>
        <div className={styles.inputoptions}>
          <img
            src="/icons/cam.svg"
            alt="Icon Cam"
            onClick={handleImageClick}
          />
          <img
            src="/icons/imageIcon.svg"
            alt="Icon Image"
            onClick={handleImageClick}
          />
          <img
            src="/icons/paperClips.svg"
            alt="Icon paper Clips"
           
          />
          <img
            src="/icons/maps.svg"
            alt="Icon maps"
            onClick={handleMapsClick}
          />
          <img
            src="/icons/emoji.svg"
            alt="Icon Emoji"
           
          />
        </div>

        <Button width={101} text="Postar" type="button" action={action} />
      </div>
    </div>
  );
}
