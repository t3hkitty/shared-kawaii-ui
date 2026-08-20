import React from 'react';

interface WidgetPanelProps {
  title: string;
  icon?: React.ReactNode;
  isPinned?: boolean;
  onTogglePin?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const WidgetPanel = ({ title, icon, isPinned, onTogglePin, children, className = '', style = {} }: WidgetPanelProps) => {
  return (
    <div 
      className={`glass-panel ${isPinned ? 'pinned-tape' : ''} ${className}`}
      style={{
        padding: '1.2rem', 
        position: 'relative',
        background: 'rgba(18, 24, 38, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        ...style
      }}
    >
      {isPinned && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(251, 191, 36, 0.4)',
          border: '1px dashed #fbbf24',
          color: '#fef08a',
          fontSize: '0.65rem',
          fontWeight: '700',
          padding: '0.15rem 0.8rem',
          borderRadius: '2px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          letterSpacing: '0.05em',
          zIndex: 10
        }}>
          📌 STICKY TAPE PINNED
        </div>
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#f3f4f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {icon && <span style={{ opacity: 0.8 }}>{icon}</span>}
          {title}
        </h3>
        
        {onTogglePin && (
          <button 
            onClick={onTogglePin}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              opacity: isPinned ? 1 : 0.4,
              color: isPinned ? '#fbbf24' : '#9ca3af',
              transition: 'all 0.2s'
            }}
            title={isPinned ? 'Unpin Panel' : 'Pin Panel to Corkboard'}
          >
            📌
          </button>
        )}
      </div>

      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};
