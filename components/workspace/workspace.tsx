export function Workspace({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen h-svh overflow-hidden">
      {children}
    </div>
  );
}
