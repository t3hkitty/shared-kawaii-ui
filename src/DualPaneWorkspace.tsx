import React from 'react';
import { WidgetPanel } from './WidgetPanel';

interface DualPaneWorkspaceProps {
  leftTitle: string;
  leftIcon?: React.ReactNode;
  leftContent: React.ReactNode;
  leftHeaderControls?: React.ReactNode;
  rightTitle: string;
  rightIcon?: React.ReactNode;
  rightContent: React.ReactNode;
  rightHeaderControls?: React.ReactNode;
}

export const DualPaneWorkspace = ({ 
  leftTitle, leftIcon, leftContent, leftHeaderControls,
  rightTitle, rightIcon, rightContent, rightHeaderControls
}: DualPaneWorkspaceProps) => {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', height: 'calc(100vh - 120px)', width: '100%' }}>
      {/* Left Pane */}
      <div style={{ flex: 1, height: '100%', minWidth: 0 }}>
        <WidgetPanel 
          title={leftTitle} 
          icon={leftIcon} 
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {leftHeaderControls && (
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
              {leftHeaderControls}
            </div>
          )}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {leftContent}
          </div>
        </WidgetPanel>
      </div>

      {/* Right Pane */}
      <div style={{ flex: 1, height: '100%', minWidth: 0 }}>
        <WidgetPanel 
          title={rightTitle} 
          icon={rightIcon} 
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {rightHeaderControls && (
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
              {rightHeaderControls}
            </div>
          )}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {rightContent}
          </div>
        </WidgetPanel>
      </div>
    </div>
  );
};
