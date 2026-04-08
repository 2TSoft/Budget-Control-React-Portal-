import { motion } from 'framer-motion';
import { pageTransition } from '../../motion';
import styles from './PageContainer.module.css';
import type { ReactNode } from 'react';

interface PageContainerProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    children: ReactNode;
}

export function PageContainer({ title, subtitle, actions, children }: PageContainerProps) {
    return (
        <motion.div
            className={styles.container}
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1 className={styles.title}>{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                {actions && <div className={styles.actions}>{actions}</div>}
            </div>
            <div className={styles.body}>
                {children}
            </div>
        </motion.div>
    );
}
