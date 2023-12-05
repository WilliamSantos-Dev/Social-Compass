/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./List.module.scss";
import { MarketItem, User } from "../../util/models";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Props {
  friends?: User[];
  marketItems?: MarketItem[];
  listName: string;
}

export default function List(list: Props) {
  const [mode, setMode] = useState("upArrow");

  const changemode = () => {
    if (mode === "upArrow") {
      setMode("downArrow");
    } else {
      setMode("upArrow");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <p>{list.listName}</p>
        <img src={`/icons/${mode}.svg`} alt="Arrow" onClick={changemode} />
      </div>
      <AnimatePresence>
        {mode === "upArrow" && (
          <motion.div
            key="list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.19 }}
          >
            {list.friends && list.friends.length > 0 && (
              <div className={styles.listitem}>
                {list.friends.map((friend, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link href={`/profile/${friend.id}`}>
                    <div key={`${friend.id}${index}`} className={styles.item}>
                      <img
                        src={friend.image || "/noprofile.jpg"}
                        alt={friend.name}
                      />
                      <p>{friend.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {list.marketItems && list.marketItems.length > 0 && (
              <div className={styles.listitem}>
                {list.marketItems.map((item, index) => (
                  <div key={`${item.id}${index}`} className={styles.item}>
                    <img
                      src={item.image || "/noimageitem.jpg"}
                      alt={item.name}
                    />
                    <div className={styles.iteminfo}>
                      <p>{item.name}</p>
                      <p className={styles.price}> R$ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
