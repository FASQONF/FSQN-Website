"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useLocalization } from '@/context/LocalizationContext';
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatedLineDesktop } from "./AnimatedLineDesktop";
import { AnimatedLineMobile } from "./AnimatedLineMobile";
import styles from "./StoreToEarn.module.css";
import parse from "html-react-parser";

interface StoreToEarnSection {
  title: string;
  description: string;
  items: {
    icon: string;
    label: string;
  }[];
}

export function useWindowWidth() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function StoreToEarnComponent() {
  const width = useWindowWidth();
  const isMobile = width < 1024;
  const { t, translations } = useLocalization();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = searchParams.get("lang") || "en";

  const section = ((translations as any).storeToEarn ?? {}) as StoreToEarnSection;
  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <section className={styles.storeSection} key={pathname + locale}>
      {/* Background image */}
      <motion.div
        className={styles.bgImage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 1 } } }}
      >
        <img
          src="/images/chain.png"
          alt="Chain background"
          className={styles.chainImage}
        />
      </motion.div>

      {/* Content (title and description) */}
      <motion.div
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}
      >
        <h2 className={styles.title}>{parse(t("storeToEarn.title"))}</h2>
        <p className={styles.description}>{parse(t("storeToEarn.description"))}</p>
      </motion.div>

      {/* Wrapper for cards and animated line */}
      <div className={styles.cardsWrapper}>
        {/* Animated line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={styles.animatedLineWrapper}
        >
          {isMobile ? <AnimatedLineMobile /> : <AnimatedLineDesktop />}
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { staggerChildren: 0.1, duration: 0.8 } } }}
        >
          {items.map((item: any) => (
            <motion.div key={item.label} className={styles.card} variants={{ hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <Image
                src={item.icon}
                alt={item.label}
                width={40}
                height={40}
                className={styles.icon}
              />
              <p className={styles.cardLabel}>{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
export default function StoreToEarn() {
  return (
    <Suspense fallback={null}>
      <StoreToEarnComponent />
    </Suspense>
  );
}