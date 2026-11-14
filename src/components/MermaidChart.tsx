import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
    chart: string;
    profile: string;
}

export function MermaidChart({ chart, profile }: MermaidChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const colors = {
            admin: { primary: '#2A2529', secondary: '#F3F0E7', line: '#DCD5D0' },
            recruiter: { primary: '#002147', secondary: '#D9BD66', line: '#DDD2C2' },
            candidate: { primary: '#7A8450', secondary: '#F8EFDA', line: '#D9D5BC' },
        };
        const theme = colors[profile as keyof typeof colors] || colors.candidate;

        mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            fontFamily: 'Inter, sans-serif',
            themeVariables: {
                primaryColor: theme.secondary,
                primaryTextColor: theme.primary,
                primaryBorderColor: theme.primary,
                lineColor: theme.primary,
            },
            flowchart: { curve: 'stepAfter', padding: 20, nodeSpacing: 50, rankSpacing: 50 },
        });

        if (containerRef.current) {
            containerRef.current.innerHTML = '';
            const id = `mermaid-${Date.now()}`;
            mermaid.render(id, chart).then(({ svg }) => {
                if (containerRef.current) containerRef.current.innerHTML = svg;
            });
        }
    }, [chart, profile]);

    return <div ref={containerRef} className="mermaid-container" />;
}