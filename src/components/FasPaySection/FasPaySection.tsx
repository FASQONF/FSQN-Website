"use client";

import { motion } from "framer-motion";
import styles from "./FasPaySection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

interface FasPayItem {
    title: string;
    description: string;
    icon: string;
}

interface FasPaySectionType {
    title: string;
    badgeImage?: string;
    items: FasPayItem[];
}

export default function FasPaySection() {
    const { t, translations } = useLocalization();

    const section = ((translations as any).fasPaySection as FasPaySectionType) ?? {
        title: "FasPay - <span>Instant Payments</span>",
        items: []
    };

    const items = Array.isArray(section.items) ? section.items : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <section className={styles.fasPaySection}>
            <div className={styles.bgWrapper}>
                <img
                    src="/images/faspay/bg.png"
                    alt="Background"
                    className={styles.bgImage}
                />
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Title */}
                    <h1 className="title">
                        {parse(section.title)}
                    </h1>

                    {/* Badge */}
                    <div className={styles.badgeWrapper}>
                        <img
                            src={section.badgeImage || "/images/faspay/badge.png"}
                            alt="FasPay Badge"
                            className={styles.badge}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            variants={itemVariants}
                        >
                            <div className={styles.iconWrapper}>
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    className={styles.cardIcon}
                                    width={80}
                                    height={80}
                                />
                            </div>
                            <h3 className={styles.cardTitle}>{parse(item.title)}</h3>
                            <p className={styles.cardDescription}>{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className={styles.cylinderWrapper}
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <img
                            src="/images/faspay/cylinder.png"
                            alt=""
                            className={styles.cylinderImage}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}