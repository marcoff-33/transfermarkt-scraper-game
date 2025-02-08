// layout without the default navbar, <MainGame /> renders a copy with added features instead

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-col ">{children}</div>;
}
