import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#020817]/75 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300">
      <Link to="/" className="stencil-box text-foreground text-xs md:text-sm tracking-widest px-2.5 py-1 md:py-1.5 hover:text-orange-500 transition-colors">
        {t("KRISHNA SCALE")}
      </Link>
      
      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-10">
        <Link to="/" className="nav-link">{t("HOME")}</Link>
        <a href="/#explore" className="nav-link">{t("PRODUCTS")}</a>
        <Link to="/admin" className="nav-link text-orange-500 hover:text-orange-400 font-bold">{t("CMS ADMIN")}</Link>
      </nav>
      
      {/* Desktop Language Selectors */}
      <div className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
        <button 
          onClick={() => i18n.changeLanguage('en')}
          className={`px-3 py-1 text-xs font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'en' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          English
        </button>
        <button 
          onClick={() => i18n.changeLanguage('hi')}
          className={`px-3 py-1 text-xs font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'hi' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          हिन्दी
        </button>
        <button 
          onClick={() => i18n.changeLanguage('gu')}
          className={`px-3 py-1 text-xs font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'gu' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          ગુજરાતી
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-flex md:hidden text-white hover:text-orange-500 focus:outline-none z-50 p-2 rounded-lg border border-transparent hover:border-white/10 active:bg-white/5 transition-all cursor-pointer"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg className="w-6 h-6 transform transition-transform duration-300 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Full-Screen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#020817]/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-10 animate-in fade-in duration-300 md:hidden">
          <nav className="flex flex-col items-center gap-8">
            <Link 
              to="/" 
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase"
            >
              {t("HOME")}
            </Link>
            <a 
              href="/#explore" 
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase"
            >
              {t("PRODUCTS")}
            </a>
            <Link 
              to="/admin" 
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black tracking-widest text-orange-500 hover:text-orange-400 transition-colors uppercase"
            >
              {t("CMS ADMIN")}
            </Link>
          </nav>
          
          <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 w-[85%] max-w-xs">
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-bold">{t("Select Language")}</span>
            <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10 w-full justify-around">
              <button 
                onClick={() => { i18n.changeLanguage('en'); setMenuOpen(false); }}
                className={`px-3 py-2 text-xs font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'en' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => { i18n.changeLanguage('hi'); setMenuOpen(false); }}
                className={`px-3 py-2 text-xs font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'hi' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                हिन्दी
              </button>
              <button 
                onClick={() => { i18n.changeLanguage('gu'); setMenuOpen(false); }}
                className={`px-3 py-2 text-xs font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'gu' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                ગુજરાતી
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
