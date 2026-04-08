import { motion } from 'framer-motion';
import { pulse } from '../../motion';
import styles from './StatusBadge.module.css';

const STATUS_CONFIG = {
    draft: { label: 'Nháp', className: styles.draft },
    pending: { label: 'Chờ duyệt', className: styles.pending },
    approved: { label: 'Đã duyệt', className: styles.approved },
    rejected: { label: 'Từ chối', className: styles.rejected },
    cancelled: { label: 'Đã huỷ', className: styles.cancelled },
} as const;

type Status = keyof typeof STATUS_CONFIG;

interface StatusBadgeProps {
    status: Status;
    label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
    const config = STATUS_CONFIG[status];

    return (
        <span className={`${styles.badge} ${config.className}`}>
            {status === 'pending' ? (
                <motion.span className={styles.dot} variants={pulse} animate="animate" />
            ) : (
                <span className={styles.dot} />
            )}
            {label ?? config.label}
        </span>
    );
}
