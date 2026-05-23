import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products, categories } from "@/lib/data";
import { useAdminStore } from "@/store/adminStore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krishna Scale" },
      { name: "description", content: "Explore industrial and commercial digital weighing scales." },
    ],
  }),
  component: Index,
});

function Index() {
  const { settings } = useAdminStore();
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (offset: number) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const allStoreProducts = settings?.products && settings.products.length > 0 ? settings.products : products;
  const visibleSlugs = settings?.visibleProducts || products.map(p => p.slug);
  const displayProducts = allStoreProducts.filter(p => visibleSlugs.includes(p.slug));
  const activeProducts = displayProducts.length > 0 ? displayProducts : allStoreProducts;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeProducts.length]);

  const rawProduct = activeProducts[currentIndex % activeProducts.length] || activeProducts[0];
  const lang = (i18n.language as 'en'|'hi'|'gu') || 'en';
  const heroProduct = rawProduct?.translations?.[lang] || rawProduct?.translations?.en || {};

  const maskStyle = {
    maskImage: `linear-gradient(to right, ${canScrollLeft ? 'transparent' : 'black'}, black 10%, black 90%, ${canScrollRight ? 'transparent' : 'black'})`,
    WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? 'transparent' : 'black'}, black 10%, black 90%, ${canScrollRight ? 'transparent' : 'black'})`
  };

  const contact = settings?.contactInfo || {
    whatsappNumber: '919033621801',
    inquiryEmail: 'sales@krishnascale.in',
    phoneDisplay: '+91 90336 21801',
  };

  return (
    <main>
      {/* HERO / SPOTLIGHT BANNER */}
      <section className="relative bg-waves text-foreground min-h-[100vh] overflow-hidden">
        <SiteHeader />

        <div className="relative pt-24 md:pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
            {/* Left side: Tilted product image */}
            <div className="relative mx-auto max-w-lg w-full flex items-center justify-center p-6 md:p-10 order-2 md:order-1" style={{ transform: "rotate(-2deg)" }}>
              <div className="glow-halo" />
              <div className="hero-card relative p-10 w-full h-[400px] md:h-[500px] flex items-center justify-center">
                <img
                  key={rawProduct.slug}
                  src={rawProduct.img}
                  alt={heroProduct.name}
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 animate-in fade-in zoom-in-95"
                />
              </div>
            </div>

            {/* Right side: Product Info */}
            <div className="spotlight-card p-8 md:p-12 relative min-h-[400px] md:min-h-[500px] flex flex-col justify-center order-1 md:order-2">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] tracking-[0.2em] font-black px-2 py-1 border border-white/20 text-white bg-white/5">{t("KRISHNA SCALE")}</span>
                <span className="text-[10px] tracking-[0.2em] font-black px-2 py-1 border border-white/20 text-white bg-white/5">{t("INDUSTRIAL GRADE")}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f3f6fb] leading-[1.2] md:leading-[1.1] tracking-tight">
                {t("Precision Industrial Weighing Solutions")}
              </h1>
              <div className="mt-8 space-y-4 text-sm text-gray-400 max-w-md">
                <p className="text-xs tracking-[0.2em] font-bold text-gray-300 uppercase">
                  {heroProduct.name} <span className="opacity-50 mx-2">•</span> {heroProduct.capacity}
                </p>
                <p className="text-base md:text-lg opacity-90 leading-relaxed text-gray-300">{t("Manufacturing, distribution, and calibration of high-capacity scales across Gujarat.")}</p>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to={`/products/${rawProduct.slug}`} className="pill-btn pill-btn-dark w-full sm:w-auto text-center justify-center">
                  {t("EXPLORE PRODUCT")}
                </Link>
                <a href={`https://wa.me/${contact.whatsappNumber || "919033621801"}?text=Hi, I want a quote for industrial scales.`} target="_blank" rel="noopener noreferrer" className="pill-btn bg-white text-black hover:bg-gray-200 w-full sm:w-auto text-center justify-center">
                  {t("GET A QUOTE")}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center md:justify-end gap-3 flex-wrap">
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground mr-2 uppercase w-full md:w-auto text-center md:text-left mb-2 md:mb-0">{t("Switch Product Preview")}</div>
            {activeProducts.map((a, i) => (
              <button 
                key={a.slug} 
                onClick={() => setCurrentIndex(i)}
                className={`thumb-strip block hover:ring-2 hover:ring-white/50 transition-all ${currentIndex === i ? 'ring-2 ring-white scale-110 active' : 'opacity-60 hover:opacity-100'}`}
                title={a.translations[lang]?.name || a.translations.en.name}
              >
                <img src={a.img} alt={a.translations[lang]?.name || a.translations.en.name} className="w-full h-full object-contain p-2" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST METRICS BAR */}
      <section className="bg-[#06192d] text-white border-y border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl md:text-4xl font-black mb-1">10+</div>
            <div className="text-[10px] md:text-xs tracking-widest text-gray-400 uppercase font-bold">{t("Years Experience")}</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl md:text-4xl font-black mb-1 text-[#f3f6fb]">5000+</div>
            <div className="text-[10px] md:text-xs tracking-widest text-gray-400 uppercase font-bold">{t("Installations")}</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl md:text-4xl font-black mb-1">24/7</div>
            <div className="text-[10px] md:text-xs tracking-widest text-gray-400 uppercase font-bold">{t("Service Support")}</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl md:text-4xl font-black mb-1 text-red-500">GUJ</div>
            <div className="text-[10px] md:text-xs tracking-widest text-gray-400 uppercase font-bold">{t("Serving All Gujarat")}</div>
          </div>
        </div>
      </section>

      {/* PRODUCTS ROW */}
      <section id="explore" className="bg-[#020817] text-foreground py-24 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black italic text-white">{t("OUR PRODUCTS")}</h3>
            <div className="flex gap-2">
              <button onClick={() => scroll(-340)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-colors" disabled={!canScrollLeft} style={{ opacity: canScrollLeft ? 1 : 0.3 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button onClick={() => scroll(340)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-colors" disabled={!canScrollRight} style={{ opacity: canScrollRight ? 1 : 0.3 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 snap-x snap-mandatory hide-scroll" style={maskStyle}>
            {allStoreProducts.map((p, idx) => {
              const langProd = p.translations[lang] || p.translations.en;
              const isActive = activeProducts[currentIndex % activeProducts.length]?.slug === p.slug;
              return (
                <div 
                  key={p.slug}
                  onClick={() => {
                    const activeIdx = activeProducts.findIndex(ap => ap.slug === p.slug);
                    if (activeIdx !== -1) {
                      setCurrentIndex(activeIdx);
                    }
                  }}
                  className={`app-card w-[280px] md:w-[320px] flex-shrink-0 snap-center cursor-pointer flex flex-col ${isActive ? 'border-white ring-1 ring-white/30' : ''}`}
                >
                  <div className="h-[55%] w-full relative p-6 flex items-center justify-center border-b border-white/5 bg-[#0a1f38]/50">
                    <img src={p.img} alt={langProd.name} className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-2xl hover:scale-110 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
                    <div>
                      <span className="tag-chip mb-4">{langProd.tag}</span>
                      <div className="text-lg md:text-xl font-bold text-[#f3f6fb] leading-snug">{langProd.name}</div>
                      <div className="text-xs font-semibold tracking-[0.1em] text-gray-400 mt-2">{langProd.capacity}</div>
                    </div>
                    <Link to={`/products/${p.slug}`} onClick={(e) => e.stopPropagation()} className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black tracking-widest bg-white text-black px-4 py-3 rounded-full w-full uppercase hover:bg-gray-200 transition-colors">
                      {t("VIEW DETAILS")}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="bg-[#041226] py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase mb-4">{t("Industries We Serve")}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t("Providing precision engineering and heavy-duty weighing solutions across major sectors.")}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Warehouses", icon: "🏢" },
              { title: "Transport", icon: "🚚" },
              { title: "Retail Shops", icon: "🏪" },
              { title: "Agriculture", icon: "🌾" },
              { title: "Factories", icon: "🏭" },
              { title: "Jewellery", icon: "💎" },
              { title: "Grocery", icon: "🛒" },
              { title: "Logistics", icon: "📦" }
            ].map((ind, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{ind.icon}</div>
                <h4 className="text-sm md:text-base font-bold tracking-widest uppercase text-gray-300 group-hover:text-white">{t(ind.title)}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BULK INQUIRY CTA */}
      <section className="bg-red-900/20 border-t border-b border-red-500/20 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white italic mb-6">{t("NEED A CUSTOM SOLUTION OR BULK ORDER?")}</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("We provide custom platform sizes, specialized capacities, and annual maintenance contracts (AMC) for large industrial setups.")}
          </p>
          <a href={`mailto:${contact.inquiryEmail || "sales@krishnascale.com"}`} className="pill-btn bg-red-600 text-white border-none hover:bg-red-500 text-sm md:text-base px-8 py-4">
            {t("CONTACT SALES TEAM")}
          </a>
        </div>
      </section>

      {/* CATEGORY MARQUEE */}
      <section className="bg-[#041226] py-16 border-t border-white/5 overflow-hidden">
        <div className="marquee whitespace-nowrap flex items-center gap-12 md:gap-20">
          {((settings.bannerSlides || []).length > 0 ? settings.bannerSlides : [
            { text: "HEAVY DUTY PLATFORMS" },
            { text: "PRECISION CALIBRATION" },
            { text: "INDUSTRIAL GRADE" },
            { text: "100% ACCURACY ASSURED" }
          ])!.map((slide, i) => (
            <React.Fragment key={i}>
              <span className="category-text text-white/10 leading-none">{t(slide.text)}</span>
              {slide.image && <img src={slide.image} alt="" className="h-16 md:h-24 w-16 md:w-24 object-contain" loading="lazy" />}
            </React.Fragment>
          ))}
          {/* Duplicate for infinite scroll */}
          {((settings.bannerSlides || []).length > 0 ? settings.bannerSlides : [
            { text: "HEAVY DUTY PLATFORMS" },
            { text: "PRECISION CALIBRATION" },
            { text: "INDUSTRIAL GRADE" },
            { text: "100% ACCURACY ASSURED" }
          ])!.map((slide, i) => (
            <React.Fragment key={'dup-'+i}>
              <span className="category-text text-white/10 leading-none">{t(slide.text)}</span>
              {slide.image && <img src={slide.image} alt="" className="h-16 md:h-24 w-16 md:w-24 object-contain" loading="lazy" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* LOCATION & MAP SECTION */}
      <section className="relative w-full h-[500px] md:h-[600px] bg-[#020817] border-t border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <iframe 
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117506.07447470691!2d72.49392231264421!3d23.02049776997034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1s${i18n.language}!2sin!4v1716382103429!5m2!1s${i18n.language}!2sin`} 
            className="w-full h-full border-0 grayscale contrast-125 opacity-70" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="absolute inset-0 bg-[#020817]/20 z-0 pointer-events-none" />
        
        <div className="relative z-10 p-8 md:p-10 max-w-md w-[90%] mx-auto text-center rounded-2xl shadow-[0_20px_40px_rgba(2,8,23,0.3)]" style={{ background: "rgba(6, 18, 38, 0.25)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
          <h2 className="text-[10px] tracking-[0.3em] font-bold text-gray-400 mb-4 uppercase">{t("Visit Our Location")}</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#f3f6fb] mb-6 tracking-tight">{t("KRISHNA SCALE")}</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-8">
            {t("A/4-2 Aatmiya Nagar, Opposite KGM School")}<br/>
            {t("Zadeshwar, Bharuch 392011")}<br/>
            {t("Gujarat, India")}
          </p>
          <a href="https://www.google.com/maps/place/Krishna+Scale/data=!4m2!3m1!1s0x0:0x6f78f72692d6bcf2?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noopener noreferrer" className="pill-btn w-full justify-center bg-white text-black hover:bg-gray-200">
            {t("OPEN IN GOOGLE MAPS")}
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
