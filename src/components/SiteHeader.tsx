import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("krishna_tutorial_seen_v2");
    if (!tutorialSeen) {
      const timer = setTimeout(() => setShowTutorial(true), 1000);
      return () => clearTimeout(timer);
    }
    
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 250);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenMenu = () => {
    setMenuOpen(true);
    if (showTutorial) {
      setShowTutorial(false);
      localStorage.setItem("krishna_tutorial_seen_v2", "true");
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
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center px-6 md:px-10 py-5 bg-transparent overflow-visible">
        {/* Left: Logo */}
        <div className="w-1/2 md:w-1/4 flex items-center z-50">
          <Link to="/" className="text-white text-[10px] md:text-sm font-black tracking-[0.2em] px-3 py-1.5 border border-white/20 uppercase rounded">
            {t("KRISHNA SCALE")}
          </Link>
        </div>
        
        {/* Desktop Navigation (Middle) */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 z-50">
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
        </div>

        {/* Desktop Language Switcher (Right) */}
        <div className="hidden md:flex w-1/4 justify-end items-center gap-2 z-50">
          <button onClick={() => i18n.changeLanguage('en')} className={`text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>ENGLISH</button>
          <button onClick={() => i18n.changeLanguage('hi')} className={`text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer px-2 py-1 rounded ${i18n.language === 'hi' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>हिन्दी</button>
          <button onClick={() => i18n.changeLanguage('gu')} className={`text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer px-2 py-1 rounded ${i18n.language === 'gu' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>ગુજરાતી</button>
        </div>
      </header>

      {/* Mobile Sticky Arrow Button & Tutorial (Hidden on Desktop) */}
      <div 
        className={`fixed right-0 z-[100] transition-all duration-300 md:hidden ${
          (isScrolling || showTutorial) ? 'opacity-100' : 'opacity-40 hover:opacity-100'
        }`}
        style={{ top: '25%' }}
      >
        {/* Tutorial Pointing Hand */}
        {showTutorial && !menuOpen && (
          <div className="absolute right-full mr-2 flex items-center gap-2 animate-pulse pointer-events-none w-max">
            <div className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-lg tracking-widest uppercase">
              CLICK HERE TO OPEN MENU
            </div>
            <div className="text-2xl">👉</div>
          </div>
        )}

        <button 
          onClick={() => menuOpen ? setMenuOpen(false) : handleOpenMenu()}
          className={`text-white hover:text-orange-500 focus:outline-none py-6 pl-3 pr-1 transition-all cursor-pointer backdrop-blur-md border border-r-0 border-white/20 hover:bg-[#020817]/90 shadow-[-5px_0_15px_rgba(0,0,0,0.5)] rounded-l-md flex items-center justify-center ${isScrolling ? 'bg-[#020817] opacity-80' : 'bg-[#020817]/50'}`}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-4 h-4 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
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
              <button onClick={() => { i18n.changeLanguage('en'); setMenuOpen(false); }} className={`flex-1 py-2 text-[10px] font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'en' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>ENGLISH</button>
              <button onClick={() => { i18n.changeLanguage('hi'); setMenuOpen(false); }} className={`flex-1 py-2 text-[10px] font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'hi' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>हिन्दी</button>
              <button onClick={() => { i18n.changeLanguage('gu'); setMenuOpen(false); }} className={`flex-1 py-2 text-[10px] font-bold tracking-widest rounded transition-colors cursor-pointer ${i18n.language === 'gu' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>ગુજરાતી</button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6">
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-bold">{t("Navigation")}</span>
            
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-lg font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase flex items-center gap-3">
              <span className="opacity-50 text-sm">01</span> {t("HOME")}
            </Link>
            
            <button onClick={() => scrollToSection('explore')} className="text-lg font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase flex items-center gap-3 text-left">
              <span className="opacity-50 text-sm">02</span> {t("PRODUCTS")}
            </button>

            <button onClick={() => scrollToSection('location')} className="text-lg font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase flex items-center gap-3 text-left">
              <span className="opacity-50 text-sm">03</span> {t("LOCATION")}
            </button>

            <button onClick={() => scrollToSection('contact')} className="text-lg font-black tracking-widest text-[#f3f6fb] hover:text-orange-500 transition-colors uppercase flex items-center gap-3 text-left">
              <span className="opacity-50 text-sm">04</span> {t("CONTACT US")}
            </button>
          </nav>
        </div>
      </div>

    </>
  );
}
