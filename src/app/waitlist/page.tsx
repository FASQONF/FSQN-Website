"use client";

import styles from "./page.module.css";
import Header from "./components/Header/Header";

import WaitlistSection from "./components/WaitlistSection/WaitlistSection";

export default function WaitlistPage() {
    return (
        <div className={styles.page}>
            <Header />
            <WaitlistSection />
        </div>
    );
}
