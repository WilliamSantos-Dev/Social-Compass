import Link from "next/link";
import styles from "./ItemMenu.module.scss";

interface Props {
  text: string;
  active?: boolean;
  link: string;
}

export default function ItemMenu(props: Props) {
  const style = props.active ? styles.active : styles.content;

  return (
    <Link href={`/${props.link}`}>
      <div className={style}>
        <p className={styles.text}>{props.text}</p>
      </div>
    </Link>
  );
}
