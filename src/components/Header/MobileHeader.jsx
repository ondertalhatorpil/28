import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../../assets/Lago.png'

export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 1, text: "Anasayfa", target: "/", isExternalLink: true},
    { id: 2, text: "Manşetler", target: "news" },
    { id: 3, text: "Karikatürler", target: "cartoons" },
    { id: 4, text: "Albüm", target: "gallery" },
    { id: 5, text: "Belgeseller", target: "videos" },
    { id: 6, text: "Hatıranı Yaz", target: "/gecmisin-izleri", isExternalLink: true },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const handleClick = (target, isExternalLink) => {
    if (isExternalLink) {
      const fullUrl = window.location.origin + target;
      console.log("Yönlendiriliyor:", fullUrl);
      
      window.location.href = fullUrl;
      toggleMenu();
      return;
    }

    if (window.location.pathname !== '/') {
        window.location.href = `/#${target}`;
        toggleMenu();
        return;
    }

    const element = document.querySelector(`section[data-section="${target}"]`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        toggleMenu();
    }
  };

  const logoTransform = Math.min(scrollPosition / 50, 1);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-40 mt-4">
      <div className="px-4">
      <div className={`flex justify-between px-1 items-center lg:hidden ${isMenuOpen ? 'invisible' : 'visible'}`}>
      <a 
            href="/" 
            className="flex items-center transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${-logoTransform * 100}%)`,
              opacity: 1 - logoTransform,
              visibility: logoTransform >= 1 ? 'hidden' : 'visible'
            }}
          >
            <div className="relative p-1.5 overflow-hidden group">
              <img 
                src={Logo} 
                alt="28 Şubat Müzesi Logo" 
                className="h-12 w-auto relative z-10"
              />
            </div>
          </a>

          <div 
            className="flex-grow transition-all duration-300"
            style={{
              opacity: logoTransform  
            }}
          ></div>

          <button
            className="relative p-3 text-white rounded-xl overflow-hidden group ml-auto"
            onClick={toggleMenu}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#39a045]/90 to-transparent backdrop-blur-sm transition-all duration-300 group-hover:scale-110" />
            <Menu size={24} className="relative z-10" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#39a045]/98 to-[#000]/98 backdrop-blur-md z-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/path/to/pattern.png')] opacity-5" />
            
            <button
              className="fixed top-6 right-6 p-3 text-white rounded-xl overflow-hidden group z-50"
              onClick={toggleMenu}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#39a045]/90 to-transparent backdrop-blur-sm transition-all duration-300 group-hover:scale-110" />
              <X size={24} className="relative z-10" />
            </button>

            <div className="relative flex flex-col items-center justify-center h-full gap-6 px-8">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent" />
              
              {/* Logo ve Başlık */}
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="text-white/90 text-3xl font-bold">
                  28 Şubat Müzesi
                </div>
              </div>
              
              <div className="grid gap-4 w-full max-w-sm">
                {menuItems.map((item, index) => (
                  <a
                  key={item.id}
                  href={item.isExternalLink ? item.target : "#"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.target, item.isExternalLink);
                  }}
                  className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm"
                  style={{ touchAction: "manipulation" }} // Touch olayları için iyileştirme
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39a045] to-[#2d8035] translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" /> {/* pointer-events-none ekleyin */}
                  
                  <div className="relative p-4 flex items-center justify-between w-full h-full"> 
                    <span className="text-lg font-semibold text-white group-hover:scale-105 transition-transform duration-300">
                      {item.text}
                    </span>
                    <span className="text-white/60 group-hover:text-white transition-colors duration-300">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                </a>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileHeader;