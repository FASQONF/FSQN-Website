"use client";

import { motion } from "framer-motion";
import styles from "./CommonBackground.module.css";
import bg from '../../../../public/images/tokenomics/bg-common.png'
export default function CommonBackground() {
  return (
    <motion.div
      className={styles.background}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.div
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatDelay: 5 }}
      >
        <img
          src={bg.src}
          alt="Common Background"
          width={1800}
          height={1800}
        />
      </motion.div>
    </motion.div>
  );
}
