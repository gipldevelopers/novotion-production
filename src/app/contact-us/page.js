// import { Mail, MapPin, Phone } from 'lucide-react';

// const QR_CODE_URL = 'https://novotionservices.com/';
// const QR_IMAGE_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(QR_CODE_URL)}`;

// export const metadata = {
//   title: 'Contact Us | Novotion',
//   description: 'Contact Novotion - Email, phone, and office locations.',
// };

// export default function ContactUsPage() {
//   return (
//     <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-12 sm:py-16">
//       <div className="w-full max-w-lg mx-auto">
//         {/* Title */}
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#0f1720] text-center mb-8">
//           Contact Us
//         </h1>

//         {/* Contact Information */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#e6e9ee] p-6 mb-6">
//           <h2 className="text-sm font-semibold text-[#6b7280] uppercase tracking-wider mb-4">
//             Contact Information
//           </h2>
//           <div className="space-y-4">
//             <a
//               href="mailto:info@novotionservices.com"
//               className="flex items-center gap-3 text-[#0f1720] hover:text-[#156CDB] transition-colors"
//             >
//               <Mail className="h-5 w-5 text-[#156CDB] shrink-0" />
//               <span>info@novotionservices.com</span>
//             </a>
//             <a
//               href="tel:+17866523950"
//               className="flex items-center gap-3 text-[#0f1720] hover:text-[#156CDB] transition-colors"
//             >
//               <Phone className="h-5 w-5 text-[#156CDB] shrink-0" />
//               <span>+1 (786) 652-3950</span>
//             </a>
//           </div>
//         </div>

//         {/* Office Locations */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#e6e9ee] p-6 mb-8">
//           <h2 className="text-sm font-semibold text-[#6b7280] uppercase tracking-wider mb-4">
//             Office Locations
//           </h2>
//           <div className="space-y-6">
//             <div>
//               <h3 className="font-semibold text-[#0f1720] mb-2">USA Office</h3>
//               <div className="flex gap-3 text-[#4b5563]">
//                 <MapPin className="h-5 w-5 text-[#156CDB] shrink-0 mt-0.5" />
//                 <address className="not-italic leading-relaxed">
//                   7345 W, Sand Lake Rd, Ste 210, Orlando, FL 32819
//                 </address>
//               </div>
//             </div>
//             <div>
//               <h3 className="font-semibold text-[#0f1720] mb-2">India Office</h3>
//               <div className="flex gap-3 text-[#4b5563]">
//                 <MapPin className="h-5 w-5 text-[#156CDB] shrink-0 mt-0.5" />
//                 <address className="not-italic leading-relaxed">
//                   Fourth floor, Streebo house, Nr DAV school, off S.G. highway,
//                   <br />
//                   DAV International school, Makarba,
//                   <br />
//                   Ahmedabad, Gujarat 380051
//                 </address>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex flex-col items-center">
//           <div className="bg-white rounded-xl shadow-sm border border-[#e6e9ee] p-6 inline-flex flex-col items-center">
//             <img
//               src={QR_IMAGE_SRC}
//               alt="QR code linking to Novotion website"
//               width={200}
//               height={200}
//               className="rounded-lg"
//             />
//             <p className="mt-4 text-sm text-[#6b7280]">
//               Scan to visit Novotion website
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


import React from 'react';
import { 
  Globe, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight,
  ChevronRight 
} from 'lucide-react';

export const metadata = {
  title: 'Novotion | Connect with Us',
  description: 'Official digital gateway for Novotion Services. Access our website, social handles, and office locations.',
};

