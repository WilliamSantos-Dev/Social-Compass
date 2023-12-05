import { useEffect, useState, useCallback, useRef } from "react";
import api from "../../util/api";
import { Post as PostType, User } from "../../util/models";
import styles from "./Profile.module.scss";
import Post from "../Post/Post";
import About from "./about";
import UserHeader from "./userHeader";
import EditProfile from "./EditProfile";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../Contexts/AuthContext";

interface Props {
  user: User;
  myprofile?: boolean;
  posts?: PostType[];
}

export default function Profile(props: Props) {
  const user = props.user;
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth()

  async function load() {
    const token = auth.token
    if (token) {
      const listPosts = await api.getPosts(token);
      setPosts(listPosts.filter((post) => post.author.id === props.user.id));
    }
  }
  const handleEditProfileClick = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
  };

  const handleOutsideClick = useCallback(
    (event: any) => {
      if (
        isEditProfileOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleEditProfileClose();
      }
    },
    [isEditProfileOpen]
  );
  const handleEscapeKey = useCallback(
    (event: any) => {
      if (isEditProfileOpen && event.key === "Escape") {
        handleEditProfileClose();
      }
    },
    [isEditProfileOpen]
  );

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  useEffect(() => {
    load();
    if (isEditProfileOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditProfileOpen, handleOutsideClick, handleEscapeKey]);

  return (
    <div className={styles.container}>
      <UserHeader
        user={user}
        myProfile={props.myprofile}
        onEditClick={handleEditProfileClick}
      />
      <div className={styles.maincontent}>
        <About user={user} />
        <div className={styles.feed}>
          <div className={styles.options}>
            <p>Followers</p> <p>Following</p>
            <p>
              <span>Posts</span>
            </p>
          </div>
          <hr />
          <div className={styles.posts}>
            {posts.map((item) => (
              <Post post={item} user={user} key={item.id} />
            ))}
          </div>
          <AnimatePresence>
            {isEditProfileOpen && (
              <motion.div
                key="editProfile"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className={styles.modalBackdrop}
              >
                <motion.div
                  key="editProfileContent"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className={styles.editProfilePopup}
                  ref={modalRef}
                >
                  <EditProfile user={user} onClose={handleEditProfileClose} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
