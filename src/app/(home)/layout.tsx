import Navbar from "../_components/_navbar/Navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background-mid">
      <Navbar />
      {children}
    </div>
  );
}
