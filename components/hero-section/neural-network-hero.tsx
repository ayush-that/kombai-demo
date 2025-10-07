"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

const ShaderScene = dynamic(() => import("./ShaderScene"), { ssr: false });

// ===================== HERO =====================
interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>;
  microDetails?: Array<string>;
  showBadge?: boolean;
}

export default function Hero({
  title,
  description,
  badgeText = "Generative Surfaces",
  badgeLabel = "New",
  ctaButtons = [
    { text: "Get started", href: "#get-started", primary: true },
    { text: "View showcase", href: "#showcase" },
  ],
  microDetails = [],
  showBadge = false,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const microRef = useRef<HTMLUListElement | null>(null);
  const microItem1Ref = useRef<HTMLLIElement | null>(null);
  const microItem2Ref = useRef<HTMLLIElement | null>(null);
  const microItem3Ref = useRef<HTMLLIElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headerRef.current!, {
          type: "lines",
          wordsClass: "lines",
        });

        gsap.set(split.lines, {
          filter: "blur(16px)",
          yPercent: 30,
          autoAlpha: 0,
          scale: 1.06,
          transformOrigin: "50% 100%",
        });

        if (badgeRef.current) {
          gsap.set(badgeRef.current, { autoAlpha: 0, y: -8 });
        }

        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 8 });
        }

        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }

        const microItems = [
          microItem1Ref.current,
          microItem2Ref.current,
          microItem3Ref.current,
        ].filter(Boolean);
        if (microItems.length > 0) {
          gsap.set(microItems, { autoAlpha: 0, y: 6 });
        }

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        if (badgeRef.current) {
          tl.to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.0);
        }

        tl.to(
          split.lines,
          {
            filter: "blur(0px)",
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
          },
          0.1
        );

        if (paraRef.current) {
          tl.to(
            paraRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.55"
          );
        }

        if (ctaRef.current) {
          tl.to(
            ctaRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.35"
          );
        }

        if (microItems.length > 0) {
          tl.to(
            microItems,
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.25"
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh w-full overflow-hidden"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <div
        className="bg-black absolute inset-0 -z-10 w-full h-full"
        aria-hidden
      >
        <ShaderScene />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
        {/* Contrast veil to ensure text readability regardless of shader colors */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 800px at 26% 42%, rgba(0,0,0,0.55), rgba(0,0,0,0) 60%)",
          }}
        />
      </div>
      <div className="relative flex min-h-svh w-full flex-col items-start justify-center gap-6 px-6 sm:gap-8 md:px-10 lg:px-16">
        {showBadge && (
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/15 px-3 py-1.5 backdrop-blur-md"
          >
            <span className="text-[10px] font-light uppercase tracking-[0.08em] text-orange-200/90">
              {badgeLabel}
            </span>
            <span className="h-1 w-1 rounded-full bg-orange-400/70" />
            <span className="text-xs font-light tracking-tight text-white/90">
              {badgeText}
            </span>
          </div>
        )}

        <h1
          ref={headerRef}
          className="max-w-2xl text-left text-3xl font-extralight leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            textShadow: "0 1px 2px rgba(0,0,0,.55), 0 6px 24px rgba(0,0,0,.35)",
          }}
        >
          {title}
        </h1>

        <p
          ref={paraRef}
          className="max-w-xl text-left text-base font-light leading-relaxed tracking-tight text-white/85 sm:text-lg"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,.5)" }}
        >
          {description}
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-2">
          {ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`rounded-2xl border px-5 py-3 text-sm font-light tracking-tight transition-all focus:outline-none focus:ring-2 focus:ring-orange-400/40 duration-300 ${
                button.primary
                  ? "bg-gradient-to-r from-orange-500/25 to-amber-500/25 border-orange-400/40 text-white backdrop-blur-md hover:from-orange-500/35 hover:to-amber-500/35 hover:border-orange-400/60"
                  : "border-white/20 text-white/90 hover:bg-orange-500/10 backdrop-blur-sm"
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>

        {microDetails.length > 0 && (
          <ul
            ref={microRef}
            className="mt-8 flex flex-wrap gap-6 text-xs font-extralight tracking-tight text-white/70"
          >
            {microDetails.map((detail, index) => {
              const refMap = [microItem1Ref, microItem2Ref, microItem3Ref];
              return (
                <li
                  key={index}
                  ref={refMap[index]}
                  className="flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-orange-400/70" />{" "}
                  {detail}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs font-light tracking-wide">scroll down</span>
        <div className="animate-bounce">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/60"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}
