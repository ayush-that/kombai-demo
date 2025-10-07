import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <Image
            src="/kombai.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className="text-center text-2xl font-bold">
          {" "}
          Vibe coded components
        </div>
        <section className="w-full max-w-3xl">
          <ol className="list-decimal list-inside text-left">
            <li>
              <Link href="/hero-section">Hero section</Link>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}
