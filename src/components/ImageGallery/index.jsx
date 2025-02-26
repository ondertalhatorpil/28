import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar, MapPin, Camera } from 'lucide-react';

const ImageGallery = () => {
    // States
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState('sultanahmet');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Mobile check
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

  const categories = {
    sultanahmet: {
      title: "Sultanahmet Mitingi",
      description: "Sultanahmet'te gerçekleşen tarihi mitinglerin görsel arşivi",
      images: [
        {
          id: 1,
          url: "/assets/gallery/sultanahmet/1.jpg",
          title: "Sultanahmet Mitingi 1",
          date: "28 Şubat 1997",
          location: "İstanbul",
          description: "Sultanahmet Meydanı'ndaki tarihi mitingden bir kare"
        },
        {
          id: 2,
          url: "/assets/gallery/sultanahmet/2.jpg",
          title: "Sultanahmet Mitingi 1",
          date: "28 Şubat 1997",
          location: "İstanbul",
          description: "Sultanahmet Meydanı'ndaki tarihi mitingden bir kare"
        },
        {
          id: 3,
          url: "/assets/gallery/sultanahmet/3.jpg",
          title: "Sultanahmet Mitingi 1",
          date: "28 Şubat 1997",
          location: "İstanbul",
          description: "Sultanahmet Meydanı'ndaki tarihi mitingden bir kare"
        },
        {
          id: 4,
          url: "/assets/gallery/sultanahmet/4.jpg",
          title: "Sultanahmet Mitingi 1",
          date: "28 Şubat 1997",
          location: "İstanbul",
          description: "Sultanahmet Meydanı'ndaki tarihi mitingden bir kare"
        },
        {
          id: 5,
          url: "/assets/gallery/sultanahmet/5.jpg",
          title: "Sultanahmet Mitingi 12",
          date: "28 Şubat 1997",
          location: "İstanbul",
          description: "Sultanahmet Meydanı'ndaki tarihi mitingden bir kare"
        },
        {
            id: 6,
            url: "/assets/gallery/sultanahmet/6.jpg",
            title: "Sultanahmet Mitingi 12",
            date: "28 Şubat 1997",
            location: "İstanbul",
            description: "Sultanahmet Meydanı'ndaki tarihi mitingden bir kare"
        },
        {
            id: 7,
            url: "/assets/gallery/sultanahmet/7.jpg",
            title: "Sultanahmet Mitingi 12",
            date: "28 Şubat 1997",
            location: "İstanbul",
            description: "Sultanahmet Meydanı'ndaki tarihi mitingden bir kare"
        },
        {
            id: 8,
            url: "/assets/gallery/sultanahmet/8.jpg",
            title: "Sultanahmet Mitingi 12",
            date: "28 Şubat 1997",
            location: "İstanbul",
            description: "Sultanahmet Meydanı'ndaki tarihi mitingden bir kare"
        }
      ]
    },
    sincan: {
      title: "Sincan Olayları",
      description: "Sincan'da yaşanan olayların görsel kaydı",
      images: [
        {
          id: 1,
          url: "/assets/gallery/sincan/1.jpg",
          title: "Sincan Olayları 1",
          date: "28 Şubat 1997",
          location: "Ankara",
          description: "Sincan'da yaşanan olaylardan bir kare"
        },
        {
          id: 2,
          url: "/assets/gallery/sincan/2.jpg",
          title: "Sincan Olayları 1",
          date: "28 Şubat 1997",
          location: "Ankara",
          description: "Sincan'da yaşanan olaylardan bir kare"
        },
        {
          id: 3,
          url: "/assets/gallery/sincan/3.jpg",
          title: "Sincan Olayları 1",
          date: "28 Şubat 1997",
          location: "Ankara",
          description: "Sincan'da yaşanan olaylardan bir kare"
        },
        {
          id: 4,
          url: "/assets/gallery/sincan/4.jpg",
          title: "Sincan Olayları 1",
          date: "28 Şubat 1997",
          location: "Ankara",
          description: "Sincan'da yaşanan olaylardan bir kare"
        },
        {
          id: 5,
          url: "/assets/gallery/sincan/5.jpg",
          title: "Sincan Olayları 1",
          date: "28 Şubat 1997",
          location: "Ankara",
          description: "Sincan'da yaşanan olaylardan bir kare"
        },
        {
            id: 6,
            url: "/assets/gallery/sincan/6.jpg",
            title: "Sincan Olayları 1",
            date: "28 Şubat 1997",
            location: "Ankara",
            description: "Sincan'da yaşanan olaylardan bir kare"
        },
        {
            id: 7,
            url: "/assets/gallery/sincan/7.jpg",
            title: "Sincan Olayları 1",
            date: "28 Şubat 1997",
            location: "Ankara",
            description: "Sincan'da yaşanan olaylardan bir kare"
        },
      ]
    },
    direnis: {
      title: "Direniş Görüntüleri",
      description: "Halkın direniş anlarından kareler",
      images: [
        {
          id: 1,
          url: "/assets/gallery/direnis/1.jpg",
          title: "Direniş 1",
          date: "28 Şubat 1997",
          location: "Türkiye",
          description: "Direniş sürecinden önemli bir an"
        },
        {
          id: 2,
          url: "/assets/gallery/direnis/2.jpg",
          title: "Direniş 1",
          date: "28 Şubat 1997",
          location: "Türkiye",
          description: "Direniş sürecinden önemli bir an"
        },
        {
          id: 3,
          url: "/assets/gallery/direnis/3.jpg",
          title: "Direniş 1",
          date: "28 Şubat 1997",
          location: "Türkiye",
          description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 4,
            url: "/assets/gallery/direnis/4.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 5,
            url: "/assets/gallery/direnis/5.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 6,
            url: "/assets/gallery/direnis/6.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 7,
            url: "/assets/gallery/direnis/7.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 8,
            url: "/assets/gallery/direnis/8.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 9,
            url: "/assets/gallery/direnis/9.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 10,
            url: "/assets/gallery/direnis/10.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 11,
            url: "/assets/gallery/direnis/11.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 12,
            url: "/assets/gallery/direnis/12.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 13,
            url: "/assets/gallery/direnis/13.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 14,
            url: "/assets/gallery/direnis/14.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 15,
            url: "/assets/gallery/direnis/15.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 16,
            url: "/assets/gallery/direnis/16.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 17,
            url: "/assets/gallery/direnis/17.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 18,
            url: "/assets/gallery/direnis/18.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 19,
            url: "/assets/gallery/direnis/19.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 20,
            url: "/assets/gallery/direnis/20.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 21,
            url: "/assets/gallery/direnis/21.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 22,
            url: "/assets/gallery/direnis/22.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 23,
            url: "/assets/gallery/direnis/23.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 24,
            url: "/assets/gallery/direnis/24.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 25,
            url: "/assets/gallery/direnis/25.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 26,
            url: "/assets/gallery/direnis/26.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        },
        {
            id: 27,
            url: "/assets/gallery/direnis/27.jpg",
            title: "Direniş 1",
            date: "28 Şubat 1997",
            location: "Türkiye",
            description: "Direniş sürecinden önemli bir an"
        }
      ]
    }
  };

  const changeCategory = (category) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    setCurrentIndex(0);
};

const nextSlide = () => {
    const imagesPerView = isMobile ? 1 : 3;
    const lastIndex = Math.max(0, categories[activeCategory].images.length - imagesPerView);
    setCurrentIndex(current => current >= lastIndex ? 0 : current + imagesPerView);
};

const prevSlide = () => {
    const imagesPerView = isMobile ? 1 : 3;
    const lastIndex = Math.max(0, categories[activeCategory].images.length - imagesPerView);
    setCurrentIndex(current => current <= 0 ? lastIndex : current - imagesPerView);
};

// Visible images calculation
const visibleImages = categories[activeCategory].images.slice(
    currentIndex,
    currentIndex + (isMobile ? 1 : 3)
);

return (
    <div className="py-20 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
            {/* Category Selection - Mobil İçin Büyütülmüş ve Ortalanmış */}
            <div className="mb-12 md:mb-16">
                <div className="flex overflow-x-auto pb-3 md:pb-0 md:flex-wrap hide-scrollbar justify-start md:justify-center gap-3 md:gap-4 px-4">
                    <div className="w-8 md:hidden flex-shrink-0"></div> {/* Mobilde başlangıç boşluğu */}
                    {Object.entries(categories).map(([key, category]) => (
                        <button
                            key={key}
                            onClick={() => changeCategory(key)}
                            className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg 
                                transition-all duration-300 whitespace-nowrap shadow-md flex-shrink-0 ${
                                activeCategory === key 
                                    ? 'bg-[#39a045] text-white font-medium shadow-lg' 
                                    : 'bg-white/10 text-white/80 hover:bg-white/15'
                            }`}
                        >
                            <span className="relative z-10">{category.title}</span>
                        </button>
                    ))}
                    <div className="w-8 md:hidden flex-shrink-0"></div> {/* Mobilde bitiş boşluğu */}
                </div>
            </div>

            {/* Category Title and Description */}
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#39a045] mb-4">
                    {categories[activeCategory].title}
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
                    {categories[activeCategory].description}
                </p>
            </div>

            {/* Gallery Section */}
            <div className="relative max-w-5xl mx-auto">
                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 
                        bg-black/50 hover:bg-black/70 text-white p-2.5 md:p-3
                        rounded-full transition-all duration-300 backdrop-blur-sm
                        shadow-lg"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10 
                        bg-black/50 hover:bg-black/70 text-white p-2.5 md:p-3 
                        rounded-full transition-all duration-300 backdrop-blur-sm
                        shadow-lg"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Image Gallery - Açıklama, Konum ve Tarih Kaldırıldı */}
                <div className="overflow-hidden">
                    <div className={`flex transition-all duration-500 ease-out gap-6 md:gap-8
                        ${isMobile ? 'justify-center' : ''}`}
                    >
                        {visibleImages.map((image, idx) => (
                            <div
                                key={`${image.id}-${idx}`}
                                className={`group relative rounded-xl overflow-hidden cursor-pointer
                                    ${isMobile ? 'w-full max-w-xs' : 'w-80'}
                                    aspect-[4/3] bg-gray-900 shadow-xl transition-transform duration-500
                                    hover:shadow-2xl hover:-translate-y-1`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-all duration-700 
                                        group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 
                                    to-transparent opacity-100 group-hover:opacity-100">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Düzeltilmiş Modal */}
        {selectedImage && (
            <div 
                className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                    }}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 
                        text-white/90 hover:text-white rounded-full p-3 transition-all duration-300
                        hover:scale-110 backdrop-blur-sm z-20"
                    aria-label="Kapat"
                >
                    <X className="w-6 h-6" />
                </button>

                <div 
                    className="w-full max-w-3xl rounded-xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={selectedImage.url}
                        alt={selectedImage.title}
                        className="w-full h-auto max-h-[85vh] object-contain bg-black/60"
                    />
                </div>
            </div>
        )}

        {/* Mobil Görünüm İçin CSS */}
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

export default ImageGallery;