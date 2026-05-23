import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function SiteHeader() {
  const { t, i18n } = useTranslation();

  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-3 md:px-10 py-4 md:py-5">
      <Link to="/" className="stencil-box text-foreground text-[10px] md:text-sm tracking-widest px-2 md:px-3 py-1 md:py-1.5">
        {t("KRISHNA SCALE")}
      </Link>
      <nav className="flex items-center gap-3 md:gap-10">
        <Link to="/" className="nav-link text-[10px] md:text-[0.78rem]">{t("HOME")}</Link>
        <a href="/#explore" className="nav-link text-[10px] md:text-[0.78rem]">{t("PRODUCTS")}</a>
      </nav>
      <div className="flex items-center gap-0.5 md:gap-1 bg-black/40 p-0.5 md:p-1 rounded-lg border border-white/10">
        <button 
          onClick={() => i18n.changeLanguage('en')}
          className={`px-1.5 md:px-3 py-0.5 md:py-1 text-[8px] md:text-xs font-bold tracking-widest rounded transition-colors ${i18n.language === 'en' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          English
        </button>
        <button 
          onClick={() => i18n.changeLanguage('hi')}
          className={`px-1.5 md:px-3 py-0.5 md:py-1 text-[8px] md:text-xs font-bold tracking-widest rounded transition-colors ${i18n.language === 'hi' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          हिन्दी
        </button>
        <button 
          onClick={() => i18n.changeLanguage('gu')}
          className={`px-1.5 md:px-3 py-0.5 md:py-1 text-[8px] md:text-xs font-bold tracking-widest rounded transition-colors ${i18n.language === 'gu' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          ગુજરાતી
        </button>
      </div>
    </header>
  );
}
