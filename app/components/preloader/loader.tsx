"use client";

import styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";
import { usePreloader } from ".";
import type { Variants } from "framer-motion";

export default function Index() {
  const { loadingPercent } = usePreloader();

  const mounted = useRef(false);

  const [dimension, setDimension] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  useEffect(() => {
    mounted.current = true;
    const resize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  if (!mounted) return null;

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  const percent = Math.round(loadingPercent - (loadingPercent % 5));

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          {/* Logo & Brand */}
          <motion.div
            variants={opacity}
            initial="initial"
            animate="enter"
            className={styles.content}
          >
            {/* Animated Logo */}
            <div className={styles.logoContainer}>
              <motion.div
                className={styles.logoRing}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className={styles.logoRingOuter}
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <div className={styles.logoInner}>
                <span className={styles.logoText}>SC</span>
              </div>
            </div>

            {/* Brand Name */}
            <motion.h1
              className={styles.brandName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Software Community
            </motion.h1>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressBar}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <span className={styles.progressText}>{percent}%</span>
            </div>

            {/* Loading Text */}
            <motion.p
              className={styles.loadingText}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </motion.div>

          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
