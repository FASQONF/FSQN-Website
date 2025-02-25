"use client";

import styles from "./TokenUtilitySection.module.css";

export default function TokenUtilitySection() {
  return (
    <section className={styles.tokenUtilitySection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Token <span>Utility</span>
        </h2>

        {/* Две колонки с описанием (2 абзаца в каждой) */}
        <div className={styles.descRow}>
          <div className={styles.descCol}>
            <p>
              Access the enhanced features of our messenger/ wallet by maintaining
              a certain token balance.
            </p>
            <p>
              Receive discounts on commissions and service fees by using FSQN
              tokens for payments.
            </p>
          </div>
          <div className={styles.descCol}>
            <p>
              Benefit from our daily buyback strategy, with 25% of profits used to
              purchase and burn tokens.
            </p>
            <p>
              Explore trading opportunities within our platform for potential gains.
            </p>
          </div>
        </div>

        {/* Сетка карточек (8 штук) */}
        <div className={styles.cardsGrid}>
            <div className={styles.firstLine}>
                <div className={styles.card}>Get Card</div>
                <div className={styles.card}>Payments</div>
                <div className={styles.card}>Internal Trxs</div>
                <div className={styles.card}>Passive income mode</div>
            </div>
            <div className={styles.secondLine}>
                <div className={styles.card}>Treasury</div>
            </div>
            <div className={styles.thirdLine}>
                <div className={styles.card}>40% Ecosystem growth</div>
                <div className={styles.card}>50% User incentives</div>
                <div className={styles.card}>10% Monthly Burn</div>
            </div>
        </div>
      </div>
    </section>
  );
}
