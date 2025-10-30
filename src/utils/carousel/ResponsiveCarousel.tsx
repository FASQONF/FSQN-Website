"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import styles from "./ResponsiveCarousel.module.css";
import { useMediaQuery } from "react-responsive";
import { ChevronLeft, ChevronRight } from "lucide-react";


type EnableOn = "off" | "mobile" | "desktop" | "all";

interface ResponsiveCarouselProps {
    children: React.ReactNode;
    enableOn?: EnableOn;
    breakpointPx?: number;
    loop?: boolean;
    align?: EmblaOptionsType["align"];
    slidesToScroll?: number;
    className?: string;
    showArrows?: boolean;
}

export default function ResponsiveCarousel({
    children,
    enableOn = "mobile",
    breakpointPx = 768,
    loop = false,
    align = "center",
    slidesToScroll = 1,
    className,
    showArrows = true,
}: ResponsiveCarouselProps) {
    const isMobile = useMediaQuery({ query: `(max-width: ${breakpointPx}px)` });

    const carouselEnabled = useMemo(() => {
        if (enableOn === "off") return false;
        if (enableOn === "all") return true;
        if (enableOn === "mobile") return isMobile;
        if (enableOn === "desktop") return !isMobile;
        return false;
    }, [enableOn, isMobile]);

    const emblaOptions: EmblaOptionsType = {
        loop,
        align: align,
        dragFree: false,
        slidesToScroll,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(carouselEnabled ? emblaOptions : undefined);
    const viewportRef = useRef<HTMLDivElement | null>(null);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!carouselEnabled) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") scrollPrev();
            if (e.key === "ArrowRight") scrollNext();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [carouselEnabled, scrollPrev, scrollNext]);

    if (!carouselEnabled) {
        return (
            <div className={className}>
                <div className={styles.staticContainer}>{children}</div>
            </div>
        );
    }

    return (
        <div className={`${styles.embla} ${className || ""}`}>
            <div
                className={styles.embla__viewport}
                ref={(node) => {
                    emblaRef(node);
                    viewportRef.current = node;
                }}
                aria-roledescription="carousel"
            >
                <div className={styles.embla__container} role="list">
                    {React.Children.map(children, (child, idx) => (
                        <div className={styles.embla__slide} role="listitem" aria-label={`Slide ${idx + 1}`}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && (
                <>
                    <button
                        type="button"
                        className={`${styles.embla__button} ${styles["embla__button--prev"]}`}
                        aria-label="Previous slide"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        className={`${styles.embla__button} ${styles["embla__button--next"]}`}
                        aria-label="Next slide"
                        onClick={scrollNext}
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}
        </div>
    );
}
