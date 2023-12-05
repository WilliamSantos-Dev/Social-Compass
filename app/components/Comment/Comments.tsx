import { useState } from 'react';
import { Comment as CommentType } from "../../util/models";
import { motion, AnimatePresence } from "framer-motion";
import CommentComponent from "./Comment";
import styles from "./Comment.module.scss";

export default function Comments({ comments }: { comments: CommentType[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const visibleComments = isExpanded ? comments : [comments[0]];

  return (
    <div className={styles.container}>
      <p>Todos os comentários:</p>
      <AnimatePresence>
        {visibleComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CommentComponent comment={comment} />
          </motion.div>
        ))}
      </AnimatePresence>
      {comments.length > 1 && (
        <div className={styles.vertodos} onClick={handleToggleExpand}>
          <hr className={styles.line} />
          <p className={styles.allcomments}>
            {isExpanded ? 'Esconder os comentários' : 'Ver todos os comentários'}
          </p>
        </div>
      )}
    </div>
  );
}
