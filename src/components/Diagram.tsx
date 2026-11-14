import { ReactNode } from 'react';

interface DiagramProps {
    children: ReactNode;
    className?: string;
}

/**
 * Contenedor base para diagramas. Utiliza CSS Grid para la estructura
 * y un overlay SVG (definido en el CSS) para los conectores.
 */
export function Diagram({ children, className = '' }: DiagramProps) {
    return (
        <div className={`diagram-container ${className}`}>
            <div className="diagram-connectors" aria-hidden="true" />
            <div className="diagram-content">{children}</div>
        </div>
    );
}

export function DiagramRow({ children, className = '' }: DiagramProps) {
    return <div className={`diagram-row ${className}`}>{children}</div>;
}

export function DiagramCol({ children, className = '' }: DiagramProps) {
    return <div className={`diagram-col ${className}`}>{children}</div>;
}

interface DiagramNodeProps {
    children: ReactNode;
    variant?: 'access' | 'menu' | 'role' | 'action' | 'default';
    color?: 'admin' | 'recruiter' | 'candidate';
    className?: string;
}

/**
 * Nodo individual del diagrama. El estilo se controla mediante clases
 * de Tailwind y variables CSS para respetar los colores de cada perfil.
 */
export function DiagramNode({ children, variant = 'default', color, className = '' }: DiagramNodeProps) {
    const variantClasses: Record<string, string> = {
        access: 'diagram-node--access',
        menu: 'diagram-node--menu',
        role: 'diagram-node--role',
        action: 'diagram-node--action',
        default: 'diagram-node--default',
    };

    const colorClasses: Record<string, string> = {
        admin: 'diagram-node--admin',
        recruiter: 'diagram-node--recruiter',
        candidate: 'diagram-node--candidate',
    };

    const classes = [
        'diagram-node',
        variantClasses[variant],
        color ? colorClasses[color] : '',
        className,
    ].filter(Boolean).join(' ');

    return <div className={classes}>{children}</div>;
}