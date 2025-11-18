"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./ResponsiveCarousel.module.css";
import { useMediaQuery } from "react-responsive";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EnableOn = "off" | "mobile" | "desktop" | "all";
type CarouselAlign = "start" | "center" | "end" | number;
type CSSVariableStyles = React.CSSProperties & Record<`--${string}`, string>;

interface ResponsiveCarouselProps {
    children: React.ReactNode;
    enableOn?: EnableOn;
    breakpointPx?: number;
    loop?: boolean;
    align?: CarouselAlign;
    slidesToScroll?: number;
    className?: string;
    showArrows?: boolean;
    sidePadding?: number | string;
    hideNonActiveSlides?: boolean;
    showIndicators?: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const mod = (value: number, length: number) => {
    if (length <= 0) return 0;
    return ((value % length) + length) % length;
};

export default function ResponsiveCarousel({
    children,
    enableOn = "mobile",
    breakpointPx = 768,
    loop = false,
    align = "center",
    slidesToScroll = 1,
    className,
    showArrows = true,
    sidePadding,
    hideNonActiveSlides = false,
    showIndicators = false,
}: ResponsiveCarouselProps) {
    const isMobile = useMediaQuery({ query: `(max-width: ${breakpointPx}px)` });
    const slideCount = React.Children.count(children);

    const carouselEnabled = useMemo(() => {
        if (enableOn === "off") return false;
        if (enableOn === "all") return true;
        if (enableOn === "mobile") return isMobile;
        if (enableOn === "desktop") return !isMobile;
        return false;
    }, [enableOn, isMobile]);

    const normalizedAlign = useMemo<CarouselAlign>(() => {
        if (typeof align === "number") {
            if (!Number.isFinite(align)) return 0.5;
            return clamp(align, 0, 1);
        }
        if (align === "start" || align === "center" || align === "end") return align;
        return "center";
    }, [align]);

    const resolvedSidePadding = useMemo(() => {
        if (sidePadding === undefined) return undefined;
        return typeof sidePadding === "number" ? `${sidePadding}px` : sidePadding;
    }, [sidePadding]);

    const alignRatio = useMemo(() => {
        if (typeof normalizedAlign === "number") {
            return clamp(normalizedAlign, 0, 1);
        }
        if (normalizedAlign === "start") return 0;
        if (normalizedAlign === "end") return 1;
        return 0.5;
    }, [normalizedAlign]);

    const layoutVarStyle: CSSVariableStyles = useMemo(() => {
        const styleVars: CSSVariableStyles = {
            "--carousel-align-ratio": `${alignRatio}`,
        };

        if (resolvedSidePadding !== undefined) {
            styleVars["--carousel-side-padding"] = resolvedSidePadding;
        }

        return styleVars;
    }, [alignRatio, resolvedSidePadding]);

    const slideSnapAlign = useMemo<"start" | "center" | "end">(() => {
        if (typeof normalizedAlign === "string") return normalizedAlign;
        if (normalizedAlign <= 0) return "start";
        if (normalizedAlign >= 1) return "end";
        if (normalizedAlign < 0.5) return "start";
        if (normalizedAlign > 0.5) return "end";
        return "center";
    }, [normalizedAlign]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animatingFromIndex, setAnimatingFromIndex] = useState<number | null>(null);
    const [indicatorIndex, setIndicatorIndex] = useState(0);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
    const currentIndexRef = useRef(0);
    const scrollIdleTimeoutRef = useRef<number | null>(null);
    const indicatorTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const clearScrollIdleTimeout = useCallback(() => {
        if (scrollIdleTimeoutRef.current !== null) {
            clearTimeout(scrollIdleTimeoutRef.current);
            scrollIdleTimeoutRef.current = null;
        }
    }, []);

    const scheduleAnimationEnd = useCallback(() => {
        if (!hideNonActiveSlides) return;
        clearScrollIdleTimeout();
        if (typeof window === "undefined") return;
        scrollIdleTimeoutRef.current = window.setTimeout(() => {
            setAnimatingFromIndex(null);
            scrollIdleTimeoutRef.current = null;
        }, 220);
    }, [clearScrollIdleTimeout, hideNonActiveSlides]);

    useEffect(() => {
        return () => {
            clearScrollIdleTimeout();
            if (indicatorTimeoutRef.current !== null) {
                clearTimeout(indicatorTimeoutRef.current);
                indicatorTimeoutRef.current = null;
            }
        };
    }, [clearScrollIdleTimeout]);

    useEffect(() => {
        if (!hideNonActiveSlides) {
            setAnimatingFromIndex(null);
            clearScrollIdleTimeout();
        }
    }, [clearScrollIdleTimeout, hideNonActiveSlides]);

    useEffect(() => {
        if (!carouselEnabled) {
            setIndicatorIndex(0);
            if (indicatorTimeoutRef.current !== null) {
                clearTimeout(indicatorTimeoutRef.current);
                indicatorTimeoutRef.current = null;
            }
            return;
        }

        if (indicatorTimeoutRef.current !== null) {
            clearTimeout(indicatorTimeoutRef.current);
        }

        if (typeof window === "undefined") {
            setIndicatorIndex(currentIndex);
            return;
        }

        indicatorTimeoutRef.current = window.setTimeout(() => {
            setIndicatorIndex(currentIndex);
            indicatorTimeoutRef.current = null;
        }, 140);
    }, [carouselEnabled, currentIndex]);

    useEffect(() => {
        slideRefs.current = slideRefs.current.slice(0, slideCount);
    }, [slideCount]);

    const clampOrLoop = useCallback(
        (targetIndex: number) => {
            if (!slideCount) return 0;
            if (loop) {
                return mod(targetIndex, slideCount);
            }
            return clamp(targetIndex, 0, slideCount - 1);
        },
        [loop, slideCount]
    );

    const updateCurrentIndex = useCallback(
        (nextIndex: number) => {
            setCurrentIndex((prev) => {
                if (prev === nextIndex) return prev;
                if (hideNonActiveSlides) {
                    setAnimatingFromIndex(prev);
                    scheduleAnimationEnd();
                }
                return nextIndex;
            });
        },
        [hideNonActiveSlides, scheduleAnimationEnd]
    );

    const scrollToIndex = useCallback(
        (targetIndex: number, options?: { smooth?: boolean }) => {
            if (!carouselEnabled) return;
            const viewportNode = viewportRef.current;
            if (!viewportNode) return;
            const resolvedIndex = clampOrLoop(targetIndex);
            const targetSlide = slideRefs.current[resolvedIndex];
            if (!targetSlide) return;

            const viewportWidth = viewportNode.clientWidth;
            const slideWidth = targetSlide.clientWidth;
            const alignOffset =
                typeof normalizedAlign === "number"
                    ? (viewportWidth - slideWidth) * normalizedAlign
                    : normalizedAlign === "start"
                        ? 0
                        : normalizedAlign === "end"
                            ? viewportWidth - slideWidth
                            : (viewportWidth - slideWidth) / 2;

            viewportNode.scrollTo({
                left: targetSlide.offsetLeft - alignOffset,
                behavior: options?.smooth === false ? "auto" : "smooth",
            });
            updateCurrentIndex(resolvedIndex);
        },
        [carouselEnabled, clampOrLoop, normalizedAlign, updateCurrentIndex]
    );

    const handlePrev = useCallback(() => {
        if (!slideCount) return;
        scrollToIndex(currentIndex - slidesToScroll);
    }, [currentIndex, scrollToIndex, slideCount, slidesToScroll]);

    const handleNext = useCallback(() => {
        if (!slideCount) return;
        scrollToIndex(currentIndex + slidesToScroll);
    }, [currentIndex, scrollToIndex, slideCount, slidesToScroll]);

    useEffect(() => {
        if (!carouselEnabled) return;
        if (!slideCount) return;
        const raf = requestAnimationFrame(() => {
            const indexToUse = clampOrLoop(currentIndexRef.current);
            scrollToIndex(indexToUse, { smooth: false });
        });
        return () => cancelAnimationFrame(raf);
    }, [carouselEnabled, clampOrLoop, scrollToIndex, slideCount]);

    useEffect(() => {
        if (!carouselEnabled) return;
        const viewportNode = viewportRef.current;
        if (!viewportNode) return;
        let frame: number | null = null;

        const handleScroll = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const center = viewportNode.scrollLeft + viewportNode.clientWidth / 2;
                let closestIdx = 0;
                let closestDistance = Number.POSITIVE_INFINITY;

                slideRefs.current.forEach((slide, index) => {
                    if (!slide) return;
                    const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
                    const distance = Math.abs(slideCenter - center);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIdx = index;
                    }
                });

                updateCurrentIndex(closestIdx);
                scheduleAnimationEnd();
            });
        };

        viewportNode.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            viewportNode.removeEventListener("scroll", handleScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [carouselEnabled, scheduleAnimationEnd, slideCount, updateCurrentIndex]);

    useEffect(() => {
        if (!carouselEnabled) return;
        const handleResize = () => {
            scrollToIndex(currentIndexRef.current, { smooth: false });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [carouselEnabled, scrollToIndex]);

    useEffect(() => {
        if (!slideCount) {
            updateCurrentIndex(0);
            return;
        }
        const boundedIndex = clamp(currentIndexRef.current, 0, slideCount - 1);
        updateCurrentIndex(boundedIndex);
    }, [slideCount, updateCurrentIndex]);

    useEffect(() => {
        if (!carouselEnabled) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrev();
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                handleNext();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [carouselEnabled, handleNext, handlePrev]);

    if (!carouselEnabled) {
        return (
            <div className={`${styles.carousel} ${className || ""}`} style={layoutVarStyle}>
                <div className={styles.staticWrapper}>
                    <div className={styles.staticContainer}>{children}</div>
                </div>
            </div>
        );
    }

    const isMultiSlide = slideCount > 1;
    const canScrollPrev = loop ? isMultiSlide : currentIndex > 0;
    const canScrollNext = loop ? isMultiSlide : currentIndex < slideCount - 1;

    return (
        <div className={`${styles.carousel} ${className || ""}`} style={layoutVarStyle}>
            <div
                className={styles.carouselViewport}
                ref={viewportRef}
                aria-roledescription="carousel"
            >
                <div className={styles.carouselContainer} role="list">
                    <div
                        className={styles.carouselSpacerStart}
                        aria-hidden="true"
                        role="presentation"
                    />
                    {React.Children.map(children, (child, idx) => {
                        const isCurrent = idx === currentIndex;
                        const isPrevious = animatingFromIndex === idx;
                        const slideHidden = hideNonActiveSlides && !isCurrent && !isPrevious;
                        const slideClassName = [
                            styles.carouselSlide,
                            slideHidden ? styles.carouselSlideHidden : "",
                            hideNonActiveSlides && isPrevious ? styles.carouselSlideLeaving : "",
                        ]
                            .filter(Boolean)
                            .join(" ");
                        return (
                            <div
                                key={idx}
                                className={slideClassName}
                                role="listitem"
                                aria-label={`Slide ${idx + 1}`}
                                aria-hidden={slideHidden || undefined}
                                ref={(node) => {
                                    slideRefs.current[idx] = node;
                                }}
                                style={{ scrollSnapAlign: slideSnapAlign }}
                            >
                                {child}
                            </div>
                        );
                    })}
                    <div
                        className={styles.carouselSpacerEnd}
                        aria-hidden="true"
                        role="presentation"
                    />
                </div>
            </div>

            {showArrows && isMultiSlide && (
                <>
                    <button
                        type="button"
                        className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
                        aria-label="Previous slide"
                        onClick={handlePrev}
                        disabled={!canScrollPrev}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
                        aria-label="Next slide"
                        onClick={handleNext}
                        disabled={!canScrollNext}
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {showIndicators && isMultiSlide && (
                <div className={styles.carouselIndicators} role="tablist" aria-label="Slide indicators">
                    {Array.from({ length: slideCount }).map((_, idx) => {
                        const isActive = idx === indicatorIndex;
                        return (
                            <button
                                key={idx}
                                type="button"
                                className={`${styles.carouselIndicator} ${
                                    isActive ? styles.carouselIndicatorActive : ""
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                                aria-current={isActive ? "true" : undefined}
                                onClick={() => scrollToIndex(idx)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
