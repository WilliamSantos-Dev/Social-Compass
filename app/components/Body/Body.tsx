"use client";
import { ReactNode, useState } from "react";
import { User } from "../../util/models";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import styles from "./Body.module.scss";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: ReactNode;
  user: User;
}

export default function Body({ children, user }: Props) {
  const [menuOpen, setMenuOpen] = useState(true);

  const updateMenu = () => {
    setMenuOpen(!menuOpen);
  };

  var stylerHeader = styles.fixedMenuOpenHeader;
  var stylechildren = styles.childrenMenuOpen;

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
              transition={{ duration: 0.15 }}
            >
              <div className={styles.menucontent}>
                <Menu />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.childrencontainer}>
        <div className={stylerHeader}>
          <Header
            userimage={user.image}
            username={user.name}
            menuOpen={menuOpen}
            updateMenu={updateMenu}
          />
        </div>
        <div className={stylechildren}>{children}</div>
      </div>
    </div>
  );
}
