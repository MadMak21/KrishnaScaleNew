import otherside from "@/assets/otherside-hero.jpg";
import madeByApes from "@/assets/made-by-apes.jpg";
import camelot from "@/assets/camelot.jpg";
import apeExpress from "@/assets/ape-express.jpg";
import apePortal from "@/assets/ape-portal.jpg";
import blever from "@/assets/blever.jpg";
import clutch from "@/assets/clutch.jpg";

const footerImages = [otherside, madeByApes, camelot, apeExpress, apePortal, blever, clutch];

export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="stencil-box text-sm">APECHAIN</div>
        </div>
        <FooterCol title="BUILD ON APECHAIN" links={["DOCS", "MAINNET HUB", "TESTNET HUB", "BLOCK EXPLORER", "APE PORTAL"]} />
        <FooterCol title="APECOIN" links={["DISCORD", "TWITTER / X", "OTHERSIDE CALENDAR"]} />
        <FooterCol title="APECHAIN" links={["BRIDGE", "RELAY BRIDGE", "THE BLUEPRINT", "TELEGRAM", "TWITTER / X", "BRAND KIT"]} />
      </div>
      <div className="overflow-hidden border-t border-border">
        <div className="marquee py-4">
          {[...footerImages, ...footerImages, ...footerImages].map((src, i) => (
            <img key={i} src={src} alt="" className="h-40 w-72 object-cover rounded-md opacity-80" loading="lazy" />
          ))}
        </div>
      </div>
      <div className="px-6 md:px-10 py-5 flex items-center justify-between text-[10px] tracking-[0.2em] text-muted-foreground">
        <span>© 2026 APE FOUNDATION</span>
        <span>TERMS OF SERVICE | PRIVACY NOTICE</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-xs tracking-[0.2em] font-black mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-[11px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
