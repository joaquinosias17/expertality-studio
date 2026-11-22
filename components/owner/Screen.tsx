import { TabBar } from "./TabBar";
export function Screen({ children, tabs = true }: { children: React.ReactNode; tabs?: boolean }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <main id="main" className="flex-1 overflow-y-auto overscroll-contain pb-6">{children}</main>
      {tabs && <TabBar />}
    </div>
  );
}
