"use client";

import { motion } from "framer-motion";
import styles from "./MonetizationStreams.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

interface StreamItem {
    title: string;
    category: string;
    items: string[];
}

interface MonetizationStreamsSectionType {
    title: string;
    subtitle: string;
    description: string;
    cards: StreamItem[];
}

export default function MonetizationStreams() {
    const { translations } = useLocalization();

    const section = (translations.monetizationStreamsSection as unknown) as MonetizationStreamsSectionType;

    if (!section) return null;

    const cards = Array.isArray(section.cards) ? section.cards : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <section className={styles.section}>
            <div className={styles.bgWrapper}>
                <motion.img
                    src="/images/monitizations_streams_bg.png"
                    alt="Background"
                    className={styles.bgImage}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="title">{section.title ? parse(section.title) : ""}</h1>
                    <h2 className="subtitle">{section.subtitle}</h2>
                    <p className={styles.description}>{section.description}</p>
                </motion.div>

                <motion.div
                    className={styles.cardsContainer}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            variants={cardVariants}
                        >
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <span className={styles.cardCategory}>{card.category}</span>
                            <ul className={styles.list}>
                                {Array.isArray(card.items) && card.items.map((item, i) => (
                                    <li key={i} className={styles.listItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}