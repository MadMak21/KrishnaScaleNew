import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useAdminStore } from "@/store/adminStore";

export function SiteFooter() {
  const { t } = useTranslation();
  const { settings } = useAdminStore();
  const contact = settings.contactInfo;

  return (
    <footer className="bg-[#020817] text-foreground border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
        <div className="space-y-6">
          <div className="text-xl font-extrabold tracking-widest text-[#f3f6fb]">{t("KRISHNA SCALE")}</div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            {t("Precision industrial weighing solutions. Manufacturing, distribution, and calibration of high-capacity scales across Gujarat.")}
          </p>
        </div>

        <FooterCol 
          title={t("PRODUCTS")} 
          links={[
            { label: t("Platform Scales"), href: "/#explore" },
            { label: t("Hanging Scales"), href: "/#explore" },
            { label: t("Table Top Scales"), href: "/#explore" },
            { label: t("Crane Scales"), href: "/#explore" },
            { label: t("Jewellery Scales"), href: "/#explore" }
          ]} 
        />
        
        <FooterCol 
          title={t("SERVICES")} 
          links={[
            { label: t("Annual Maintenance (AMC)"), href: "#" },
            { label: t("Stamping & Calibration"), href: "#" },
            { label: t("Repair & Servicing"), href: "#" },
            { label: t("Custom Weighing Solutions"), href: "#" }
          ]} 
        />
        
        <div>
          <h4 className="text-xs tracking-[0.2em] font-bold mb-6 text-[#f3f6fb]">{t("CONTACT US")}</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>{t("A/4-2 Aatmiya Nagar, Opposite KGM School")}, {t("Zadeshwar, Bharuch 392011")}</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>{contact.phoneDisplay || "+91 90336 21801"}</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>{contact.inquiryEmail || "sales@krishnascale.com"}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest text-gray-500">
        <span>© {new Date().getFullYear()} {t("KRISHNA SCALE")}. {t("ALL RIGHTS RESERVED")}.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">{t("PRIVACY POLICY")}</a>
          <a href="#" className="hover:text-white transition-colors">{t("TERMS OF SERVICE")}</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-xs tracking-[0.2em] font-bold mb-6 text-[#f3f6fb]">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
