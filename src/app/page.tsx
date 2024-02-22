import Link from "next/link";

export default async function Home() {
  return (
    <div className="bg-red-500 flex flex-row justify-center max-w-fit">
      <Link href="/play">Play</Link>
    </div>
  );
}
