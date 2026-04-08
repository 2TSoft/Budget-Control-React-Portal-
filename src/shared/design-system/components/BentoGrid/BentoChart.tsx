import { BentoCard } from './BentoCard';
import type { ReactNode } from 'react';

interface BentoChartProps {
    title: string;
    subtitle?: string;
    span?: 1 | 2;
    children: ReactNode;
}

export function BentoChart({ title, subtitle, span = 2, children }: BentoChartProps) {
    return (
        <BentoCard span={span}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: 'var(--bento-text-lg)',
                            fontWeight: 'var(--bento-weight-semibold)',
                            color: 'var(--bento-text)',
                        }}
                    >
                        {title}
                    </h3>
                    {subtitle && (
                        <p
                            style={{
                                margin: '4px 0 0',
                                fontSize: 'var(--bento-text-sm)',
                                color: 'var(--bento-text-secondary)',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
                <div style={{ flex: 1, minHeight: 200 }}>
                    {children}
                </div>
            </div>
        </BentoCard>
    );
}
