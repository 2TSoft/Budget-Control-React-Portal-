import { motion } from 'framer-motion';
import { bentoItemReveal, cardHover } from '../../motion';
import styles from './BentoCard.module.css';
import type { ReactNode } from 'react';

interface BentoCardProps {
    span?: 1 | 2;
    rowSpan?: 1 | 2;
    variant?: 'default' | 'primary' | 'accent' | 'glass';
    hoverable?: boolean;
    onClick?: () => void;
    children: ReactNode;
    className?: string;
}

const VARIANT_MAP = {
    default: styles.variantDefault,
    primary: styles.variantPrimary,
    accent: styles.variantAccent,
    glass: styles.variantGlass,
} as const;

export function BentoCard({
    span = 1,
    rowSpan = 1,
    variant = 'default',
    hoverable = false,
    onClick,
    children,
    className,
}: BentoCardProps) {
    const classes = [
        styles.card,
        VARIANT_MAP[variant],
        span === 2 ? styles.span2 : '',
        rowSpan === 2 ? styles.rowSpan2 : '',
        hoverable || onClick ? styles.hoverable : '',
        className ?? '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <motion.div
            className={classes}
            variants={bentoItemReveal}
            initial="hidden"
            animate="visible"
            whileHover={hoverable || onClick ? cardHover.hover : undefined}
            whileTap={hoverable || onClick ? cardHover.tap : undefined}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
