import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import otherside from "@/assets/otherside-hero.jpg";
import madeByApes from "@/assets/made-by-apes.jpg";
import camelot from "@/assets/camelot.jpg";
import apePortal from "@/assets/ape-portal.jpg";
import apeExpress from "@/assets/ape-express.jpg";
import blever from "@/assets/blever.jpg";
import clutch from "@/assets/clutch.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ApeChain — The home for ApeCoin and BAYC" },
      { name: "description", content: "Explore web3-enabled apps, games, and worlds built on ApeChain." },
      { property: "og:title", content: "ApeChain" },
      { property: "og:description", content: "Explore web3-enabled apps, games, and worlds built on ApeChain." },
    ],
  }),
  component: Index,
});

const apps = [
  { name: "OTHERSIDE", tag: "GAMES", sub: "WEB3-ENABLED VIRTUAL WORLDS ON APECHAIN", img: otherside, slug: "otherside" },
  { name: "MADE BY APES", tag: "INTELLECTUAL PROPERTY", sub: "A CLUB FULL OF BUILDERS", img: madeByApes, slug: "made-by-apes" },
  { name: "BLEVER", tag: "COLLECTIBLES", sub: "AN NFT LAUNCHPAD FOR APECHAIN", img: blever, slug: "blever" },
  { name: "APE EXPRESS", tag: "FINANCE", sub: "THE ULTIMATE MEMECOIN PLATFORM", img: apeExpress, slug: "ape-express" },
  { name: "CAMELOT", tag: "FINANCE", sub: "DECENTRALIZED EXCHANGE", img: camelot, slug: "camelot" },
  { name: "APE PORTAL", tag: "INFRASTRUCTURE", sub: "GET ON APECHAIN", img: apePortal, slug: "ape-portal" },
  { name: "CLUTCH MARKETS", tag: "GAMES, FINANCE", sub: "DECENTRALIZED PARLAY PLATFORM", img: clutch, slug: "clutch" },
];

const categories = ["GAMES", "INTELLECTUAL PROPERTY", "COLLECTIBLES", "FINANCE", "INFRASTRUCTURE"];

function Index() {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-waves text-foreground min-h-[100vh] overflow-hidden">
        <SiteHeader />

        <div className="relative pt-32 md:pt-40 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
          {/* Tilted hero card */}
          <div className="relative mx-auto max-w-5xl">
            <div className="glow-halo" />
            <div className="hero-card relative">
              <img
                src={otherside}
                alt="Otherside virtual world featuring apes in a neon-lit dock scene"
                width={1536}
                height={896}
                className="w-full h-[42vh] md:h-[58vh] object-cover"
              />
            </div>

            {/* Right side carousel arrows */}
            <div className="absolute right-2 md:-right-2 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
              <button aria-label="Next" className="circle-btn">▶</button>
              <button aria-label="Prev" className="circle-btn">◀</button>
            </div>
          </div>

          {/* Hero meta */}
          <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="tag-chip bg-glow-orange/30">🔥 HOT</span>
                <span className="tag-chip">GAMES</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tight">OTHERSIDE</h1>
              <p className="mt-2 text-xs md:text-sm tracking-[0.2em] text-muted-foreground">
                WEB3-ENABLED VIRTUAL WORLDS ON APECHAIN
              </p>
              <div className="mt-5">
                <Link to="/apps/otherside" className="pill-btn">LAUNCH</Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-[10px] tracking-[0.25em] text-muted-foreground mr-2">SEE ALL APPS ▶</div>
              {apps.slice(1, 6).map((a) => (
                <div key={a.slug} className="thumb-strip">
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPOTLIGHT */}
      <section className="bg-sky-soft py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="spotlight-card p-10 relative" style={{ transform: "rotate(-2deg)" }}>
            <div className="flex gap-2 mb-6">
              <span className="text-[10px] tracking-[0.2em] font-black px-2 py-1 border border-ink/30 text-ink">APECHAIN</span>
              <span className="text-[10px] tracking-[0.2em] font-black px-2 py-1 border border-ink/30 text-ink">SPOTLIGHT</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic text-ink leading-[0.95]">
              WHERE DAPPS<br />SHINE & YOU WIN
            </h2>
            <div className="mt-6 space-y-3 text-sm text-ink-muted max-w-md">
              <p>Spotlight will be broken down into rounds, with each one specifically tailored to the highlighted project(s). This ensures what creators are building is amplified and elevated, while encouraging community participation.</p>
              <p>At each round's end, the top <strong>APE</strong> placements score epic prizes made up of exclusive IRL, holy sh*t experiences and other unforgettable rewards.</p>
              <p>Simple, fun, rewarding. Ready to make your mark? 🦍✨</p>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="pill-btn pill-btn-dark">GET STARTED</button>
              <button className="pill-btn">GO SPOTLIGHT</button>
            </div>
          </div>

          <div className="relative" style={{ transform: "rotate(4deg)" }}>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/40 bg-black">
              <img src={clutch} alt="Clutch Markets" className="w-full h-[380px] object-cover" loading="lazy" />
              <div className="p-6 bg-gradient-to-t from-black to-black/60 -mt-20 relative">
                <h3 className="text-2xl font-black italic">CLUTCH MARKETS</h3>
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground mt-1">DECENTRALIZED PARLAY PLATFORM ON APECHAIN.</p>
                <button className="pill-btn mt-4">WHAT'S THIS</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPS GRID */}
      <section id="explore" className="bg-sky-soft pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black italic text-ink">🚀 APECHAIN APPS</h3>
            <a href="#" className="text-[10px] tracking-[0.25em] text-ink">SEE ALL APPS ▶</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {apps.map((a) => (
              <div key={a.slug} className="app-card">
                <img src={a.img} alt={a.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="app-card-content text-foreground">
                  <span className="tag-chip self-start">{a.tag}</span>
                  <div>
                    <div className="text-xl font-black italic">{a.name}</div>
                    <div className="text-[10px] tracking-[0.2em] text-muted-foreground mt-1">{a.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY MARQUEE */}
      <section className="bg-sky-soft pb-24 overflow-hidden">
        <div className="marquee whitespace-nowrap">
          {[...categories, ...categories, ...categories].map((c, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="category-text">{c}</span>
              <img src={[otherside, camelot, apePortal, blever, madeByApes][i % 5]} alt="" className="h-16 w-16 rounded-md object-cover" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="pill-btn pill-btn-dark">BROWSE ALL APPS</button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
