"use client";

import { motion } from "framer-motion";
import styles from "./ContactSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

export const SOCIALS = [
    { name: 'X', url: 'https://x.com/fasqon', icon: '/images/contact/icons/x.svg' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/fasqon-official/', icon: '/images/contact/icons/linkedin.svg' },
    { name: 'Telegram', url: 'https://t.me/fasqonofficial', icon: '/images/contact/icons/telegram.svg' },
    { name: 'Telegram Chat', url: 'https://t.me/fasqonchat', icon: '/images/contact/icons/telegram-chat.svg' },
    { name: 'Discord', url: 'https://discord.com/invite/53Kg3d7nbq', icon: '/images/contact/icons/discord.svg' },
    { name: 'Instagram', url: 'https://www.instagram.com/fasqon_official/', icon: '/images/contact/icons/instagram.svg' },
    { name: 'CoinMarketCap', url: 'https://coinmarketcap.com/community/profile/Fasqon/', icon: '/images/contact/icons/coinmarketcap.svg' },
];

export const LINKS = [
    { name: 'fasqon.com', url: 'https://fasqon.com' },
    { name: 'leaderboard.fasqon.com', url: 'https://leaderboard.fasqon.com' },
    { name: 'tokensale.fasqon.com', url: 'https://tokensale.fasqon.com' },
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

                        <div className={styles.linkList}>
                            {LINKS.map(link => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.linkItem}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

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
                    </div>

                    <div className={styles.rightContent}>
                        <img src="/images/contact/idCard.png" alt="ID Card" />
                    </div>
                </motion.div>

                <div className={styles.supportBarWrapper}>
                    <div className={styles.supportBar}>
                        <span className={styles.supportPrompt}>{parse(t("contactSection.supportPrompt"))}</span>
                        <a href={`mailto:${t("contactSection.supportEmail")}`} className={styles.supportEmail}>
                            <img src="/icons/mail.svg" alt="Mail" />
                            {t("contactSection.supportEmail")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
