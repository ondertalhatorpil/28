import React, { useEffect, useState } from 'react';
import DesktopImage from '../../assets/slider.jpg';
import MobileImage from '../../assets/mobil-slider.jpg';

const SingleImageBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Ekran boyutunu kontrol eden fonksiyon
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    // İlk yüklenmede kontrol et
    checkIsMobile();
    
    // Ekran boyutu değiştiğinde kontrol et
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-7 py-8 relative z-10 pt-20">
        <div className="flex flex-col items-center justify-center">
          {/* Başlık ve alt başlık - Sadece masaüstünde görünür */}
          {!isMobile && (
            <div className="max-w-3xl mx-auto mb-4 md:mb-6 text-center">
              <div className="inline-block mb-2">
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                28 Şubat<span className="text-[#39a045]">.</span> Sürecinde Yaşananlar
              </h1>
              <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Türk siyasi tarihine "postmodern darbe" olarak geçen 28 Şubat 1997 ve sonrasında yaşanan toplumsal olaylar...
              </p>
            </div>
          )}

          {/* Görsel bölümü - dikey ortalanmış */}
          <div className="relative max-w-5xl mx-auto">
            {/* Dekoratif çerçeve unsurları - hem mobil hem masaüstünde görünür */}
            <div className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-[#39a045] z-20"></div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r-2 border-b-2 border-[#39a045] z-20"></div>
            
            {/* Mobil veya masaüstü görsel */}
            <div className="relative">
              {/* Görsel içeriği */}
              <div className="relative overflow-hidden">
                {isMobile ? (
                  <img
                    src={MobileImage}
                    alt="28 Şubat Süreci"
                    className="w-full h-full object-contain max-h-[calc(100vh-100px)]"
                  />
                ) : (
                  <div className="flex justify-center items-center">
                    <img
                      src={DesktopImage}
                      alt="28 Şubat Süreci"
                      className="w-4/5 max-w-4xl object-contain"
                      style={{ maxHeight: "calc(100vh - 300px)" }}
                    />
                  </div>
                )}
                
                {/* Tema aksanı - sol kenar çizgisi - her iki görünümde de var */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#39a045]/50"></div>
              </div>
            </div>
            
            {/* Altyazı/kaynak bilgisi - her iki görünümde de var */}
            <div className="bg-black/60 text-xs md:text-sm text-white/70 py-2 px-4 border-l-2 border-[#39a045]">
              <div className="flex justify-between items-center">
                <span>ÖNDER İmamhatipliler Derneği</span>
                <span className="text-[#39a045]">28.02.1997</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleImageBanner;