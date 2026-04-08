import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { BentoCard } from './BentoCard';

interface BentoStatProps {
    icon: ReactNode;
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    trend?: { value: number; label?: string };
    color?: string;
}

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => {
        const n = Math.round(v);
        return `${prefix ?? ''}${n.toLocaleString('vi-VN')}${suffix ?? ''}`;
    });

    useEffect(() => {
        const controls = animate(count, value, {
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
        });
        return () => controls.stop();
    }, [count, value]);

    return <motion.span>{rounded}</motion.span>;
}

export function BentoStat({ icon, label, value, suffix, prefix, trend, color }: BentoStatProps) {
    const trendPositive = trend && trend.value > 0;
    const trendNegative = trend && trend.value < 0;

    return (
        <BentoCard hoverable>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: color ? `${color}15` : 'var(--bento-primary-light)',
                            color: color ?? 'var(--bento-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 18,
                        }}
                    >
                        {icon}
                    </div>
                    {trend && (
                        <span
                            style={{
                                fontSize: 'var(--bento-text-xs)',
                                fontWeight: 600,
                                color: trendPositive
                                    ? 'var(--bento-success)'
                                    : trendNegative
                                        ? 'var(--bento-error)'
                                        : 'var(--bento-text-tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            {trendPositive ? '↑' : trendNegative ? '↓' : ''}
                            {Math.abs(trend.value)}%
                            {trend.label && (
                                <span style={{ color: 'var(--bento-text-tertiary)', fontWeight: 400, marginLeft: 4 }}>
                                    {trend.label}
                                </span>
                            )}
                        </span>
                    )}
                </div>
                <div>
                    <div
                        style={{
                            fontSize: 'var(--bento-text-3xl)',
                            fontWeight: 'var(--bento-weight-bold)',
                            color: 'var(--bento-text)',
                            lineHeight: 1.1,
                        }}
                    >
                        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
                    </div>
                    <div
                        style={{
                            fontSize: 'var(--bento-text-sm)',
                            color: 'var(--bento-text-secondary)',
                            marginTop: 4,
                        }}
                    >
                        {label}
                    </div>
                </div>
            </div>
        </BentoCard>
    );
}
