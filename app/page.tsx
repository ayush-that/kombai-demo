import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <div>
          <Image src="/kombai.svg" alt="Next.js logo" width={180} height={38} priority />
        </div>
        <div className="text-center text-2xl font-bold"> Vibe coded components</div>
        <section className="w-full max-w-3xl">
          <ol className="list-inside list-decimal text-left">
            <li>
              <Link href="/hero-section">Hero section</Link>
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}
