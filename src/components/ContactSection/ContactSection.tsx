"use client";

import { motion } from "framer-motion";
import styles from "./ContactSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

const SOCIALS = [
    { name: 'X', url: 'https://x.com/fasqon', icon: '/images/contact/icons/x.svg' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/fasqon-official/', icon: '/images/contact/icons/linkedin.svg' },
    { name: 'Telegram', url: 'https://t.me/fasqonofficial', icon: '/images/contact/icons/telegram.svg' },
    { name: 'Discord', url: 'https://discord.gg/fasqon', icon: '/images/contact/icons/discord.svg' },
    { name: 'Instagram', url: 'https://www.instagram.com/fasqon_official/', icon: '/images/contact/icons/instagram.svg' },
];

export default function ContactSection() {
    const { t } = useLocalization();

    return (
        <section className={styles.contactSection}>
            <div className={styles.contentWrapper}>
                <motion.div
                    className={styles.inner}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.leftContent}>
                        <div className={styles.brand}>
                            <img
                                src="/images/contact/fasqon.png"
                                alt="Fasqon"
                                className={styles.brandIcon}
                            />
                        </div>

                        <p className={styles.tagline}>{parse(t("contactSection.tagline"))}</p>
                        <p className={styles.followText}>{parse(t("contactSection.followText"))}</p>

                        <div className={styles.socials}>
                            {SOCIALS.map(s => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.name}
                                    className={styles.socialLink}
                                >
                                    <img src={s.icon} alt={s.name} className={styles.socialIcon} />
                                </a>
                            ))}
                        </div>

                        <a
                            href={t("contactSection.ctaLink")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaButton}
                        >
                            {t("contactSection.ctaText")}
                        </a>
                    </div>

                    <div className={styles.rightContent}>
                        <img src="/images/contact/idCard.png" alt="ID Card" />
                    </div>
                </motion.div>

                <div className={styles.supportBarWrapper}>
                    <div className={styles.supportBar}>
                        <span className={styles.supportPrompt}>{parse(t("contactSection.supportPrompt"))}</span>
                        <a href={`mailto:${t("contactSection.supportEmail")}`} className={styles.supportEmail}>
                            <img src="/icons/mail.svg" alt="Mail"/>
                            {t("contactSection.supportEmail")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
