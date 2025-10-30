"use client";

import { motion } from "framer-motion";
import styles from "./MediaSection.module.css";
import { useLocalization } from "@/context/LocalizationContext";
import parse from "html-react-parser";
import { useMemo } from "react";

interface PartnerItem {
    name: string;
    logo: string;
}

interface MediaSectionType {
    mediaTitle: string;
    media: PartnerItem[];
}

export default function MediaSection() {
    const { translations } = useLocalization();
    const section = translations.mediaSection as unknown as MediaSectionType;

    const mediaDelays = useMemo(
        () => section.media.map(() => Math.random() * 0.5),
        [section.media]
    );

    return (
        <section className={styles.mediaSection}>
            <div className={styles.container}>
                <div className={styles.mediaBlock}>
                    <motion.h1
                        className="title"
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        {parse(section.mediaTitle)}
                    </motion.h1>

                    <div className={styles.mediaGrid}>
                        {section.media.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                className={styles.mediaCard}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{ duration: 0.3, delay: mediaDelays[idx] }}
                            >
                                <div className={styles.logoWrapper}>
                                    <img src={item.logo} alt={item.name} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}