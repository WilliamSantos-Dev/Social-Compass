"use client";
import { ReactNode, useState, useEffect } from "react";
import { User } from "../../util/models";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import styles from "./Body.module.scss";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: ReactNode;
  user: User;
  feed?: boolean;
  myprofile?: boolean;
  marketplace?: boolean;
}

export default function Body(props: Props) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [durationMotion, setDurationMotion] = useState(0);
  var stylerHeader = styles.fixedMenuOpenHeader;
  var stylechildren = styles.childrenMenuOpen;

  useEffect(() => {
    setDurationMotion(0.3)
  }, []);
  
  const updateMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  if (!menuOpen) {
    stylerHeader = styles.fixedMenuClose;
    stylechildren = styles.children;
  }

  return (
    <div className={styles.maincontent}>
      <div className={styles.menu}>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: durationMotion }}
            >
              <div className={styles.menucontent}>
                <Menu
                  marketplace={props.marketplace}
                  myprofile={props.myprofile}
                  feed={props.feed}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.childrencontainer}>
        <div className={stylerHeader}>
          <Header
            userimage={props.user.image}
            username={props.user.name}
            menuOpen={menuOpen}
            updateMenu={updateMenu}
          />
        </div>
        <div className={stylechildren}>{props.children}</div>
      </div>
    </div>
  );
}
