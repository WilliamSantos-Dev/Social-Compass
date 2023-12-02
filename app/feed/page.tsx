import Body from "../components/Body/Body";
import Header from "../components/Header/Header";
import List from "../components/List/List";
import Menu from "../components/Menu/Menu";
import NewPost from "../components/NewPost/NewPost";
import Post from "../components/Post/Post";
import api from "../util/api";
import styles from "./page.module.scss";

export default function Feed() {
  const user = api.testAutor();
  const post = api.testePost();
  const marketItems = api.testeMarket();
  const listPost = [post, post, post, post];
  return (
    <Body user={user}>
      <div className={styles.feed}>
        <div className={styles.content}>
          <NewPost userimage={user.image} />
          <Post post={post} />
          {listPost.map((item) => (
            <Post post={item} key={item.id} />
          ))}
        </div>
        <div className={styles.topics}>
          <List marketItems={marketItems} listName="Market Items" />
          <List marketItems={marketItems} listName="Market Items" />
        </div>
      </div>
    </Body>
  );
}
