import type { Variants, Transition } from 'framer-motion';

/**
 * Bento Design System — Motion Presets
 * Reusable Framer Motion variants cho micro-interactions
 */

const spring: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 24,
};

const easeOut: Transition = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
};

// ─── Mount / Unmount ────────────────────────────────────────
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: easeOut },
    exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

export const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: spring },
    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
};

// ─── Stagger Containers ────────────────────────────────────
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
};

// ─── Bento Grid Reveal ─────────────────────────────────────
export const bentoContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

export const bentoItemReveal: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 22,
        },
    },
};

// ─── Card Hover / Press ────────────────────────────────────
export const cardHover = {
    rest: {
        scale: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)',
    },
    hover: {
        scale: 1.01,
        boxShadow: '0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
        transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
    tap: {
        scale: 0.98,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
        transition: { duration: 0.1 },
    },
};

export const pressEffect = {
    tap: { scale: 0.97, transition: { duration: 0.1 } },
};

// ─── Slide ──────────────────────────────────────────────────
export const slideInLeft: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: easeOut },
    exit: { x: -20, opacity: 0, transition: { duration: 0.2 } },
};

export const slideInRight: Variants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: easeOut },
    exit: { x: 20, opacity: 0, transition: { duration: 0.2 } },
};

// ─── Page Transition ────────────────────────────────────────
export const pageTransition: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: { duration: 0.2 },
    },
};

// ─── Dropdown / Popover ─────────────────────────────────────
export const dropdownReveal: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        y: -4,
        scale: 0.98,
        transition: { duration: 0.1 },
    },
};

// ─── Sidebar ────────────────────────────────────────────────
export const sidebarExpand = {
    expanded: { width: 260 },
    collapsed: { width: 72 },
    transition: { type: 'spring', stiffness: 300, damping: 28 } as Transition,
};

// ─── Pulse (status indicator) ───────────────────────────────
export const pulse: Variants = {
    animate: {
        scale: [1, 1.15, 1],
        opacity: [1, 0.7, 1],
        transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
};

// ─── Count Up (for stats) ───────────────────────────────────
export const countUp: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
};
