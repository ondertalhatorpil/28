import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Logo from '../../assets/Lago.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black/90 overflow-hidden md:mt-30 lg:mt-60">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#39a045" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top Wave SVG - Korundu */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-10">
        <svg className="w-full h-12" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path 
            d="M0 10 Q 25 0, 50 10 T 100 10 V 0 H 0 Z" 
            fill="#39a045" 
            fillOpacity="0.1"
          />
        </svg>
      </div>

      {/* Main Content - Sadeleştirildi */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <img src={Logo} alt="ÖNDER Logo" className="h-16 object-contain mb-4" />
            <p className="text-white/80 text-sm text-center md:text-left">
              Bu Site Bir ÖNDER İmamhatipliler Derneği Projesidir.
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <a href="mailto:info@onder.org.tr" 
              className="group flex items-center gap-3 text-white/80 hover:text-[#39a045] transition-all duration-300">
              <Mail className="h-4 w-4" />
              <span className="text-sm">onder@onder.org.tr</span>
            </a>
            <a href="tel:+902124584411" 
              className="group flex items-center gap-3 text-white/80 hover:text-[#39a045] transition-all duration-300">
              <Phone className="h-4 w-4" />
              <span className="text-sm">0 (212) 521 19 58</span>
            </a>
            <p className="text-white/60 text-xs text-center md:text-right mt-2">
                Akşemsettin Mh. Şair Fuzuli Sk. No: 22 Fatih - İstanbul
            </p>
          </div>
        </div>

        {/* Bottom Bar - Sadeleştirildi */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">
            © {currentYear} ÖNDER İmam Hatipliler Derneği. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;