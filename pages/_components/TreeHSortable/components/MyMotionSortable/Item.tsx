import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import React from "react";
import styles from "./Item.module.css";
import { Handle } from "./components";

const baseStyles: React.CSSProperties = {
  position: "relative",
  width: 140,
  height: 140,
};
const initialStyles = {
  x: 0,
  y: 0,
  scale: 1,
};

export function Item({ id }) {
  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useSortable({
      id,
      transition: null,
    });

  return (
    <motion.div
      className={styles.Item}
      style={baseStyles}
      ref={setNodeRef}
      tabIndex={0}
      layoutId={id}
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
              boxShadow: isDragging
                ? "0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
                : undefined,
            }
          : initialStyles
      }
      transition={{
        duration: !isDragging ? 0.25 : 0,
        easings: {
          type: "spring",
        },
        scale: {
          duration: 0.25,
        },
        zIndex: {
          delay: isDragging ? 0 : 0.25,
        },
      }}
      {...attributes}
    >
      {id}
      <span className={styles.Actions}>
        <Handle active={{ background: "green", fill: "red" }} {...listeners} />
      </span>
    </motion.div>
  );
}
