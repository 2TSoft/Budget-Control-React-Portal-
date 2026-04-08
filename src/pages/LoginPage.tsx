import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileTextOutlined,
    DollarOutlined,
    CheckCircleOutlined,
    TeamOutlined,
    ArrowRightOutlined,
} from '@ant-design/icons';
import { bentoContainer, bentoItemReveal } from '@/shared/design-system/motion';
import balasLogo from '@/assets/logo.png';
import styles from './LoginPage.module.css';

const TENANT_ID = import.meta.env.VITE_AZURE_TENANT_ID as string | undefined;

const FEATURES = [
    {
        icon: <FileTextOutlined />,
        color: '#00A1E4',
        bg: '#E6F6FD',
        title: 'Yêu cầu mua hàng',
        desc: 'Tạo và gửi yêu cầu mua hàng nhanh chóng, theo dõi tiến độ mọi lúc.',
    },
    {
        icon: <DollarOutlined />,
        color: '#34C759',
        bg: '#F0FDF4',
        title: 'Kiểm soát ngân sách',
        desc: 'Nắm bắt chi tiêu phòng ban theo thời gian thực, nhận cảnh báo khi gần hết ngân sách.',
    },
    {
        icon: <CheckCircleOutlined />,
        color: '#FF9F0A',
        bg: '#FFFBEB',
        title: 'Phê duyệt nhanh',
        desc: 'Duyệt đề xuất chỉ với vài thao tác, không cần giấy tờ hay email qua lại.',
    },
    {
        icon: <TeamOutlined />,
        color: '#AF52DE',
        bg: '#FAF0FF',
        title: 'Phối hợp phòng ban',
        desc: 'Mọi phòng ban cùng làm việc trên một nền tảng, minh bạch và đồng bộ.',
    },
];

const STATS = [
    { value: '80%', label: 'Tiết kiệm thời gian' },
    { value: '100%', label: 'Minh bạch chi tiêu' },
    { value: '24/7', label: 'Truy cập mọi lúc' },
];

export default function LoginPage() {
    const loginFormRef = useRef<HTMLFormElement>(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Fallback: đọc token từ DOM nếu Power Pages đã render sẵn
        const domToken = document.querySelector<HTMLInputElement>(
            'input[name="__RequestVerificationToken"]'
        )?.value;
        if (domToken) {
            setToken(domToken);
            return;
        }
        // Lấy từ shell API
        window.shell?.getTokenDeferred()
            .then((t: string) => setToken(t))
            .catch(() => { });
    }, []);

    function handleLogin() {
        loginFormRef.current?.submit();
    }

    return (
        <div className={styles.page}>
            {/* Background decoration */}
            <div className={styles.bgDecor}>
                <div className={`${styles.orb} ${styles.orb1}`} />
                <div className={`${styles.orb} ${styles.orb2}`} />
                <div className={styles.gridLines} />
            </div>

            {/* Hidden login form */}
            <form
                ref={loginFormRef}
                action="/Account/Login/ExternalLogin"
                method="post"
                style={{ display: 'none' }}
            >
                <input name="__RequestVerificationToken" type="hidden" value={token} />
                {TENANT_ID && (
                    <input name="provider" type="hidden" value={`https://login.windows.net/${TENANT_ID}/`} />
                )}
                <input
                    name="returnurl"
                    type="hidden"
                    value="/"
                />
            </form>

            <motion.div
                className={styles.container}
                variants={bentoContainer}
                initial="hidden"
                animate="visible"
            >
                {/* ─── Hero Section ─────────────────────────── */}
                <motion.section className={styles.hero} variants={bentoItemReveal}>
                    <h1 className={styles.heroTitle}>
                        Kiểm soát chi tiêu,
                        <br />
                        <span className={styles.heroAccent}>đơn giản hoá quy trình.</span>
                    </h1>
                    <p className={styles.heroDesc}>
                        Gửi yêu cầu mua hàng, theo dõi ngân sách phòng ban và phê duyệt
                        đề xuất — tất cả trên một nền tảng duy nhất.
                    </p>
                    <div className={styles.heroCta}>
                        <button
                            className={styles.ctaPrimary}
                            onClick={handleLogin}
                            type="button"
                        >
                            Đăng nhập
                            <ArrowRightOutlined />
                        </button>
                        <div className={styles.ctaHint}>
                            Sử dụng tài khoản Microsoft 365 của bạn
                        </div>
                    </div>
                </motion.section>

                {/* ─── Features Bento Grid ──────────────────── */}
                <section className={styles.features}>
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            className={styles.featureCard}
                            variants={bentoItemReveal}
                        >
                            <div
                                className={styles.featureIcon}
                                style={{ backgroundColor: f.bg, color: f.color }}
                            >
                                {f.icon}
                            </div>
                            <h3 className={styles.featureTitle}>{f.title}</h3>
                            <p className={styles.featureDesc}>{f.desc}</p>
                        </motion.div>
                    ))}
                </section>

                {/* ─── Stats Row ────────────────────────────── */}
                <motion.section className={styles.stats} variants={bentoItemReveal}>
                    {STATS.map((s, i) => (
                        <div key={i} className={styles.statItem}>
                            <span className={styles.statValue}>{s.value}</span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </motion.section>

                {/* ─── Footer ───────────────────────────────── */}
                <motion.footer className={styles.footer} variants={bentoItemReveal}>
                    <img src={balasLogo} alt="Balas Technologies" className={styles.footerLogo} />
                    <span className={styles.footerText}>
                        © {new Date().getFullYear()} Balas Technologies Co., Ltd.
                    </span>
                </motion.footer>
            </motion.div>
        </div>
    );
}
