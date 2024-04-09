export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-screen flex-col pb-20">{children}</div>;
}
