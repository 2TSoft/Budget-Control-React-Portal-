import { motion } from 'framer-motion';
import { fadeInUp } from '../../motion';
import styles from './EmptyState.module.css';
import type { ReactNode } from 'react';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <motion.div className={styles.empty} variants={fadeInUp} initial="hidden" animate="visible">
            {icon && <div className={styles.icon}>{icon}</div>}
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}
            {action}
        </motion.div>
    );
}
