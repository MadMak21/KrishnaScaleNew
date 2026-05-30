import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products } from "@/lib/data";
import { useAdminStore } from "@/store/adminStore";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const storeProducts = useAdminStore.getState().settings?.products || [];
    let product = storeProducts.find((p) => p.slug === params.slug);
    if (!product) {
      product = products.find((p) => p.slug === params.slug);
    }
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const prod = loaderData?.product?.translations?.en;
    return {
      meta: [
        { title: `${prod?.name || 'Product'} | Krishna Scale` },
        { name: "description", content: prod?.description },
        { property: "og:title", content: prod?.name || 'Product' },
        { property: "og:description", content: prod?.description },
        { property: "og:image", content: loaderData?.product?.img || '' },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product: loaderProduct } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as 'en'|'hi'|'gu') || 'en';
  
  const { settings, openInquiry } = useAdminStore();
  const allStoreProducts = settings?.products && settings.products.length > 0 ? settings.products : products;
  
  const rawProduct = allStoreProducts.find((p) => p.slug === loaderProduct.slug) || loaderProduct;
  const product = rawProduct?.translations?.[lang] || rawProduct?.translations?.en || {};
  
  const exploreConfig = settings?.exploreConfig?.[rawProduct.slug] || { relatedProducts: [], galleryImagesCount: 4 };

  const defaultRelated = allStoreProducts.filter(p => p.slug !== rawProduct.slug).slice(0, 4);
  const relatedProducts = exploreConfig.relatedProducts
    ? exploreConfig.relatedProducts.map(slug => allStoreProducts.find(p => p.slug === slug)).filter(Boolean) as typeof allStoreProducts
    : defaultRelated;
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Prepend main product image as the first image in display images, followed by gallery images
  const baseImages = [rawProduct.img, ...(rawProduct.gallery || [])].filter(Boolean);
  const displayImages = baseImages.slice(0, exploreConfig.galleryImagesCount || 4);
  const activeImage = displayImages[activeImgIdx] || displayImages[0];

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
  }, [activeImage]); // Run when active image changes to ensure layout effects

  const maskStyle = {
    maskImage: `linear-gradient(to right, transparent 0%, black ${canScrollLeft ? '40px' : '0px'}, black calc(100% - ${canScrollRight ? '40px' : '0px'}), transparent 100%)`,
    WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${canScrollLeft ? '40px' : '0px'}, black calc(100% - ${canScrollRight ? '40px' : '0px'}), transparent 100%)`
  };

  return (
    <main className="bg-[#020817] min-h-screen text-foreground">
      <SiteHeader />

      {/* PRODUCT HERO / GALLERY */}
      <section className="pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase flex items-center gap-2 mb-10 transition-colors w-max">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t("BACK TO PRODUCTS")}
          </Link>

          {/* Header Info */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[10px] tracking-[0.2em] font-black px-2 py-1 border border-white/20 text-white">KRISHNA SCALE</span>
              <span className="text-[10px] tracking-[0.2em] font-black px-2 py-1 border border-white/20 text-white">{product.tag}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#f3f6fb] uppercase tracking-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-sm tracking-[0.2em] text-gray-400 uppercase">
              {product.capacity}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-start">
            {/* Main Image */}
            <div className="relative group bg-black/40 border border-white/10 rounded-3xl p-12 min-h-[400px] md:min-h-[600px] flex items-center justify-center">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full max-h-[500px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* Side Images */}
            <div className="grid grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 gap-4 h-full">
              {displayImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImgIdx(i)}
                  className={`bg-black/40 border rounded-3xl p-4 md:p-6 flex items-center justify-center hover:bg-black/60 transition-colors ${activeImage === img ? 'border-white scale-95 ring-2 ring-white/20' : 'border-white/10'}`}
                >
                  <img src={img} alt="" className="w-full h-full lg:max-h-[140px] object-contain drop-shadow-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-20 grid md:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-12">
              <div>
                <h2 className="text-xs font-bold tracking-[0.2em] text-[#f3f6fb] mb-6 uppercase">{t("OVERVIEW")}</h2>
                <p className="text-base md:text-lg leading-relaxed text-gray-300">
                  {product.description}
                </p>
              </div>
              
              <div>
                <h2 className="text-xs font-bold tracking-[0.2em] text-[#f3f6fb] mb-6 uppercase">{t("KEY FEATURES")}</h2>
                <ul className="space-y-4">
                  {product.features?.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-gray-300">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm md:text-base">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] text-[#f3f6fb] mb-6 uppercase">{t("TECHNICAL SPECIFICATIONS")}</h2>
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/20">
                <table className="w-full text-left text-sm md:text-base">
                  <tbody className="divide-y divide-white/10">
                    <tr className="hover:bg-white/5 transition-colors">
                      <th className="px-6 py-4 font-bold text-gray-400 w-1/3">{t("Capacity")}</th>
                      <td className="px-6 py-4 text-white font-medium">{product.capacity}</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <th className="px-6 py-4 font-bold text-gray-400">{t("Accuracy")}</th>
                      <td className="px-6 py-4 text-white font-medium">{rawProduct.specs?.accuracy || "Standard Class III / Heavy Duty"}</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <th className="px-6 py-4 font-bold text-gray-400">{t("Material")}</th>
                      <td className="px-6 py-4 text-white font-medium">{rawProduct.specs?.material || "MS / SS (Industrial Grade)"}</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <th className="px-6 py-4 font-bold text-gray-400">{t("Display Type")}</th>
                      <td className="px-6 py-4 text-white font-medium">{rawProduct.specs?.displayType || "High Brightness Red/Green LED"}</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <th className="px-6 py-4 font-bold text-gray-400">{t("Battery Backup")}</th>
                      <td className="px-6 py-4 text-white font-medium">{rawProduct.specs?.batteryBackup || "Up to 48 Hours In-built"}</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <th className="px-6 py-4 font-bold text-gray-400">{t("Warranty")}</th>
                      <td className="px-6 py-4 text-white font-medium">{rawProduct.specs?.warranty || "1 Year Manufacturer Warranty"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-16 hidden md:flex gap-6 justify-start">
            <a 
              href={`https://wa.me/${settings.contactInfo?.whatsappNumber || "919033621801"}?text=${encodeURIComponent(
                `Hi Krishna Scale,\n\nI want to inquire about the following product:\n• Name: ${product.name}\n• Capacity: ${product.capacity}\n\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}`
              )}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pill-btn bg-green-600 hover:bg-green-500 text-white border-none text-center"
            >
              {t("WHATSAPP INQUIRY")}
            </a>
            <button 
              onClick={() => openInquiry(rawProduct.slug)} 
              className="pill-btn text-center border-white/20 hover:bg-white/10 text-white cursor-pointer"
            >
              {t("MAIL INQUIRY")}
            </button>
          </div>

          {/* RELATED PRODUCTS */}
          <div className="mt-32 pt-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-[#f3f6fb] uppercase tracking-widest">{t("RELATED PRODUCTS")}</h3>
              <div className="flex gap-2">
                <button onClick={() => scroll(-340)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-colors" disabled={!canScrollLeft} style={{ opacity: canScrollLeft ? 1 : 0.3 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button onClick={() => scroll(340)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-colors" disabled={!canScrollRight} style={{ opacity: canScrollRight ? 1 : 0.3 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scroll" style={maskStyle}>
              {relatedProducts.map((a) => {
                const prod = a.translations[lang] || a.translations.en;
                return (
                <Link to={`/products/${a.slug}`} key={a.slug} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-center bg-[#0a1f38] border border-white/10 rounded-2xl flex flex-col group hover:bg-[#0f2747] hover:border-white/20 transition-all overflow-hidden">
                  <div className="h-[55%] min-h-[200px] w-full relative border-b border-white/5 bg-black/20 p-6 flex items-center justify-center">
                    <img src={a.img} alt={prod.name} className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="flex flex-col flex-1 p-6 relative z-10 justify-between">
                    <div>
                      <span className="tag-chip self-start mb-4">{prod.tag}</span>
                      <div className="text-lg md:text-xl font-bold text-[#f3f6fb] leading-snug">{prod.name}</div>
                      <div className="text-xs font-semibold tracking-[0.1em] text-gray-400 mt-2">{prod.capacity}</div>
                    </div>
                    <div className="mt-6 inline-block text-[10px] font-bold tracking-widest bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors text-center w-full uppercase">{t("EXPLORE")}</div>
                  </div>
                </Link>
              )})}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      
      {/* STICKY MOBILE CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#020817] border-t border-white/10 p-4 z-50 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        <a 
          href={`https://wa.me/${settings.contactInfo?.whatsappNumber || "919033621801"}?text=${encodeURIComponent(
            `Hi Krishna Scale,\n\nI want to inquire about the following product:\n• Name: ${product.name}\n• Capacity: ${product.capacity}\n\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}`
          )}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 pill-btn bg-green-600 hover:bg-green-500 text-white border-none text-center justify-center text-xs py-3"
        >
          {t("WHATSAPP INQUIRY")}
        </a>
        <button 
          onClick={() => openInquiry(rawProduct.slug)} 
          className="flex-1 pill-btn text-center border-white/20 hover:bg-white/10 text-white justify-center text-xs py-3 cursor-pointer"
        >
          {t("MAIL INQUIRY")}
        </button>
      </div>
    </main>
  );
}
