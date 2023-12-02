import styles from "./Button.module.scss"

interface Props{
    text: string;
    type: "button" | "submit";
    action?: any;
    width?: number;
}
export default function Button(props: Props){   
    const buttonWidth = {
        width: `${props.width ?? 406}px`,
    };
    return(
        <>
        <button className={styles.button} style={buttonWidth} type={props.type}>
          {props.text}
        </button>
        </>
    )
}