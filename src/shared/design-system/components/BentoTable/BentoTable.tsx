import { Table } from 'antd';
import type { TableProps } from 'antd';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../motion';
import styles from './BentoTable.module.css';
import type { ReactNode } from 'react';

interface BentoTableProps<T> extends Omit<TableProps<T>, 'title'> {
    title?: string;
    toolbar?: ReactNode;
}

export function BentoTable<T extends object>({ title, toolbar, ...tableProps }: BentoTableProps<T>) {
    return (
        <motion.div
            className={styles.tableWrapper}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
        >
            {(title || toolbar) && (
                <div className={styles.toolbar}>
                    {title && <span className={styles.toolbarTitle}>{title}</span>}
                    {toolbar && <div className={styles.toolbarActions}>{toolbar}</div>}
                </div>
            )}
            <Table<T> {...tableProps} />
        </motion.div>
    );
}
