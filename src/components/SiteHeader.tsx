import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function SiteHeader() {
  const { t, i18n } = useTranslation();

  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-5">
      <Link to="/" className="stencil-box text-foreground text-sm tracking-widest">
        {t("KRISHNA SCALE")}
      </Link>
      <nav className="hidden md:flex items-center gap-10">
        <Link to="/" className="nav-link">{t("HOME")}</Link>
        <a href="/#explore" className="nav-link">{t("PRODUCTS")}</a>
      </nav>
      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
        <button 
          onClick={() => i18n.changeLanguage('en')}
          className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest rounded transition-colors ${i18n.language === 'en' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          English
        </button>
        <button 
          onClick={() => i18n.changeLanguage('hi')}
          className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest rounded transition-colors ${i18n.language === 'hi' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          हिन्दी
        </button>
        <button 
          onClick={() => i18n.changeLanguage('gu')}
          className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest rounded transition-colors ${i18n.language === 'gu' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          ગુજરાતી
        </button>
      </div>
    </header>
  );
}
