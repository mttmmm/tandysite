import React, { useEffect } from 'react';
import './ScrollBackdrop.css';
import halftoneTexture from '../../assets/360_F_1823990973_5KGbvAUmR7nJvAOR8O2IVUqle5fnT3ra.jpg';

const interpolateChannel = (from, to, progress) =>
  Math.round(from + (to - from) * progress);

const buildAccent = (progress) => {
  const start = [92, 92, 92];
  const end = [214, 214, 214];

  return `rgb(${interpolateChannel(start[0], end[0], progress)} ${interpolateChannel(start[1], end[1], progress)} ${interpolateChannel(start[2], end[2], progress)})`;
};

const ORNAMENT_PATH =
  'M40 20C130 30 150 120 215 170C275 216 334 243 338 318C341 392 278 447 180 474C89 499 44 556 44 642C44 728 103 778 163 778C217 778 261 743 261 685C261 642 229 607 189 607C157 607 132 626 132 658C132 687 154 706 180 706';

const ScrollBackdrop = () => {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      root.style.setProperty('--scroll-progress', '0');
      root.style.setProperty('--scroll-accent', buildAccent(0));
      return undefined;
    }

    let ticking = false;

    const updateBackdrop = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scrollTop / maxScroll, 1);

      root.style.setProperty('--scroll-progress', progress.toFixed(4));
      root.style.setProperty('--scroll-accent', buildAccent(progress));
      root.style.setProperty('--scroll-accent-soft', `rgba(255, 255, 255, ${(0.04 + progress * 0.08).toFixed(3)})`);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateBackdrop);
        ticking = true;
      }
    };

    updateBackdrop();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="scroll-backdrop"
      aria-hidden="true"
      style={{ '--halftone-texture': `url(${halftoneTexture})` }}
    >
      <div className="scroll-backdrop-glow" />
      <div className="scroll-backdrop-texture scroll-backdrop-texture-left" />
      <div className="scroll-backdrop-texture scroll-backdrop-texture-right" />
      <div className="scroll-backdrop-halftone scroll-backdrop-halftone-left" />
      <div className="scroll-backdrop-halftone scroll-backdrop-halftone-right" />
      <div className="scroll-backdrop-grain" />

      <svg className="scroll-backdrop-ornament scroll-backdrop-ornament-left" viewBox="0 0 360 820" fill="none">
        <path d={ORNAMENT_PATH} />
        <path d={ORNAMENT_PATH} transform="translate(-16 120) scale(0.92)" />
      </svg>

      <svg className="scroll-backdrop-ornament scroll-backdrop-ornament-right" viewBox="0 0 360 820" fill="none">
        <path d={ORNAMENT_PATH} />
        <path d={ORNAMENT_PATH} transform="translate(-16 120) scale(0.92)" />
      </svg>

      <svg className="scroll-backdrop-crown" viewBox="0 0 1200 280" fill="none">
        <path d="M20 160C120 62 226 60 302 134C357 188 407 202 462 156C528 101 556 62 634 66C712 70 746 116 798 160C852 205 909 203 978 124C1058 34 1131 22 1180 46" />
        <path d="M78 238C173 186 250 160 338 172C431 184 493 238 602 238C710 238 790 191 870 156C957 117 1046 126 1170 206" />
      </svg>
    </div>
  );
};

export default ScrollBackdrop;
