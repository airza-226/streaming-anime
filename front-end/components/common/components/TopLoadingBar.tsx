export function TopLoadingBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-transparent">
      <div className="h-full w-1/3 animate-loading-bar bg-accent" />
    </div>
  );
}