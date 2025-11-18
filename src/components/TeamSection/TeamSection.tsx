"use client";

import { motion } from "framer-motion";
import styles from "./TeamSection.module.css";
import { useLocalization } from '@/context/LocalizationContext';
import parse from "html-react-parser";
import { useMemo, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ResponsiveCarousel from "../../utils/carousel/ResponsiveCarousel";

interface TeamMember {
  name: string;
  role: string;
  country: string;
  flag: string;
  image: string;
  mobileImage: string;
  description: string;
  linkedin: string;
}

interface Partner {
  title: string;
  subtitle: string;
  description: string;
  logo: string;
  href?: string;
}

interface TeamSectionType {
  title: string;
  subtitle: string;
  members: TeamMember[];
  partners: Partner[];
}

export default function TeamSection() {
  const { translations } = useLocalization();
  const section = (translations.teamSection as unknown) as TeamSectionType;

  const isMobileQuery = useMediaQuery({ query: "(max-width: 768px)" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const desiredOrder = ["KindGeek", "The Gradient", "Vareger"];
  const orderedPartners = useMemo(() => {
    const orderIndex = (name: string) => {
      const i = desiredOrder.findIndex(n => n.toLowerCase() === name.toLowerCase());
      return i === -1 ? Number.POSITIVE_INFINITY : i;
    };
    return [...(section.partners || [])].sort(
      (a, b) => orderIndex(a.title) - orderIndex(b.title)
    );
  }, [section.partners]);

  const staticMembers = isMobile ? section.members.slice(0, 6) : section.members;
  const carouselMembers = isMobile ? section.members.slice(6) : [];

  const renderMemberCard = (member: TeamMember, index: number, isCarouselItem: boolean = false) => {
    const delay = isCarouselItem ? 0 : index * 0.1;

    if (isCarouselItem) {
      return (
        <div className={styles.carouselCard} key={member.name}>
          <div className={styles.carouselCardTop}>
            <div className={styles.avatarWrapper}>
              <picture>
                <source media="(max-width: 768px)" srcSet={member.mobileImage} />
                <source media="(min-width: 769px)" srcSet={member.image} />
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.carouselAvatar}
                />
              </picture>
            </div>

            <div className={styles.carouselMeta}>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>

              <div className={styles.carouselCountryBlock}>
                <img
                  src={member.flag}
                  alt={member.country}
                  width={20}
                  height={14}
                  className={styles.flag}
                />
                <span className={styles.countryName}>{member.country}</span>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinLink}
                    style={{ marginLeft: '10px' }}
                  >
                    <img
                      className={styles.linkedinIcon}
                      src="/icons/linkedin.svg"
                      alt="LinkedIn"
                      width={18}
                      height={18}
                    />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={styles.carouselDescBlock}>
            <p className={styles.description}>{member.description}</p>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        key={member.name}
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        <div className={styles.avatarWrapper}>
          <picture>
            <source media="(max-width: 768px)" srcSet={member.mobileImage} />
            <source media="(min-width: 769px)" srcSet={member.image} />
            <img
              src={member.image}
              alt={member.name}
              width={150}
              height={150}
              className={styles.avatar}
            />
          </picture>
        </div>
        <div className={styles.cardInfo}>
          <h3 className={styles.memberName}>{member.name}</h3>
          <p className={styles.memberRole}>{member.role}</p>
          <p className={styles.description}>{member.description}</p>
          <div className={styles.bottomRow}>
            <div className={styles.countryBlock}>
              <img
                src={member.flag}
                alt={member.country}
                width={24}
                height={16}
                className={styles.flag}
              />
              <span className={styles.countryName}>{member.country}</span>
            </div>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinLink}
              >
                <img
                  className={styles.linkedinIcon}
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={21}
                  height={21}
                />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="title">{parse(section.title)}</h1>
        </motion.div>

        <div className={styles.grid}>
          {staticMembers.map((member, index) => renderMemberCard(member, index))}
        </div>

        {isMobile && carouselMembers.length > 0 && (
          <div className={styles.teamCarouselWrapper}>
            <ResponsiveCarousel
              enableOn="all"
              showArrows={true}
              loop={false}
              hideNonActiveSlides={true}
              showIndicators={true}
            >
              {carouselMembers.map((member, index) =>
                renderMemberCard(member, index, true)
              )}
            </ResponsiveCarousel>
          </div>
        )}

        <img className={styles.line} src="/icons/line.png" alt="" />

        <motion.div
          className={styles.partnersGrid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {orderedPartners.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.partnerCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.logoAvatarWrapper}>
                <img
                  src={p.logo}
                  alt={p.title}
                  className={styles.logoAvatar}
                  width={150}
                  height={150}
                />
              </div>
              <div className={styles.partnerInfo}>
                <h3 className={styles.partnerName}>{p.title}</h3>
                <p className={styles.partnerRole}>{p.subtitle}</p>
                <p className={styles.partnerDesc}>{p.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}