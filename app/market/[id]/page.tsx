/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { MarketItem, User } from "../../util/models";
import api from "../../util/api";
import Body from "../../components/Body/Body";
import Load from "../../components/Load/load";
import styles from "./page.module.scss";
import Button from "../../components/Button/Button";
import { useAuth } from "../../Contexts/AuthContext";

type Props = { params: { id: string } };

export default function MarketItemPage({ params }: Props) {
  const [user, setUser] = useState<User>();
  const [marketItem, setUserDisplayed] = useState<MarketItem>();
  const [seller, setSeller] = useState<User>();
  const auth = useAuth()

  async function load() {
    const id = auth.id
    const token = auth.token
    setUser((await api.getUser(id, token)) as User);
    setUserDisplayed(
      (await api.getMarketItemById(
        params.id,
        auth.token
      )) as MarketItem
    );
    setSeller(await api.getUser(marketItem?.sellerId!, token));
  }

  useEffect(() => {
    load();
  }, [marketItem]);

  return (
    <div>
      {user && (
        <Body user={user} marketplace>
          {marketItem && (
            <div className={styles.itemcontent}>
              <h1>Detalhes do Item</h1>
              <img
                src={marketItem.image || "/itemnoimage.png"}
                alt="Market Item image"
                className={styles.marketitemimg}
              />
              <div className={styles.iteminfo}>
                <h2>{marketItem.name}</h2>
                <p className={styles.description}>{marketItem.description}</p>
                <span>{`R$ ${marketItem.price}`}</span>
                {!marketItem.vendido ? (
                  <>
                    <p className={styles.naovendido}>Ainda não vendido</p>
                    <Button text={"Comprar item"} type={"button"} width={163} />
                  </>
                ) : (
                  <p className={styles.vendido}>vendido</p>
                )}
                <h2>Vendedor</h2>
                <div className={styles.seller}>
                  <img
                    src={seller?.image || "/noprofile.jpg"}
                    alt="Seller"
                    className={styles.sellerimg}
                  />
                  <div className={styles.sellerinfo}>
                    <p>{seller?.name}</p>
                    <div className={styles.sellertime}>
                      <img src="/icons/clock.svg" alt="" />
                      <span>57 minutos atrás</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!marketItem && <Load />}
        </Body>
      )}
      {!user && <Load />}
    </div>
  );
}
