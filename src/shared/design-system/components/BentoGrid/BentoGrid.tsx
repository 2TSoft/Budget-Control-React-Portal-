import { motion } from 'framer-motion';
import { bentoContainer } from '../../motion';
import styles from './BentoGrid.module.css';
import type { ReactNode } from 'react';

interface BentoGridProps {
    columns?: 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    className?: string;
}

const COL_MAP = {
    2: styles.cols2,
    3: styles.cols3,
    4: styles.cols4,
} as const;

const GAP_MAP = {
    sm: styles.gapSm,
    md: styles.gapMd,
    lg: styles.gapLg,
} as const;

export function BentoGrid({ columns = 4, gap = 'md', children, className }: BentoGridProps) {
    return (
        <motion.div
            className={`${styles.grid} ${COL_MAP[columns]} ${GAP_MAP[gap]} ${className ?? ''}`}
            variants={bentoContainer}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.div>
    );
}
