"use client";

import AnimatedBackground from "./components/animated-background";
import StarsBackground from "./components/stars-background";
import SmoothScroll from "./components/smooth-scroll";
import HeroSection from "./components/sections/hero-section";
import AboutSection from "./components/sections/about-section";
import FeaturesSection from "./components/sections/features-section";
import HowItWorksSection from "./components/sections/how-it-works-section";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Stars Background */}
      <StarsBackground />

      {/* 3D Animated Background */}
      <AnimatedBackground />

      {/* Content Sections */}
      <main className="relative bg-slate-100 dark:bg-transparent canvas-overlay-mode">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
    </SmoothScroll>
  );
}
