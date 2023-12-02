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

  return (
    <div className={styles.maincontent}>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.2 }}
          >
            <Menu />
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <Header userimage={user.image} username={user.name} menuOpen={menuOpen} updateMenu={updateMenu} />
        {children}
      </div>
    </div>
  );
}
