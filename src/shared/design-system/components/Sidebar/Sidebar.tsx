import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import balasIcon from '@/assets/logo-icon.png';
import styles from './Sidebar.module.css';
import type { ReactNode } from 'react';

export interface SidebarNavItem {
    key: string;
    label: string;
    icon: ReactNode;
    path: string;
    group?: string;
}

interface SidebarProps {
    navItems: SidebarNavItem[];
    collapsed: boolean;
}

export function Sidebar({ navItems, collapsed }: SidebarProps) {
    // Nhóm nav items theo group
    const groups = new Map<string, SidebarNavItem[]>();
    for (const item of navItems) {
        const group = item.group ?? '';
        if (!groups.has(group)) groups.set(group, []);
        groups.get(group)!.push(item);
    }

    return (
        <nav className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
            {/* Logo */}
            <div className={styles.logo}>
                <img src={balasIcon} alt="Balas Technologies" className={styles.logoIcon} />
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            className={styles.logoText}
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className={styles.logoTitle}>Budget Control</span>
                            <span className={styles.logoSubtitle}>Balas Technologies</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation groups */}
            {[...groups.entries()].map(([group, items]) => (
                <div key={group} className={styles.navGroup}>
                    {group && (
                        <div className={styles.navGroupLabel}>{group}</div>
                    )}
                    {items.map((item) => (
                        <NavLink
                            key={item.key}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <motion.div
                                            className={styles.activeIndicator}
                                            layoutId="sidebar-active"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <span className={styles.navIcon}>{item.icon}</span>
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                className={styles.navLabel}
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            ))}
        </nav>
    );
}
