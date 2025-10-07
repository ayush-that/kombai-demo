"use client";

import Hero from "@/components/hero-section/neural-network-hero";

export default function HeroSectionPreview() {
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Hero
        title="Lorem ipsum dolor sit amet."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        badgeText="Reactive Canvas"
        badgeLabel="Live"
        showBadge={false}
        ctaButtons={[
          { text: "Lorem ipsum", href: "#build", primary: true },
          { text: "Dolor sit amet", href: "#examples" },
        ]}
        microDetails={[]}
      />
    </div>
  );
}
