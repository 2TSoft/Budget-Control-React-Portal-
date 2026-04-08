import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuOutlined, MenuFoldOutlined, DownOutlined, LogoutOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { dropdownReveal } from '../../motion';
import { useAppShell } from '../AppShell/AppShellContext';
import styles from './TopBar.module.css';

const ROUTE_TITLES: Record<string, string> = {
    '/': 'Tổng quan',
    '/purchase-requisitions': 'Yêu cầu mua hàng',
    '/budget': 'Ngân sách',
    '/department': 'Phòng ban',
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function TopBar() {
    const { collapsed, toggleCollapsed, toggleMobile } = useAppShell();
    const location = useLocation();
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // User context từ Power Pages
    const portalUser = window.Microsoft?.Dynamic365?.Portal?.User;
    const isAuthenticated = (portalUser?.userName ?? '') !== '';
    const firstName = portalUser?.firstName ?? '';
    const lastName = portalUser?.lastName ?? '';
    const fullName = `${firstName} ${lastName}`.trim();
    const email = portalUser?.email ?? '';

    // Dark mode
    const [dark, setDark] = useState(() => document.documentElement.getAttribute('data-theme') === 'dark');

    function toggleDarkMode() {
        const next = !dark;
        setDark(next);
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
        localStorage.setItem('bento-theme', next ? 'dark' : 'light');
    }

    // Avatar dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const pageTitle = ROUTE_TITLES[location.pathname] ?? '';

    return (
        <header className={styles.topbar}>
            <div className={styles.left}>
                <button
                    className={styles.toggleBtn}
                    onClick={isMobile ? toggleMobile : toggleCollapsed}
                    type="button"
                    aria-label={collapsed ? 'Mở sidebar' : 'Thu gọn sidebar'}
                >
                    {collapsed ? <MenuOutlined /> : <MenuFoldOutlined />}
                </button>
                <div className={styles.breadcrumb}>
                    <span className={styles.breadcrumbCurrent}>{pageTitle}</span>
                </div>
            </div>

            <div className={styles.right}>
                <button
                    className={styles.themeToggle}
                    onClick={toggleDarkMode}
                    type="button"
                    aria-label={dark ? 'Chế độ sáng' : 'Chế độ tối'}
                    title={dark ? 'Chế độ sáng' : 'Chế độ tối'}
                >
                    {dark ? <SunOutlined /> : <MoonOutlined />}
                </button>
                {isAuthenticated && (
                    <div className={styles.dropdownWrapper} ref={wrapperRef}>
                        <button
                            className={styles.avatarBtn}
                            onClick={() => setDropdownOpen((v) => !v)}
                            type="button"
                            aria-expanded={dropdownOpen}
                            aria-haspopup="true"
                        >
                            <span className={styles.avatarCircle}>
                                {getInitials(fullName || 'U')}
                            </span>
                            <span className={styles.avatarName}>{firstName || 'User'}</span>
                            <DownOutlined
                                className={`${styles.avatarChevron} ${dropdownOpen ? styles.avatarChevronOpen : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    className={styles.dropdown}
                                    variants={dropdownReveal}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className={styles.dropdownHeader}>
                                        <span className={styles.dropdownAvatar}>
                                            {getInitials(fullName || 'U')}
                                        </span>
                                        <div className={styles.dropdownInfo}>
                                            <span className={styles.dropdownName}>{fullName || 'User'}</span>
                                            {email && <span className={styles.dropdownEmail}>{email}</span>}
                                        </div>
                                    </div>
                                    <div className={styles.dropdownDivider} />
                                    <button
                                        className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                                        onClick={() => {
                                            window.location.href = '/Account/Login/LogOff?returnUrl=%2F';
                                        }}
                                        type="button"
                                    >
                                        <LogoutOutlined />
                                        Đăng xuất
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </header>
    );
}
