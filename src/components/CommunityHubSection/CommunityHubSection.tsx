"use client";

import { motion } from "framer-motion";
import styles from "./CommunityHubSection.module.css";
import { useLocalization } from "@/context/LocalizationContext";
import parse from "html-react-parser";

interface HubFeature {
    title: string;
    description: string;
    icon: string;
}

interface CommunityHubSectionType {
    title: string;
    subtitle: string;
    features: HubFeature[];
}

export default function CommunityHubSection() {
    const { translations } = useLocalization();

    const section =
        ((translations as any).communityHubSection as CommunityHubSectionType) ?? {
            title: "Fasqon <span>Community Hub</span>",
            subtitle: "Complete Missions. Earn FSQN. Grow the Bank",
            features: [],
        };

    const features = Array.isArray(section.features) ? section.features : [];

    return (
        <section className={styles.section}>
            <div className={styles.bgWrapper}>
                <motion.img
                    src="/images/communityhub/bg.png"
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
                    initial={{ y: -30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="title">{parse(section.title)}</h1>
                    <p className="subtitle">{section.subtitle}</p>
                </motion.div>

                <motion.div
                    className={styles.phoneWrapper}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src="/images/communityhub/phone.png"
                        alt="Community Hub App"
                        className={styles.phoneImage}
                    />
                </motion.div>

                <div className={styles.contentWrapper}>
                    <motion.div
                        className={styles.grid}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ staggerChildren: 0.15, duration: 0.4 }}
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className={styles.featureItem}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.iconHeader}>
                                    <img
                                        src={feature.icon}
                                        alt=""
                                        className={styles.featureIcon}
                                    />
                                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                                </div>
                                <div className={styles.featureDescWrapper}>
                                    <p className={styles.featureDescription}>
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
