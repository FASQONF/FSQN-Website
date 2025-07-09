"use client";

import { motion } from "framer-motion";
import styles from "./StoreToEarn.module.css";

export function AnimatedLineMobile() {
  return (
    <motion.svg
      className={styles.animatedLine}
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="
          M100,10
          L300,10
          L300,600
          L100,600
          L100,0
          L100,10
          Z
        "
        stroke="#00ff00"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 1"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: [
            0, 0.125, 0.125, 0.25, 0.25, 0.375, 0.375, 0.5,
            0.5, 0.625, 0.625, 0.75, 0.75, 0.875, 0.875, 1, 1
          ],
        }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          times: [
            0.0, 0.1, 0.13,
            0.23, 0.26,
            0.36, 0.39,
            0.49, 0.52,
            0.62, 0.65,
            0.75, 0.78,
            0.88, 0.91,
            0.98, 1.0
          ],
        }}
      />
    </motion.svg>
  );
}
