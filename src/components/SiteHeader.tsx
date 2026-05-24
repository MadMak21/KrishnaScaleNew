import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("krishna_tutorial_seen");
    if (!tutorialSeen) {
      setShowTutorial(true);
    }
  }, []);

  const handleOpenMenu = () => {
    setMenuOpen(true);
    if (showTutorial) {
      setShowTutorial(false);
      localStorage.setItem("krishna_tutorial_seen", "true");
    }
  };

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    // Add slight delay to allow drawer to close before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'contact') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 bg-transparent overflow-visible">
        <Link to="/" className="text-white text-xs md:text-sm font-black tracking-[0.2em] px-2 py-1 uppercase z-50">
          {t("KRISHNA SCALE")}
        </Link>
        
        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 z-50 bg-[#020817]/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
          <Link to="/" className="text-xs font-bold tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase">
            {t("HOME")}
          </Link>
          <button onClick={() => scrollToSection('explore')} className="text-xs font-bold tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase cursor-pointer">
            {t("PRODUCTS")}
          </button>
          <button onClick={() => scrollToSection('location')} className="text-xs font-bold tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase cursor-pointer">
            {t("LOCATION")}
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-xs font-bold tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase cursor-pointer">
            {t("CONTACT US")}
          </button>

          <div className="w-px h-4 bg-white/20 mx-2" />

          {/* Desktop Language Switcher */}
          <div className="flex items-center gap-2">
            {(['en', 'hi', 'gu'] as const).map((lang) => (
              <button 
                key={lang}
                onClick={() => i18n.changeLanguage(lang)}
                className={`text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer px-2 py-1 rounded ${i18n.language === lang ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Sticky Arrow Button & Tutorial (Hidden on Desktop) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 md:hidden flex items-center">
        {/* Tutorial Pointing Hand */}
        {showTutorial && !menuOpen && (
          <div className="absolute right-full mr-2 flex items-center gap-2 animate-pulse pointer-events-none w-max">
            <div className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-lg tracking-widest uppercase">
              Click to open menu
            </div>
            <div className="text-2xl">👉</div>
          </div>
        )}

        <button 
          onClick={() => menuOpen ? setMenuOpen(false) : handleOpenMenu()}
          className="text-white hover:text-orange-500 focus:outline-none p-3 pl-4 transition-all cursor-pointer bg-[#020817]/90 backdrop-blur-md border border-r-0 border-white/20 hover:bg-[#020817] shadow-[-5px_0_15px_rgba(0,0,0,0.5)] rounded-l-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Background Overlay (Click to close) */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-300 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Side Drawer (Hidden on Desktop) */}
      <div className={`fixed top-0 right-0 bottom-0 w-72 sm:w-80 bg-[#020817] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-50 transform transition-transform duration-300 ease-out border-l border-white/10 flex flex-col md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <span className="text-xs font-black tracking-widest text-orange-500 uppercase">{t("MENU")}</span>
          <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-10">
          
          {/* Language Switcher */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-bold">{t("Language")}</span>
            <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/10 w-full justify-between">
              {(['en', 'hi', 'gu'] as const).map((lang) => (
                <button 
                  key={lang}
                  onClick={() => { i18n.changeLanguage(lang); setMenuOpen(false); }}
                  className={`flex-1 py-2 text-xs font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === lang ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'HI' : 'GU'}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6">
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-bold">{t("Navigation")}</span>
            
            <Link 
              to="/" 
              onClick={() => setMenuOpen(false)}
              className="text-lg font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase flex items-center gap-3"
            >
              <span className="opacity-50 text-sm">01</span> {t("HOME")}
            </Link>
            
            <button 
              onClick={() => scrollToSection('explore')}
              className="text-lg font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase flex items-center gap-3 text-left"
            >
              <span className="opacity-50 text-sm">02</span> {t("PRODUCTS")}
            </button>

            <button 
              onClick={() => scrollToSection('location')}
              className="text-lg font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase flex items-center gap-3 text-left"
            >
              <span className="opacity-50 text-sm">03</span> {t("LOCATION")}
            </button>

            <button 
              onClick={() => scrollToSection('contact')}
              className="text-lg font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase flex items-center gap-3 text-left"
            >
              <span className="opacity-50 text-sm">04</span> {t("CONTACT US")}
            </button>
          </nav>
        </div>
      </div>

    </>
  );
}
