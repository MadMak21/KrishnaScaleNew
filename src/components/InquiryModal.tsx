import React, { useState, useEffect } from "react";
import { useAdminStore } from "@/store/adminStore";
import { useTranslation } from "react-i18next";

export function InquiryModal() {
  const { t } = useTranslation();
  const { settings, isInquiryOpen, inquiryProductSlug, closeInquiry } = useAdminStore();
  const productsList = settings?.products || [];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isInquiryOpen) {
      setSelectedProduct(inquiryProductSlug || "");
      // Reset inputs on open
      setName("");
      setPhone("");
      setCompany("");
      setCity("");
      setMessage("");
    }
  }, [inquiryProductSlug, isInquiryOpen]);

  if (!isInquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !selectedProduct) {
      alert("Please fill in all required fields (*).");
      return;
    }

    const emailTo = settings?.contactInfo?.inquiryEmail || "sales@krishnascale.in";
    const matchedProduct = productsList.find(p => p.slug === selectedProduct);
    const productName = selectedProduct === "others"
      ? "Other / Custom Weighing Scale"
      : matchedProduct?.translations?.en?.name || selectedProduct.toUpperCase();

    const subject = encodeURIComponent(`Product Inquiry: ${productName} - Krishna Scale`);
    const body = encodeURIComponent(
      `Hello Krishna Scale Team,\n\n` +
      `I would like to inquire about: ${productName}\n\n` +
      `My Details:\n` +
      `- Name: ${name}\n` +
      `- Phone: ${phone}\n` +
      `- Company Name: ${company || "N/A"}\n` +
      `- City: ${city || "N/A"}\n\n` +
      `Message/Requirements:\n` +
      `${message || "No additional requirements specified."}\n\n` +
      `Thank you.`
    );

    // Auto-draft mail using mailto redirect
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    closeInquiry();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#061226] border border-white/10 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200">
        
        {/* Header banner with brand */}
        <div className="bg-[#0a1f38] px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-white uppercase italic">{t("Inquiry Form")}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{t("Submit details to draft your email instantly")}</p>
          </div>
          <button 
            onClick={closeInquiry}
            className="text-gray-400 hover:text-white text-3xl font-light focus:outline-none transition-colors w-8 h-8 flex items-center justify-center cursor-pointer"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">First Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">Phone *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Name"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Your City"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">Which product would you be interested to Inquire *</label>
            <select
              required
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-[#061226]">Select a product</option>
              {productsList.map((p) => (
                <option key={p.slug} value={p.slug} className="bg-[#061226]">
                  {p.translations.en.name} ({p.translations.en.capacity})
                </option>
              ))}
              <option value="others" className="bg-[#061226]">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">Message / Requirements</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your weighing scale requirements..."
              rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white rounded-xl py-3.5 px-6 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_12px_rgba(249,115,22,0.3)]"
          >
            <span>Draft Inquiry Mail</span>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
