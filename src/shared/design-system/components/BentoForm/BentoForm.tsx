import type { ReactNode } from 'react';

interface BentoFormSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export function BentoFormSection({ title, description, children }: BentoFormSectionProps) {
    return (
        <div
            style={{
                background: 'var(--bento-bg-card)',
                borderRadius: 'var(--bento-radius-lg)',
                border: '1px solid var(--bento-border-light)',
                boxShadow: 'var(--bento-shadow-card)',
                padding: 'var(--bento-space-6)',
            }}
        >
            <div style={{ marginBottom: 'var(--bento-space-5)' }}>
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
                {description && (
                    <p
                        style={{
                            margin: '4px 0 0',
                            fontSize: 'var(--bento-text-sm)',
                            color: 'var(--bento-text-secondary)',
                        }}
                    >
                        {description}
                    </p>
                )}
            </div>
            {children}
        </div>
    );
}
