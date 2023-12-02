/* eslint-disable @next/next/no-img-element */
import styles from "./InputContent.module.scss";

interface Props {
  placeholder?: string;
  inputsOptions?: boolean;
  userimage: string;
}
export default function InputContent(props: Props) {
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
        />
        {props.inputsOptions && (
          <div className={styles.inputoptions}>
            <img src="/icons/cam.svg" alt="Icon Cam" />
            <img src="/icons/imageIcon.svg" alt="Icon Image" />
            <img src="/icons/paperClips.svg" alt="Icon paper Clips" />
            <img src="/icons/maps.svg" alt="Icon maps" />
            <img src="/icons/emoji.svg" alt="Icon Emoji" />
          </div>
        )}
      </div>
    </div>
  );
}
