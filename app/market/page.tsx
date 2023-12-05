"use client";
import Body from "../components/Body/Body";
import api from "../util/api";
import { MarketItem } from "./MarketItem";
import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import Load from "../components/Load/load";

const Market = () => {
  const Auth = useAuth();
  const user = Auth.user;
  const [items, setItems] = useState([]);

  async function loadItems() {
    setItems(await api.getMarketItems(Auth.getToken()));
  }
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      {user &&(
        <Body user={user} marketplace>
          <div className={styles.maincontent}>
            <div>
              <h2>TODOS OS ITENS</h2>
              <h1>Marketplace</h1>
              <div className={styles.additemgroup}>
                <button className={styles.additem}>Adicionar Item</button>
              </div>
            </div>
            <div className={styles.items}>
              {" "}
              {items.length > 0 &&
                items.map((item, index) => (
                  <MarketItem item={item} key={index} />
                ))}
            </div>
          </div>
        </Body>
      )}
      {!user && <Load />}
    </>
  );
};

export default Market;
