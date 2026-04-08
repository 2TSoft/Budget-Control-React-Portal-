import { useState, useCallback, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar, type SidebarNavItem } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar/TopBar';
import { fadeIn } from '../../motion';
import { AppShellContext } from './AppShellContext';
import styles from './AppShell.module.css';

interface AppShellProps {
    children: ReactNode;
    navItems: SidebarNavItem[];
}

export function AppShell({ children, navItems }: AppShellProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleCollapsed = useCallback(() => setCollapsed((v) => !v), []);
    const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    return (
        <AppShellContext.Provider value={{ collapsed, mobileOpen, toggleCollapsed, toggleMobile, closeMobile }}>
            <div className={styles.shell}>
                {/* Sidebar */}
                <motion.aside
                    className={`${styles.sidebar} ${isMobile && mobileOpen ? styles.sidebarMobileOpen : ''}`}
                    animate={{ width: isMobile ? 260 : collapsed ? 72 : 260 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                    <Sidebar
                        navItems={navItems}
                        collapsed={!isMobile && collapsed}
                    />
                </motion.aside>

                {/* Mobile overlay */}
                <AnimatePresence>
                    {isMobile && mobileOpen && (
                        <motion.div
                            className={styles.overlay}
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={closeMobile}
                        />
                    )}
                </AnimatePresence>

                {/* Main */}
                <div className={`${styles.main} ${collapsed ? styles.mainCollapsed : styles.mainExpanded}`}>
                    <TopBar />
                    <main className={styles.content}>
                        {children}
                    </main>
                </div>
            </div>
        </AppShellContext.Provider>
    );
}
