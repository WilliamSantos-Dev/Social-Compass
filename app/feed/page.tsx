"use client";
import { useEffect, useState } from "react";
import Body from "../components/Body/Body";
import List from "../components/List/List";
import NewPost from "../components/NewPost/NewPost";
import Post from "../components/Post/Post";
import api from "../util/api";
import styles from "./page.module.scss";
import { MarketItem, Post as PostType, User } from "../util/models";

import Load from "../components/Load/load";
import { useAuth } from "../Contexts/AuthContext";

export default function Feed() {
  const auth = useAuth();
  const [listPost, setListPost] = useState<PostType[]>([]);
  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);
  const [listFriends, setListFriends] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const Auth = useAuth()

  async function load() {
    const id = localStorage.getItem("id") as string
    const token  = localStorage.getItem("token") as string
    if(!id || !token){
      Auth.logout()
    }
    setUser(await api.getUser(id, token));
    setListPost(await api.getPosts(token));
    setMarketItems(await api.getMarketItems(token));
    setListFriends(await api.getAllUsers(token));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      {user && (
        <Body user={user} feed>
          <div className={styles.feed}>
            <div className={styles.content}>
              <NewPost userimage={user.image} />
              {listPost.map((item) => (
                <Post post={item} user={user} key={item.id} />
              ))}
            </div>
            <div className={styles.topics}>
              <List friends={listFriends} listName="Meus Amigos" />
              <List marketItems={marketItems} listName="Itens em Destaque" />
            </div>
          </div>
        </Body>
      )}
      {!user && <Load/>}
    </>
  );
}
