"use client";

import { motion } from "framer-motion";
import styles from "./WhyFasqonSection.module.css";
import { useLocalization } from "@/context/LocalizationContext";
import parse from "html-react-parser";

export default function whyFasqonSection() {
    const { t } = useLocalization();

    return (
        <section className={styles.whySection}>
            <motion.h1
                className={`title ${styles.titleExtended}`}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {parse(t("whyFasqonSection.title"))}
                <img
                    src="/images/contact/fasqon.png"
                    alt="Fasqon"
                    className={styles.inlineLogo}
                />
                ?
            </motion.h1>

            <div className={styles.inner}>
                <motion.div
                    className={styles.imagesWrapper}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className={styles.phoneContainer}>
                        <img
                            src="/images/phone1_2.png"
                            alt="Fasqon Wallet phone 1"
                            width={355}
                            height={588}
                            className={styles.phoneLeft}
                        />
                        <img
                            src="/images/phone2_2.png"
                            alt="Fasqon Wallet phone 2"
                            width={374}
                            height={563}
                            className={styles.phoneRight}
                        />
                    </div>

                    <div className={styles.crystalsWrapper}>
                        <img
                            src="/images/shape.png"
                            alt="Shapes"
                            width={800}
                            height={800}
                            className={styles.crystalsImage}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className={styles.content}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h3 className="subtitle">
                        {parse(t("whyFasqonSection.subtitle"))}
                    </h3>
                    <div className={styles.description}>
                        {parse(t("whyFasqonSection.description"))}
                    </div>
                    <div className={styles.descriptionShort}>
                        {parse(t("whyFasqonSection.descriptionShort"))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