export default function ContactUsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#fcfdfe] text-[#0f1720] flex flex-col items-center py-8 px-4 sm:px-8 font-sans">
      {/* Background Decorative Blurs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[40%] rounded-full bg-[#156CDB]/5 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[60%] h-[40%] rounded-full bg-[#156CDB]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <img
            src="/logo/novotion.png"
            alt="Novotion"
            className="h-20 w-auto mb-6"
          />
          <p className="text-[#6b7280] font-bold uppercase tracking-[0.25em] text-[11px] bg-white px-4 py-1.5 rounded-full shadow-sm border border-[#f0f2f5]">
            Innovation & Global Solutions
          </p>
        </header>

        {/* CONTENT GRID: 2 Columns on Web (One Fold), 1 Column on Mobile */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          
          {/* COLUMN 1: Website & Office Locations */}
          <div className="space-y-6 flex flex-col">
            <h3 className="text-[10px] font-black text-[#9ca3af] uppercase tracking-[0.2em] px-2">Global Presence</h3>
            
            {/* Website Highlight */}
            <a 
              href="https://novotionservices.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-6 bg-[#0f1720] rounded-[2rem] text-white shadow-2xl hover:scale-[1.01] transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div className="bg-[#156CDB] p-3 rounded-2xl shadow-lg shadow-[#156CDB]/20">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#156CDB] uppercase tracking-widest mb-0.5">Website</p>
                  <h2 className="text-lg font-bold">novotionservices.com</h2>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            </a>

            {/* Office Locations Card (Now in Column 1) */}
            <div className="flex-grow bg-white border border-[#eef1f5] rounded-[2rem] p-6 shadow-sm space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#f8fafc] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[#156CDB]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f1720]">USA Office</h4>
                  <address className="not-italic text-xs text-[#6b7280] leading-relaxed">
                    7345 W, Sand Lake Rd, Ste 210, Orlando, FL 32819
                  </address>
                </div>
              </div>

              <div className="h-px bg-[#f1f4f8] w-full" />

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#f8fafc] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[#156CDB]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f1720]">India Office</h4>
                  <address className="not-italic text-xs text-[#6b7280] leading-relaxed">
                    Fourth floor, Streebo house, Nr DAV school, off S.G. highway, DAV International school, Makarba, Ahmedabad, Gujarat 380051
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Socials & Direct Contact */}
          <div className="space-y-6 flex flex-col">
            <h3 className="text-[10px] font-black text-[#9ca3af] uppercase tracking-[0.2em] px-2">Connect & Reach Out</h3>
            
            {/* Social Links */}
            <div className="grid grid-cols-1 gap-3">
              {/* Instagram Card */}
              <a
                href="https://www.instagram.com/novotioninc_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-white border border-[#E1306C]/20 rounded-2xl shadow-sm transition-all hover:shadow-md hover:translate-x-1"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-[#E1306C] flex items-center justify-center shadow-lg shadow-[#E1306C]/20">
                      <Instagram className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#E1306C]">Instagram</span>
                    <span className="text-[11px] text-[#6b7280] font-medium tracking-tight uppercase opacity-70">
                      novotioninc_
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#E1306C]/40 group-hover:text-[#E1306C] transition-colors" />
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/company/novotion-services/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-white border border-[#0A66C2]/20 rounded-2xl shadow-sm transition-all hover:shadow-md hover:translate-x-1"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-lg shadow-[#0A66C2]/20">
                      <Linkedin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#0A66C2]">LinkedIn</span>
                    <span className="text-[11px] text-[#6b7280] font-medium tracking-tight uppercase opacity-70">
                      novotion-services
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#0A66C2]/40 group-hover:text-[#0A66C2] transition-colors" />
              </a>
            </div>

            {/* Direct Contact Card (Now in Column 2) */}
            <div className="bg-white border border-[#eef1f5] rounded-[2rem] p-6 shadow-sm space-y-6 flex-grow">
              <a href="mailto:info@novotionservices.com" className="flex items-center gap-5 group">
                <div className="h-11 w-11 rounded-2xl bg-[#f8fafc] flex items-center justify-center group-hover:bg-[#156CDB]/10 transition-colors">
                  <Mail className="h-5 w-5 text-[#156CDB]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-0.5">Email Us</span>
                  <span className="text-sm font-bold text-[#374151] group-hover:text-[#156CDB] transition-colors">
                    info@novotionservices.com
                  </span>
                </div>
              </a>
              
              <div className="h-px bg-[#f1f4f8] w-full" />

              <a href="tel:+17866523950" className="flex items-center gap-5 group">
                <div className="h-11 w-11 rounded-2xl bg-[#f8fafc] flex items-center justify-center group-hover:bg-[#156CDB]/10 transition-colors">
                  <Phone className="h-5 w-5 text-[#156CDB]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-0.5">Call Us</span>
                  <span className="text-sm font-bold text-[#374151] group-hover:text-[#156CDB] transition-colors">
                    +1 (786) 652-3950
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-12 text-center">
          <p className="text-[10px] text-[#9ca3af] font-bold uppercase tracking-[0.4em]">
            © {currentYear} Novotion Services
          </p>
        </footer>
      </div>
    </main>
  );
}







