"use client";

import { motion } from "framer-motion";
import styles from "./AirdropBanner.module.css";
import Image from "next/image";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";

export default function AirdropBanner() {
    const { t } = useLocalization();

    return (
        <motion.section
            className={styles.airdropBanner}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className={styles.leftSection}>
                <h2 className={styles.title}>
                    {parse(t("banerTitle"))}
                </h2>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.rightArt} aria-hidden>
                    <Image
                        src="/images/banners/airdrop_right.png"
                        alt=""
                        width={1600}
                        height={1200}
                        priority={false}
                        unoptimized
                    />
                </div>

                <div className={styles.rightOverlay} aria-hidden>
                    <Image
                        src="/images/banners/airdrop_right_overlay.png"
                        alt=""
                        width={1600}
                        height={1200}
                        priority={false}
                        unoptimized
                    />
                </div>

                {/* Coins: scale via --coin-scale */}
                <motion.div
                    className={`${styles.coin} ${styles.coin1}`}
                    style={{ ["--coin-scale" as any]: 1.8, ["--coin-size" as any]: "100px" }}
                >
                    <div className={styles.coinInner}>
                        <Image
                            src="/images/banners/coin1.png"
                            alt="FSQN Coin"
                            fill
                            unoptimized
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className={`${styles.coin} ${styles.coin2}`}
                    style={{ ["--coin-scale" as any]: 1, ["--coin-size" as any]: "100px" }}
                >
                    <div className={styles.coinInner}>
                        <Image
                            src="/images/banners/coin2.png"
                            alt="FSQN Coin"
                            fill
                            unoptimized
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className={`${styles.coin} ${styles.coin3}`}
                    style={{ ["--coin-scale" as any]: 1.4, ["--coin-size" as any]: "110px" }}
                >
                    <div className={styles.coinInner}>
                        <Image
                            src="/images/banners/coin3.png"
                            alt="FSQN Coin"
                            fill
                            unoptimized
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
