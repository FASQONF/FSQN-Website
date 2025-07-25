"use client";
import { motion } from "framer-motion";
import styles from "./MiniApp.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

interface Feature {
    icon: string;
    title: string;
    description: string;
    altDescription: string;
}

interface MiniAppSectionTranslations {
    title: string;
    subtitle: string;
    features: Feature[];
    ctaText: string;
    ctaButtonText: string;
    ctaButtonLink: string;
}

export default function MiniAppSection() {
    const { t, translations } = useLocalization();
    const section = ((translations as any).miniAppSection as MiniAppSectionTranslations)
        ?? {
        title: '',
        subtitle: '',
        features: [],
        ctaText: '',
        ctaButtonText: '',
        ctaButtonLink: '#'
    };

    const features = Array.isArray(section.features) ? section.features : [];

    return (
        <section className={styles.miniAppSection}>
            {/* Header: now outside contentWrapper */}
            <motion.div
                className={styles.header}
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
            >
                <h2 className={styles.title}>{parse(t("miniAppSection.title"))}</h2>
                <p className={styles.subtitle}>{t("miniAppSection.subtitle")}</p>
                {/* Mobile phone image */}
                <div className={`${styles.phoneContainer} ${styles.phoneContainerMobile}`}>
                    <img
                        src="/images/miniapp/phone-mockup.png"
                        alt="Mini App Mockup"
                        className={styles.phoneFrame}
                        width={355}
                        height={716}
                    />
                </div>
            </motion.div>

            <div className={styles.contentWrapper}>
                <div className={styles.leftContent}>
                    {/* Features */}
                    <motion.div
                        className={styles.featureGrid}
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {features.map((feature, idx) => (
                            <div key={idx} className={styles.featureItem}>
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className={styles.featureIcon}
                                    width={60}
                                    height={60}
                                />
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                                <p className={styles.featureDescriptionMobile}>{feature.altDescription}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        className={styles.ctaSection}
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <p className={styles.ctaText}>{parse(t("miniAppSection.ctaText"))}</p>
                        <a
                            href={t("miniAppSection.ctaButtonLink")}
                            target="_blank"
                            className={styles.ctaButton}
                        >
                            {t("miniAppSection.ctaButtonText")}
                        </a>
                    </motion.div>
                </div>

                <div className={styles.rightContent}>
                    <motion.div
                        className={styles.phoneContainer}
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src="/images/miniapp/phone-mockup.png"
                            alt="Mini App Mockup"
                            className={styles.phoneFrame}
                            width={355}
                            height={716}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}