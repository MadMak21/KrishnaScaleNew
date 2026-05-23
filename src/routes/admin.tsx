import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminStore } from "@/store/adminStore";
import { products as rawProducts, categories as defaultCategories } from "@/lib/data";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { isLoggedIn, login, logout, settings, updateSettings, updateExploreConfig } = useAdminStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "madhav" && password === "MADmak@21") {
      login();
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-black/50 p-8 rounded-2xl border border-white/10 w-full max-w-md space-y-6">
          <h1 className="text-3xl font-black italic text-white text-center">ADMIN LOGIN</h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
            />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors">
            LOGIN
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <h1 className="text-4xl font-black italic">KRISHNA SCALE ADMIN</h1>
          <button onClick={logout} className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold">
            LOGOUT
          </button>
        </div>

        {/* BANNER SETTINGS */}
        <section className="bg-black/30 p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Independent Banner / Marquee Settings</h2>
          <p className="text-sm text-gray-400 mb-6">Upload custom images (Max 5MB total) and text to scroll in the marquee. This is completely separate from the products list.</p>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(settings.bannerSlides || []).map((slide, i) => (
                <div key={slide.id} className="bg-white/5 border border-white/10 p-4 rounded-xl relative group">
                  <button 
                    onClick={() => {
                      const newSlides = (settings.bannerSlides || []).filter(s => s.id !== slide.id);
                      updateSettings({ bannerSlides: newSlides });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <img src={slide.image} alt="Banner Preview" className="w-full h-32 object-contain bg-black/50 rounded mb-4" />
                  <input 
                    type="text" 
                    value={slide.text}
                    onChange={(e) => {
                      const newSlides = [...(settings.bannerSlides || [])];
                      newSlides[i].text = e.target.value;
                      updateSettings({ bannerSlides: newSlides });
                    }}
                    placeholder="Banner Text"
                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"
                  />
                </div>
              ))}

              {/* Add New Slide */}
              <div className="bg-white/5 border border-dashed border-white/30 p-4 rounded-xl flex flex-col items-center justify-center h-full min-h-[200px] hover:bg-white/10 transition-colors">
                <label className="cursor-pointer flex flex-col items-center text-gray-400 hover:text-white transition-colors text-sm text-center">
                  <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  <span>Upload Image<br/>(Max 500KB recommended)</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 5000000) {
                        alert("File too large! Please keep it under 5MB.");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const base64 = ev.target?.result as string;
                        updateSettings({
                          bannerSlides: [
                            ...(settings.bannerSlides || []),
                            { id: `slide-${Date.now()}`, image: base64, text: "NEW CATEGORY" }
                          ]
                        });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS PAGE SETTINGS */}
        <section className="bg-black/30 p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Products List Visibility</h2>
          <p className="text-gray-400 mb-4 text-sm">Select which products should be visible on the main products page.</p>
          <div className="flex flex-wrap gap-4">
            {rawProducts.map(p => {
              const isVisible = settings.visibleProducts.includes(p.slug);
              return (
                <button 
                  key={p.slug}
                  onClick={() => {
                    const newVisible = isVisible 
                      ? settings.visibleProducts.filter(slug => slug !== p.slug)
                      : [...settings.visibleProducts, p.slug];
                    updateSettings({ visibleProducts: newVisible });
                  }}
                  className={`p-4 rounded-xl border flex items-center gap-4 w-[300px] text-left transition-all ${isVisible ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-black/40 opacity-50'}`}
                >
                  <img src={p.img} alt={p.slug} className="w-12 h-12 object-contain bg-white/10 rounded" />
                  <div>
                    <div className="font-bold">{p.translations.en.name}</div>
                    <div className="text-xs text-gray-400">{isVisible ? 'Visible' : 'Hidden'}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* EXPLORE PAGE SETTINGS */}
        <section className="bg-black/30 p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Explore Page (Details) Settings</h2>
          <div className="space-y-8">
            {rawProducts.map(p => {
              const config = settings.exploreConfig[p.slug] || { relatedProducts: rawProducts.filter(r => r.slug !== p.slug).slice(0, 4).map(r => r.slug), galleryImagesCount: 4 };
              return (
                <div key={p.slug} className="border border-white/5 bg-white/5 p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={p.img} alt={p.slug} className="w-16 h-16 object-contain bg-black/50 rounded-lg p-2" />
                    <h3 className="text-xl font-bold">{p.translations.en.name}</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Number of Gallery Images to Show</label>
                      <input 
                        type="number" 
                        value={config.galleryImagesCount}
                        onChange={(e) => updateExploreConfig(p.slug, { galleryImagesCount: Number(e.target.value) })}
                        className="bg-black/50 border border-white/10 rounded p-2 text-white w-full"
                        min="1"
                        max="10"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Related Products to Show</label>
                      <div className="flex flex-wrap gap-2">
                        {rawProducts.filter(r => r.slug !== p.slug).map(relatedP => {
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
