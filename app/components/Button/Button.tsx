import styles from "./Button.module.scss"

interface Props{
    text: string;
    type: "button" | "submit";
}
export default function Button(props: Props){
    return(
        <>
        <button className={styles.button} type={props.type}>
          {props.text}
        </button>
        </>
    )
}