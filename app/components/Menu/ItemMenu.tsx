import Link from "next/link";
import styles from "./ItemMenu.module.scss";

interface Props {
  text: string;
  active?: false;
  link: string;
}

export default function ItemMenu(props: Props) {
  return (
    <Link href={`/${props.link}`}>
      <div className={styles.content}>
        <p className={styles.text}>{props.text}</p>
      </div>
    </Link>
  );
}
