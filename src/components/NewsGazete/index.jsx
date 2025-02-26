import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const NewsGazete = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCards, setVisibleCards] = useState(4); // Varsayılan olarak 4 kart
  const scrollContainerRef = useRef(null);

  // Ekran boyutuna göre görünür kart sayısını ayarla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize(); // İlk yükleme
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const newsHeadlines = [
    {
      id: 1,
      image: "/assets/manşet/1.jpg",
      title: "Darbesiz indiririz",
      newspaper: "Sabah",
      date: "1997-06-18"
    },
    {
      id: 2,
      image: "/assets/manşet/2.jpg",
      title: "İmam hatip’e yeni öğrenci yok",
      newspaper: "Sabah",
      date: "1997-02-28"
    },
    {
      id: 3,
      image: "/assets/manşet/3.jpg",
      title: "9 saatlik zirvede rejime ince ayar",
      newspaper: "Milliyet",
      date: "1997-02-28"
    },
    {
      id: 4,
      image: "/assets/manşet/4.jpg",
      title: "Muhtıra gibi brifing",
      newspaper: "Sabah",
      date: "1997-02-28"
    },
    {
      id: 5,
      image: "/assets/manşet/5.jpg",
      title: "Ya uy, ya çekil",
      newspaper: "Hürriyet",
      date: "1997-02-28"
    },
    {
      id: 6,
      image: "/assets/manşet/6.jpg",
      title: "Yargıtay: Kapatırım",
      newspaper: "Cumhuriyet",
      date: "1997-02-28"
    },
    {
      id: 7,
      image: "/assets/manşet/7.jpg",
      title: "Genelkurmayda düşman değişti",
      newspaper: "Sabah",
      date: "1997-02-28"
    },
    {
      id: 8,
      image: "/assets/manşet/8.jpg",
      title: "RP kapatılıyor",
      newspaper: "Sabah",
      date: "1997-02-28"
    },
    {
      id: 9,
      image: "/assets/manşet/9.jpg",
      title: "Ordudan dört uyarı",
      newspaper: "Cumhuriyet",
      date: "1997-02-28"
    },
    {
      id: 10,
      image: "/assets/manşet/10.jpg",
      title: "Ordudan son uyarı",
      newspaper: "Milliyet",
      date: "1997-02-28"
    },
    {
      id: 11,
      image: "/assets/manşet/11.jpg",
      title: "Paşa’nın öfkesi",
      newspaper: "Sabah",
      date: "1997-02-28"
    },
    {
      id: 12,
      image: "/assets/manşet/12.jpg",
      title: "Tehdidin adı irtica",
      newspaper: "Milliyet",
      date: "1997-02-28"
    },
    {
      id: 13,
      image: "/assets/manşet/13.jpg",
      title: "İşte 18 madde",
      newspaper: "Sabah",
      date: "1997-02-28"
    },
    {
      id: 14,
      image: "/assets/manşet/14.jpg",
      title: "Kombassan’a 15 trilyonluk darbe",
      newspaper: "Hürriyet",
      date: "1997-02-28"
    },
    {
      id: 15,
      image: "/assets/manşet/15.jpg",
      title: "Erbakan Geriyor",
      newspaper: "Milliyet",
      date: "1997-02-28"
    },
    {
      id: 16,
      image: "/assets/manşet/17.jpg",
      title: "Hükümet hemen bitmeli",
      newspaper: "Hürriyet",
      date: "1997-02-28"
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.news-card-item').offsetWidth;
      const scrollAmount = cardWidth + 16;
      
      const scrollBy = direction === 'left' ? -scrollAmount : scrollAmount;
      
      const currentScroll = container.scrollLeft;
      
      let targetScroll = currentScroll + scrollBy;
      
      targetScroll = Math.round(targetScroll / scrollAmount) * scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-5 flex items-center flex-col justify-center">
      {/* Başlık ve Açıklama */}
      <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 px-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#39a045] mb-2 sm:mb-3">
          28 Şubat Süreci Gazete Manşetleri
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto">
          28 Şubat 1997 tarihinde gerçekleşen Milli Güvenlik Kurulu toplantısı ve sonrasında yaşanan
          sürecin Türk basınındaki yansımaları. Bu dönemde yayınlanan önemli gazete manşetleri,
          Türkiye'nin yakın tarihindeki bu önemli dönemi belgelemektedir.
        </p>
      </div>
  
      {/* Ana Container - Küçültülmüş */}
      <div className="max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] md:max-w-5xl mx-auto relative">
        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 sm:-left-2 md:-left-3 flex items-center">
          <button
            onClick={() => scroll('left')}
            className="bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors
              backdrop-blur-sm border border-white/10 hover:border-white/20 z-20
              -ml-2 sm:ml-0"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 sm:-right-2 md:-right-3 flex items-center">
          <button
            onClick={() => scroll('right')}
            className="bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors
              backdrop-blur-sm border border-white/10 hover:border-white/20 z-20
              -mr-2 sm:mr-0"
          >
            <ChevronRight size={18} />
          </button>
        </div>
  
        <div className="overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-3 hide-scrollbar"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            {newsHeadlines.map((news) => (
              <div
                key={news.id}
                className="news-card-item flex-none cursor-pointer"
                style={{
                  flexBasis: `calc(100% / ${visibleCards} - ${(visibleCards-1)*16/visibleCards}px)`,
                  minWidth: `calc(100% / ${visibleCards} - ${(visibleCards-1)*16/visibleCards}px)`,
                  maxWidth: `calc(100% / ${visibleCards} - ${(visibleCards-1)*16/visibleCards}px)`,
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always'
                }}
                onClick={() => setSelectedImage(news)}
              >
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] group">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                    opacity-100 group-hover:via-black/60 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5">
                      <h3 className="text-white text-xs sm:text-sm font-bold leading-tight">
                        {news.title}
                      </h3>
                      <div className="flex justify-between text-gray-300 text-xs mt-1">
                        <span>{news.newspaper}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Full Screen Modal */}
{selectedImage && (
  <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-6" onClick={() => setSelectedImage(null)}>
    <div className="relative max-w-3xl w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors p-2 z-10"
        aria-label="Kapat"
      >
        <X size={24} />
      </button>
      
      <img
        src={selectedImage.image}
        alt={selectedImage.title}
        className="max-h-[70vh] sm:max-h-[75vh] w-auto object-contain rounded-lg"
      />
      <div className="mt-3 text-white text-center">
        <h2 className="text-base sm:text-lg md:text-xl font-bold">{selectedImage.title}</h2>
        <div className="flex justify-center gap-4 mt-1.5 text-gray-300 text-xs">
          <span>{selectedImage.newspaper}</span>
        </div>
      </div>
    </div>
  </div>
)}
  
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NewsGazete;