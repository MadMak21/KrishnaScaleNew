import { useAdminStore } from "@/store/adminStore";

export function WhatsAppFloatingButton() {
  const { settings } = useAdminStore();
  const whatsappNumber = settings?.contactInfo?.whatsappNumber || "919033621801";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to inquire about digital weighing scales.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      {/* Ripple animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none -z-10" />
      
      {/* WhatsApp SVG Icon */}
      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.303 9.865-9.59 0-2.56-1.012-4.965-2.85-6.734-1.838-1.77-4.28-2.746-6.88-2.748-5.439 0-9.865 4.303-9.868 9.59-.001 1.702.459 3.368 1.332 4.795l-.991 3.616 3.767-.984zm11.233-6.84c-.29-.145-1.713-.846-1.978-.942-.265-.096-.458-.145-.65.145-.192.29-.746.942-.914 1.134-.168.192-.337.217-.627.072-1.716-.856-2.998-1.517-4.004-3.237-.265-.453.265-.42.759-1.405.083-.168.041-.314-.02-.459-.06-.145-.458-1.104-.627-1.51-.165-.396-.333-.342-.458-.348-.119-.006-.256-.007-.393-.007-.137 0-.361.051-.55.256-.189.206-.723.707-.723 1.724 0 1.017.74 2.003.843 2.141.103.137 1.455 2.221 3.524 3.113.492.212.877.34 1.177.435.495.158.946.135 1.3.083.396-.058 1.713-.699 1.953-1.376.24-.676.24-1.256.168-1.376-.072-.12-.265-.192-.555-.337z"/>
      </svg>
    </a>
  );
}
