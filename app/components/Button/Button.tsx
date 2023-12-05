import styles from "./Button.module.scss"
interface Props{
    text: string;
    type: "button" | "submit";
    action?: ()=> void;
    width?: number;
    colorGray?:boolean
}
export default function Button(props: Props){   
    var stylebutton = `${styles.button} ${styles.orange}`;
    const buttonWidth = {
        width: `${props.width ?? 406}px`,
    };
    if(props.colorGray){
        stylebutton = `${styles.button} ${styles.gray}`;
    }
    return(
        <>
        <button className={stylebutton} style={buttonWidth} type={props.type}>
          {props.text}
        </button>
        </>
    )
}