import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminStore, type ProductData } from "@/store/adminStore";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

/* ── Helpers ── */

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ── Admin Page ── */

function AdminPage() {
  const {
    isAuthenticated, login, logout, settings,
    updateSettings, updateExploreConfig,
    updateProduct, updateProductTranslation, updateProductSpecs,
    updateProductGallery, updateContactInfo, addProduct, removeProduct,
  } = useAdminStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "madhav" && password === "MADmak@21") {
      login();
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-black/50 p-8 rounded-2xl border border-white/10 w-full max-w-md space-y-6">
          <h1 className="text-3xl font-black italic text-white text-center">ADMIN LOGIN</h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors">LOGIN</button>
        </form>
      </div>
    );
  }

  const storeProducts = settings.products || [];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-4 md:p-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-[0_20px_50px_rgba(22,163,74,0.3)] flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <svg className="w-6 h-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          <span className="font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <h1 className="text-2xl md:text-4xl font-black italic">KRISHNA SCALE ADMIN</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => showToast("✓ All changes saved and applied successfully!")}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all hover:scale-105"
            >
              SAVE CHANGES
            </button>
            <button onClick={logout} className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold">LOGOUT</button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* 1. SITE SETTINGS (WhatsApp, Email, Phone) */}
        {/* ═══════════════════════════════════════════ */}
        <SiteSettingsSection />

        {/* ═══════════════════════════════════════════ */}
        {/* 2. BANNER / MARQUEE */}
        {/* ═══════════════════════════════════════════ */}
        <BannerSection />

        {/* ═══════════════════════════════════════════ */}
        {/* 3. PRODUCT MANAGEMENT */}
        {/* ═══════════════════════════════════════════ */}
        <section className="bg-black/30 p-6 md:p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-2 text-green-400">Product Management</h2>
          <p className="text-sm text-gray-400 mb-6">Edit product details, images, descriptions, specs. Click a product to expand its editor.</p>

          <div className="space-y-4">
            {storeProducts.map(product => (
              <ProductEditor
                key={product.slug}
                product={product}
                isExpanded={expandedProduct === product.slug}
                onToggle={() => setExpandedProduct(expandedProduct === product.slug ? null : product.slug)}
                onUpdateTranslation={(lang, updates) => updateProductTranslation(product.slug, lang, updates)}
                onUpdateSpecs={(updates) => updateProductSpecs(product.slug, updates)}
                onUpdateProduct={(updates) => updateProduct(product.slug, updates)}
                onUpdateGallery={(gallery) => updateProductGallery(product.slug, gallery)}
                onRemove={() => { if (confirm(`Remove ${product.translations.en.name}?`)) removeProduct(product.slug); }}
              />
            ))}
          </div>

          {/* Add New Product */}
          <button
            onClick={() => {
              const id = `product-${Date.now()}`;
              const newProduct: ProductData = {
                id, slug: id,
                img: '',
                gallery: [],
                translations: {
                  en: { name: 'NEW PRODUCT', tag: 'NEW', sub: 'Description here', description: 'Product description', features: ['Feature 1'], capacity: '0kg' },
                  hi: { name: 'नया उत्पाद', tag: 'नया', sub: 'विवरण यहाँ', description: 'उत्पाद विवरण', features: ['विशेषता 1'], capacity: '0kg' },
                  gu: { name: 'નવું ઉત્પાદન', tag: 'નવું', sub: 'વર્ણન અહીં', description: 'ઉત્પાદન વર્ણન', features: ['વિશેષતા 1'], capacity: '0kg' },
                },
                specs: { accuracy: 'Standard Class III', material: 'MS / SS', displayType: 'LED', batteryBackup: '48 Hours', warranty: '1 Year' },
              };
              addProduct(newProduct);
              setExpandedProduct(id);
            }}
            className="mt-6 w-full py-4 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-green-500 transition-colors font-bold"
          >
            + ADD NEW PRODUCT
          </button>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* 4. PRODUCT VISIBILITY */}
        {/* ═══════════════════════════════════════════ */}
        <section className="bg-black/30 p-6 md:p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-2 text-green-400">Top Hero Spotlight & Homepage Visibility</h2>
          <p className="text-sm font-semibold text-yellow-400 mb-2">Controls the main Top Spotlight Banner, the Switch Product Preview thumbnail strip, and the homepage product grids.</p>
          <p className="text-xs text-gray-400 mb-6">Toggle off any products you wish to completely hide from the main top banner and the website's explore lists.</p>
          <div className="flex flex-wrap gap-4">
            {storeProducts.map(p => {
              const isVisible = settings.visibleProducts.includes(p.slug);
              return (
                <button
                  key={p.slug}
                  onClick={() => {
                    const newVisible = isVisible
                      ? settings.visibleProducts.filter(s => s !== p.slug)
                      : [...settings.visibleProducts, p.slug];
                    updateSettings({ visibleProducts: newVisible });
                  }}
                  className={`p-4 rounded-xl border flex items-center gap-4 w-[280px] text-left transition-all ${isVisible ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-black/40 opacity-50'}`}
                >
                  {p.img && <img src={p.img} alt="" className="w-12 h-12 object-contain bg-white/10 rounded" />}
                  <div>
                    <div className="font-bold">{p.translations.en.name}</div>
                    <div className="text-xs text-gray-400">{isVisible ? 'Visible' : 'Hidden'}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* 5. EXPLORE PAGE SETTINGS */}
        {/* ═══════════════════════════════════════════ */}
        <section className="bg-black/30 p-6 md:p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Explore Page (Details) Settings</h2>
          <div className="space-y-8">
            {storeProducts.map(p => {
              const config = settings.exploreConfig[p.slug] || {
                relatedProducts: storeProducts.filter(r => r.slug !== p.slug).slice(0, 4).map(r => r.slug),
                galleryImagesCount: 4,
              };
              return (
                <div key={p.slug} className="border border-white/5 bg-white/5 p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    {p.img && <img src={p.img} alt="" className="w-16 h-16 object-contain bg-black/50 rounded-lg p-2" />}
                    <h3 className="text-xl font-bold">{p.translations.en.name}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Number of Gallery Images to Show</label>
                      <input
                        type="number" value={config.galleryImagesCount} min="1" max="20"
                        onChange={(e) => updateExploreConfig(p.slug, { galleryImagesCount: Number(e.target.value) })}
                        className="bg-black/50 border border-white/10 rounded p-2 text-white w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Related Products to Show</label>
                      <div className="flex flex-wrap gap-2">
                        {storeProducts.filter(r => r.slug !== p.slug).map(relatedP => {
                          const isSelected = config.relatedProducts.includes(relatedP.slug);
                          return (
                            <button
                              key={relatedP.slug}
                              onClick={() => {
                                const newRelated = isSelected
                                  ? config.relatedProducts.filter(slug => slug !== relatedP.slug)
                                  : [...config.relatedProducts, relatedP.slug];
                                updateExploreConfig(p.slug, { relatedProducts: newRelated });
                              }}
                              className={`text-xs px-3 py-1.5 rounded-full border ${isSelected ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-transparent border-white/20 text-gray-400'}`}
                            >
                              {relatedP.translations.en.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* SUB-COMPONENTS                                        */
/* ═══════════════════════════════════════════════════════ */

function SiteSettingsSection() {
  const { settings, updateContactInfo } = useAdminStore();
  const contact = settings.contactInfo;

  return (
    <section className="bg-black/30 p-6 md:p-8 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-bold mb-2 text-green-400">Site Settings</h2>
      <p className="text-sm text-gray-400 mb-6">Manage contact information used across the entire website.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">WhatsApp Number (with country code, no +)</label>
          <input
            type="text" value={contact.whatsappNumber}
            onChange={(e) => updateContactInfo({ whatsappNumber: e.target.value })}
            placeholder="919033621801"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Inquiry Email</label>
          <input
            type="email" value={contact.inquiryEmail}
            onChange={(e) => updateContactInfo({ inquiryEmail: e.target.value })}
            placeholder="sales@krishnascale.in"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Phone Display Text</label>
          <input
            type="text" value={contact.phoneDisplay}
            onChange={(e) => updateContactInfo({ phoneDisplay: e.target.value })}
            placeholder="+91 90336 21801"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white"
          />
        </div>
      </div>
    </section>
  );
}

function BannerSection() {
  const { settings, updateSettings } = useAdminStore();

  return (
    <section className="bg-black/30 p-6 md:p-8 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-bold mb-2 text-green-400">Bottom Category Marquee Settings</h2>
      <p className="text-sm text-gray-400 mb-6">Upload custom images and text to scroll in the infinite category marquee at the bottom of the homepage.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(settings.bannerSlides || []).map((slide, i) => (
          <div key={slide.id} className="bg-white/5 border border-white/10 p-4 rounded-xl relative group">
            <button
              onClick={() => {
                updateSettings({ bannerSlides: settings.bannerSlides.filter(s => s.id !== slide.id) });
              }}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 z-10 font-bold"
              title="Delete Category"
            >
              ×
            </button>
            {slide.image && <img src={slide.image} alt="" className="w-full h-32 object-contain bg-black/50 rounded mb-4" />}
            <input
              type="text" value={slide.text}
              onChange={(e) => {
                const newSlides = [...settings.bannerSlides];
                newSlides[i] = { ...newSlides[i], text: e.target.value };
                updateSettings({ bannerSlides: newSlides });
              }}
              placeholder="Banner Text"
              className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm mb-2"
            />
            <label className="block cursor-pointer text-center text-xs text-gray-400 hover:text-green-400 transition-colors border border-dashed border-white/20 rounded p-2">
              Change Image
              <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 5000000) { alert("File too large! Max 5MB."); return; }
                const base64 = await fileToBase64(file);
                const newSlides = [...settings.bannerSlides];
                newSlides[i] = { ...newSlides[i], image: base64 };
                updateSettings({ bannerSlides: newSlides });
              }} />
            </label>
          </div>
        ))}

        {/* Add New Slide */}
        <div className="bg-white/5 border border-dashed border-white/30 p-4 rounded-xl flex flex-col items-center justify-center min-h-[200px] hover:bg-white/10 transition-colors">
          <label className="cursor-pointer flex flex-col items-center text-gray-400 hover:text-white transition-colors text-sm text-center">
            <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>Upload Image<br />(Max 500KB recommended)</span>
            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 5000000) { alert("File too large!"); return; }
              const base64 = await fileToBase64(file);
              updateSettings({
                bannerSlides: [...(settings.bannerSlides || []), { id: `slide-${Date.now()}`, image: base64, text: "NEW CATEGORY" }]
              });
            }} />
          </label>
        </div>
      </div>
    </section>
  );
}

/* ── Product Editor (Expandable) ── */

function ProductEditor({
  product, isExpanded, onToggle,
  onUpdateTranslation, onUpdateSpecs, onUpdateProduct, onUpdateGallery, onRemove,
}: {
  product: ProductData;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateTranslation: (lang: 'en' | 'hi' | 'gu', updates: Partial<ProductData['translations']['en']>) => void;
  onUpdateSpecs: (updates: Partial<ProductData['specs']>) => void;
  onUpdateProduct: (updates: Partial<ProductData>) => void;
  onUpdateGallery: (gallery: string[]) => void;
  onRemove: () => void;
}) {
  const [activeLang, setActiveLang] = useState<'en' | 'hi' | 'gu'>('en');
  const trans = product.translations[activeLang];

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      {/* Collapsed Header */}
      <button onClick={onToggle} className="w-full p-4 flex items-center gap-4 text-left hover:bg-white/5 transition-colors">
        {product.img && <img src={product.img} alt="" className="w-14 h-14 object-contain bg-black/50 rounded-lg p-1" />}
        <div className="flex-1">
          <div className="font-bold text-lg">{product.translations.en.name}</div>
          <div className="text-xs text-gray-400">{product.translations.en.tag} · {product.translations.en.capacity}</div>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-white/10 space-y-8">
          {/* Main Image */}
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-bold">Main Product Image</label>
            <div className="flex items-center gap-4">
              {product.img && <img src={product.img} alt="" className="w-24 h-24 object-contain bg-black/50 rounded-lg p-2" />}
              <label className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm transition-colors">
                Upload New Image
                <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const base64 = await fileToBase64(file);
                  onUpdateProduct({ img: base64 });
                }} />
              </label>
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-bold">Gallery Images (Multiple)</label>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
               {(product.gallery || []).map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} alt="" className="w-full aspect-square object-contain bg-black/50 rounded-lg p-1" />
                  <button
                    onClick={() => onUpdateGallery(product.gallery.filter((_, idx) => idx !== i))}
                    className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:scale-110 font-bold"
                    title="Delete Image"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="cursor-pointer border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center aspect-square text-gray-400 hover:text-green-400 hover:border-green-500 transition-colors text-xs">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add
                <input type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  const newImages: string[] = [];
                  for (const file of files) {
                    newImages.push(await fileToBase64(file));
                  }
                  onUpdateGallery([...(product.gallery || []), ...newImages]);
                }} />
              </label>
            </div>
          </div>

          {/* Language Tabs */}
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-bold">Product Text (Per Language)</label>
            <div className="flex gap-2 mb-4">
              {(['en', 'hi', 'gu'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${activeLang === lang ? 'bg-green-500/20 border-green-500 text-green-300' : 'border-white/20 text-gray-400'}`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'ગુજરાતી'}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Name" value={trans.name} onChange={v => onUpdateTranslation(activeLang, { name: v })} />
              <Field label="Tag" value={trans.tag} onChange={v => onUpdateTranslation(activeLang, { tag: v })} />
              <Field label="Subtitle" value={trans.sub} onChange={v => onUpdateTranslation(activeLang, { sub: v })} />
              <Field label="Capacity" value={trans.capacity} onChange={v => onUpdateTranslation(activeLang, { capacity: v })} />
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <textarea
                  value={trans.description}
                  onChange={(e) => onUpdateTranslation(activeLang, { description: e.target.value })}
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm resize-y"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Features (one per line)</label>
                <textarea
                  value={(trans.features || []).join('\n')}
                  onChange={(e) => onUpdateTranslation(activeLang, { features: e.target.value.split('\n').filter(f => f.trim()) })}
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm resize-y"
                />
              </div>
            </div>
          </div>

          {/* Specs */}
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-bold">Technical Specifications</label>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Accuracy" value={product.specs?.accuracy || ''} onChange={v => onUpdateSpecs({ accuracy: v })} />
              <Field label="Material" value={product.specs?.material || ''} onChange={v => onUpdateSpecs({ material: v })} />
              <Field label="Display Type" value={product.specs?.displayType || ''} onChange={v => onUpdateSpecs({ displayType: v })} />
              <Field label="Battery Backup" value={product.specs?.batteryBackup || ''} onChange={v => onUpdateSpecs({ batteryBackup: v })} />
              <Field label="Warranty" value={product.specs?.warranty || ''} onChange={v => onUpdateSpecs({ warranty: v })} />
            </div>
          </div>

          {/* Delete Button */}
          <button onClick={onRemove} className="text-red-500 hover:text-red-400 text-sm font-bold border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-colors">
            🗑 Remove This Product
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Simple Field Component ── */

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        type="text" value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-white text-sm"
      />
    </div>
  );
}
