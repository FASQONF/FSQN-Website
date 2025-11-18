"use client";

import { motion } from "framer-motion";
import styles from "./AdvisorsSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

interface Advisor {
    name: string;
    role: string;
    photo: string;
    companyLogo: string;
}

interface AdvisorsSectionType {
    title: string;
    advisors: Advisor[];
}

export default function AdvisorsSection() {
    const { translations } = useLocalization();

    const section = (translations.advisorsSection as unknown) as AdvisorsSectionType;

    if (!section) return null;

    const advisors = Array.isArray(section.advisors) ? section.advisors : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <section className={styles.section}>
            <div className={styles.bgWrapper}>
                <motion.img
                    src="/images/advisors/bg.png"
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
                    <h1 className="title">{parse(section.title)}</h1>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {advisors.map((advisor, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            variants={itemVariants}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={advisor.photo}
                                    alt={advisor.name}
                                    className={styles.avatar}
                                />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.name}>{advisor.name}</h3>
                                <p className={styles.role}>{parse(advisor.role)}</p>
                                {advisor.companyLogo && (
                                    <img
                                        src={advisor.companyLogo}
                                        alt="Company Logo"
                                        className={styles.companyLogo}
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}