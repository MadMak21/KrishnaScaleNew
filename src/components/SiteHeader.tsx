import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-5">
      <Link to="/" className="stencil-box text-foreground text-sm tracking-widest">
        APECHAIN
      </Link>
      <nav className="hidden md:flex items-center gap-10">
        <a href="#explore" className="nav-link">EXPLORE</a>
        <a href="#learn" className="nav-link">LEARN</a>
        <a href="#build" className="nav-link">BUILD</a>
        <a href="#bridge" className="nav-link">BRIDGE</a>
      </nav>
      <div className="w-[120px] hidden md:block" />
    </header>
  );
}
