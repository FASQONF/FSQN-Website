'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from "./TokenomicsSection.module.css";
import { motion } from 'framer-motion';
import { useTranslation } from "@/hooks/useTranslation";
import parse from "html-react-parser";
const TokenomicsSection = () => {
  // State to track which segment is being hovered
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const chartRef = useRef(null);
  const t = useTranslation();

  // Distribution data with id, name, percentage, and segment color
  const segments = [
    { id: 'team', name: `${t.tokenomicsSection.segments[0].name}`, percentage: 16, color: '#232323', hoverColor: '#4A4A4A', position: { top: '10%', left: '15%' } },
    { id: 'liquidity', name: `${t.tokenomicsSection.segments[1].name}`, percentage: 15, color: '#E0E0E0', hoverColor: '#FFFFFF', position: { top: '10%', right: '10%' } },
    { id: 'ecosystem', name: `${t.tokenomicsSection.segments[2].name}`, percentage: 15, color: '#529052', hoverColor: '#7AE47A', position: { top: '40%', right: '-10%' } },
    { id: 'marketing', name: `${t.tokenomicsSection.segments[3].name}`, percentage: 10, color: '#A4E5A4', hoverColor: '#D1FFD1', position: { top: '40%', left: '-5%' } },
    { id: 'farming', name:`${t.tokenomicsSection.segments[4].name}`, percentage: 10, color: '#00FF00', hoverColor: '#80FF80', position: { top: '60%', left: '-9%' } },
    { id: 'ido', name: `${t.tokenomicsSection.segments[5].name}`, percentage: 3, color: '#494949', hoverColor: '#777777', position: { top: '78%', left: '9%' } },
    { id: 'airdrop', name: `${t.tokenomicsSection.segments[6].name}`, percentage: 2, color: '#37C637', hoverColor: '#6FFF6F', position: { top: '70%', left: '-3%' } },
    { id: 'seed', name: `${t.tokenomicsSection.segments[7].name}`, percentage: 3, color: '#C4D6C4', hoverColor: '#E8FFE8', position: { bottom: '30%', right: '0%' } },
    { id: 'advisors', name: `${t.tokenomicsSection.segments[8].name}`, percentage: 2, color: '#FFFFFF', hoverColor: '#FFFFFF', position: { bottom: '20%', right: '5%' } },
    { id: 'private', name: `${t.tokenomicsSection.segments[9].name}`, percentage: 26, color: '#2F8D2D', hoverColor: '#5AE157', position: { bottom: '10%', right: '15%' } },
  ];

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Show animation when chart is in view
            const paths = entry.target.querySelectorAll(`.${styles.segment}`);
            paths.forEach((path, index) => {
              setTimeout(() => {
                                //@ts-ignore
                path.style.opacity = '1';
                                //@ts-ignore
                path.style.transform = 'scale(1)';
              }, index * 100);
            });

            // Show labels
            const labels = entry.target.querySelectorAll(`.${styles.label}`);
            labels.forEach((label, index) => {
              setTimeout(() => {
                                //@ts-ignore
                label.style.opacity = '1';
                                //@ts-ignore
                label.style.transform = 'translateY(0)';
              }, index * 100 + 500);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
         {parse(t.tokenomicsSection.title)}
        </h2>
        <p className={styles.subtitle}>{t.tokenomicsSection.subtitle}</p>
        <div ref={chartRef} className={styles.chartContainer}>
          {/* SVG Chart */}
          {/* <img src="/images/tokenomics/fsqn-logo.png" alt="" /> */}
          <svg width="700" height="700" viewBox="0 0 747 747" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
            <motion.image
                href="/images/tokenomics/fsqn-logo.png"
                x={(747 - 200) / 2} 
                y={(747 - 200) / 2}
                width="200"
                height="200"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
              />
              <path 
                className={`${styles.segment} ${hoveredSegment === 'team' ? styles.segmentHovered : ''}`}
                d="M126.46 283.067C124.592 282.386 123.628 280.318 124.335 278.459C141.137 234.276 169.416 195.344 206.285 165.693C243.155 136.042 287.247 116.772 334.006 109.839C335.973 109.548 337.786 110.933 338.051 112.903L352.595 221.062C352.86 223.033 351.476 224.84 349.512 225.153C323.776 229.245 299.53 239.989 279.191 256.347C258.851 272.704 243.156 294.081 233.638 318.34C232.912 320.191 230.849 321.155 228.982 320.474L126.46 283.067Z"
                fill={hoveredSegment === 'team' ? segments[0].hoverColor : segments[0].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('team')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* Liquidity Reserve - 15% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'marketing' ? styles.segmentHovered : ''}`}
                d="M117.059 429.636C115.117 430.061 113.195 428.832 112.795 426.884C102.799 378.129 106.678 327.544 123.992 280.883C124.684 279.019 126.771 278.097 128.625 278.814L230.418 318.16C232.273 318.877 233.191 320.96 232.519 322.832C223.413 348.185 221.316 375.529 226.449 401.975C226.828 403.927 225.603 405.846 223.661 406.271L117.059 429.636Z"
                fill={hoveredSegment === 'marketing' ? segments[1].hoverColor : segments[1].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('marketing')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* Ecosystem incentives - 15% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'farming' ? styles.segmentHovered : ''}`}
                d="M181.903 552.894C180.452 554.253 178.171 554.18 176.832 552.711C144.462 517.211 122.308 473.606 112.723 426.529C112.327 424.581 113.612 422.696 115.566 422.326L222.789 402.001C224.742 401.631 226.622 402.916 227.039 404.86C232.487 430.251 244.447 453.79 261.741 473.162C263.065 474.645 262.994 476.921 261.544 478.28L181.903 552.894Z"
                fill={hoveredSegment === 'farming' ? segments[2].hoverColor : segments[2].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('farming')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* Marketing - 10% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'ido' ? styles.segmentHovered : ''}`}
                d="M198.783 569.361C197.46 570.846 195.182 570.978 193.716 569.635C189.322 565.609 185.064 561.437 180.95 557.126C179.578 555.688 179.664 553.408 181.12 552.055L261.087 477.79C262.544 476.437 264.818 476.524 266.206 477.948C267.814 479.598 269.46 481.211 271.143 482.785C272.595 484.144 272.728 486.416 271.405 487.9L198.783 569.361Z"
                fill={hoveredSegment === 'ido' ? segments[3].hoverColor : segments[3].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('ido')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* Farming & Staking - 10% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'private' ? styles.segmentHovered : ''}`}
                d="M588.295 524.206C589.922 525.348 590.318 527.594 589.154 529.206C568.476 557.842 542.296 582.085 512.132 600.509C480.944 619.558 446.166 631.978 409.966 636.995C373.766 642.011 336.921 639.516 301.728 629.666C267.691 620.139 235.905 603.929 208.219 581.995C206.661 580.761 206.43 578.491 207.686 576.95L276.607 492.333C277.862 490.792 280.127 490.564 281.698 491.782C296.986 503.634 314.434 512.419 333.084 517.639C352.89 523.182 373.625 524.586 393.997 521.763C414.37 518.94 433.942 511.95 451.494 501.23C468.021 491.135 482.423 477.936 493.912 462.374C495.092 460.774 497.334 460.378 498.962 461.52L588.295 524.206Z"
                fill={hoveredSegment === 'private' ? segments[4].hoverColor : segments[4].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('private')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* IDO - 3% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'airdrop' ? styles.segmentHovered : ''}`}
                d="M209.025 578.034C207.78 579.584 205.512 579.833 203.979 578.566C202.393 577.255 200.821 575.926 199.266 574.579C197.763 573.277 197.632 571 198.953 569.515L271.504 487.99C272.826 486.505 275.099 486.376 276.616 487.661C276.699 487.732 276.782 487.802 276.865 487.872C278.384 489.155 278.634 491.417 277.389 492.967L209.025 578.034Z"
                fill={hoveredSegment === 'airdrop' ? segments[5].hoverColor : segments[5].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('airdrop')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* TMA Airdrop - 2% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'advisors' ? styles.segmentHovered : ''}`}
                d="M606.339 494.476C608.103 495.393 608.792 497.567 607.852 499.319C603.096 508.176 597.841 516.756 592.114 525.019C590.982 526.653 588.731 527.027 587.113 525.873L498.27 462.494C496.651 461.339 496.279 459.093 497.394 457.448C499.979 453.633 502.387 449.702 504.609 445.666C505.568 443.924 507.738 443.235 509.502 444.152L606.339 494.476Z"
                fill={hoveredSegment === 'advisors' ? segments[6].hoverColor : segments[6].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('advisors')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* Seed - 3% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'seed' ? styles.segmentHovered : ''}`}
                d="M622.112 457.427C623.996 458.063 625.01 460.106 624.348 461.981C620.105 474.005 615.004 485.707 609.083 496.999C608.16 498.76 605.973 499.408 604.225 498.461L508.267 446.48C506.519 445.533 505.874 443.35 506.778 441.579C509.565 436.125 512.015 430.506 514.114 424.752C514.795 422.884 516.834 421.871 518.717 422.507L622.112 457.427Z"
                fill={hoveredSegment === 'seed' ? segments[7].hoverColor : segments[7].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                            //@ts-ignore
                onMouseEnter={() => setHoveredSegment('seed')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* Advisors - 2% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'ecosystem' ? styles.segmentHovered : ''}`}
                d="M576.439 207.062C577.977 205.801 580.247 206.025 581.487 207.58C609.071 242.178 627.604 283.128 635.38 326.727C643.156 370.326 639.923 415.157 626.001 457.159C625.375 459.046 623.322 460.041 621.443 459.39L518.327 423.654C516.449 423.003 515.458 420.954 516.064 419.06C523.485 395.856 525.139 371.172 520.855 347.153C516.571 323.134 506.486 300.543 491.5 281.336C490.277 279.768 490.498 277.503 492.036 276.242L576.439 207.062Z"
                fill={hoveredSegment === 'ecosystem' ? segments[8].hoverColor : segments[8].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('ecosystem')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* Private Sale - 26% */}
              <path 
                className={`${styles.segment} ${hoveredSegment === 'liquidity' ? styles.segmentHovered : ''}`}
                d="M338.022 113.375C337.754 111.405 339.134 109.588 341.107 109.347C385.412 103.922 430.39 109.728 471.893 126.258C513.396 142.788 550.051 169.494 578.494 203.893C579.761 205.425 579.514 207.693 577.965 208.939L492.927 277.339C491.378 278.585 489.115 278.336 487.832 276.817C471.971 258.041 451.718 243.442 428.849 234.334C405.98 225.226 381.236 221.903 356.809 224.634C354.833 224.855 353.019 223.48 352.751 221.51L338.022 113.375Z"
                fill={hoveredSegment === 'liquidity' ? segments[9].hoverColor : segments[9].color}
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="0.9"
                                //@ts-ignore
                onMouseEnter={() => setHoveredSegment('liquidity')}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            </g>
          </svg>
          
          <div className={styles.labels}>
          {segments.map((segment) => (
            <div 
              key={segment.id}
              className={`${styles.label} ${hoveredSegment === segment.id ? styles.highlight : ''}`}
              style={segment.position}
                              //@ts-ignore
              onMouseEnter={() => setHoveredSegment(segment.id)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <p className={styles.labelText}>
               <span>{segment.name}</span> <br />
                <span className={styles.percentageSpan}>{segment.percentage}%</span>
              </p>
            </div>
          ))}
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default TokenomicsSection;