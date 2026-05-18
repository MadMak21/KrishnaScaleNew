import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import otherside from "@/assets/otherside-hero.jpg";

export const Route = createFileRoute("/apps/otherside")({
  head: () => ({
    meta: [
      { title: "Otherside — ApeChain" },
      { name: "description", content: "Web3-enabled virtual worlds on ApeChain. Partake in Project Dragon, play metaverse poker, explore The Swamp, Meetropolis, and beyond." },
      { property: "og:title", content: "Otherside — ApeChain" },
      { property: "og:description", content: "Web3-enabled virtual worlds on ApeChain." },
      { property: "og:image", content: otherside },
    ],
  }),
  component: OthersidePage,
});

function OthersidePage() {
  const navigate = useNavigate();
  return (
    <main className="bg-background text-foreground">
      <section className="relative min-h-screen overflow-hidden">
        <SiteHeader />

        <div className="relative pt-40 pb-32 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Tilted card */}
            <div className="relative">
              <div className="glow-halo" />
              <div className="hero-card relative" style={{ transform: "rotate(-4deg)" }}>
                <img src={otherside} alt="Otherside" className="w-full h-[420px] object-cover" />
              </div>
            </div>

            {/* Meta */}
            <div>
              <span className="tag-chip">GAMES</span>
              <h1 className="text-5xl md:text-6xl font-black italic mt-4">OTHERSIDE</h1>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mt-3">
                WEB3-ENABLED VIRTUAL WORLDS ON APECHAIN
              </p>
              <p className="text-sm text-muted-foreground mt-6 max-w-md leading-relaxed">
                Partake in a massive teamfight shooter every month in Project Dragon. Play metaverse poker with your friends. Explore The Swamp, Meetropolis, and beyond.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="https://otherside.xyz" target="_blank" rel="noreferrer" className="pill-btn">LAUNCH</a>
                <a href="#" aria-label="Website" className="circle-btn">🌐</a>
                <a href="#" aria-label="X" className="circle-btn">𝕏</a>
              </div>
            </div>
          </div>

          {/* Close */}
          <div className="flex justify-center mt-24">
            <button
              aria-label="Close"
              onClick={() => navigate({ to: "/" })}
              className="circle-btn !w-12 !h-12"
            >
              ✕
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
