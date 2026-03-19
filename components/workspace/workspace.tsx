import { ContextMenu } from './context-menu';

export function Workspace({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen h-svh overflow-hidden" data-workspace-bg>
      {children}
      <ContextMenu />
    </div>
  );
}
