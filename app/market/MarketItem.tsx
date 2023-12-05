/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MarketItem as MarketItemType } from "../util/models";
import styles from "./MarketItem.module.scss";
import Link from "next/link";
interface Props {
  item: MarketItemType;
}
export const MarketItem = (props: Props) => {
  return (
   <Link href={`market/${props.item.id}`}>
    <div className={styles.item}>
      <div className={styles.itemimage}>
        <img src={props.item.image || "noimageitem.jpg"} alt="Item market" />
      </div>
      <div className={styles.info}>
        <div className={styles.itemtextarea}>
          <h1>{props.item.name}</h1>
          <p>{props.item.description}</p>
          <span>R$ {props.item.price}</span>
        </div>
        {props.item.vendido === false ? (
          <button className={styles.notselled}>Ainda não vendido.</button>
        ) : (
          <button className={styles.selled}>Já vendido!</button>
        )}
      </div>
    </div>
    </Link> 
  );
};
