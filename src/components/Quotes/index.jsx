import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const quotes = [
    {
      quote: "8 Şubat sürecinde yaşananlar, Türk demokrasi tarihine kara bir leke olarak geçmiştir.",
      author: "İbrahim Kalın",
      position: "Mit Müsteşarı",
      type: "ayah"
    },
    {
      quote: "28 Şubat sürecinde yaşananlar, Türk demokrasi tarihine kara bir leke olarak geçmiştir.",
      author: "Recep Tayyip Erdoğan",
      position: "Türkiye Cumhuriyeti Cumhurbaşkanı",
      type: "political"
    },
    {
      quote: "Post-modern darbe olarak adlandırılan 28 Şubat, demokrasimize vurulan ağır bir darbedir.",
      author: "Cemil Çiçek",
      position: "Eski Adalet Bakanı",
      type: "political"
    }
  ];

  // Otomatik döngü için
  useEffect(() => {
    const interval = setInterval(() => {
      handleQuoteChange('next');
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleQuoteChange = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (direction === 'next') {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    } else {
      setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Dokunma olayları için
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Sola kaydırma - sonraki alıntı
      handleQuoteChange('next');
    }

    if (touchStart - touchEnd < -100) {
      // Sağa kaydırma - önceki alıntı
      handleQuoteChange('prev');
    }
  };

  // Alıntı tipine göre simge ve renkler
  const getTypeStyles = (type) => {
    switch (type) {
      case 'ayah':
        return {
          iconColor: 'text-[#39a045]',
          bgGradient: 'from-[#39a045]/20 to-transparent',
          accent: 'text-[#39a045]'
        };
      case 'political':
        return {
          iconColor: 'text-[#39a045]',
          bgGradient: 'from-[#39a045]/20 to-transparent',
          accent: 'text-[#39a045]'
        };
      default:
        return {
          iconColor: 'text-[#39a045]',
          bgGradient: 'from-[#39a045]/20 to-transparent',
          accent: 'text-[#39a045]'
        };
    }
  };

  const typeStyles = getTypeStyles(quotes[currentQuote].type);

  return (
    <section className="flex items-center justify-center p-5 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full mx-auto relative">
        {/* İlerleme çubuğu */}
        <div className="absolute -top-2 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#39a045] transition-all duration-300 ease-out"
            style={{ width: `${((currentQuote + 1) / quotes.length) * 100}%` }}
          ></div>
        </div>

        {/* Alıntı Kartı */}
        <div 
          className="relative z-10 w-full bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/10"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Dekoratif arka plan gradyeni */}
          <div className={`absolute inset-0 bg-gradient-to-br ${typeStyles.bgGradient} opacity-30`}></div>
          
          <div className="p-6 sm:p-8 md:p-10 relative">
            {/* Büyük tırnak işareti */}
            <div className="absolute top-4 right-4 opacity-10">
              <Quote className="w-24 h-24 md:w-32 md:h-32 text-white" />
            </div>
            
            {/* Alıntı içeriği */}
            <div className={`relative z-10 transition-all duration-500 ease-out transform ${isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
              <div className="flex items-center mb-6">
                <Quote className={`w-8 h-8 ${typeStyles.iconColor} mr-3`} />
                <div className="h-px flex-grow bg-white/20"></div>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                "{quotes[currentQuote].quote}"
              </p>
              
              <div className="flex items-center">
                <div className="flex-grow"></div>
                <div className="text-right">
                  <h3 className={`text-lg md:text-xl font-bold ${typeStyles.accent}`}>
                    {quotes[currentQuote].author}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 mt-1">
                    {quotes[currentQuote].position}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gezinme kontrolleri */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => handleQuoteChange("prev")}
            className="group bg-black/30 hover:bg-[#39a045] text-white p-3 rounded-full transition-all duration-300 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-[#39a045]/20 transform hover:-translate-x-1"
            disabled={isAnimating}
            aria-label="Önceki alıntı"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Nokta göstergeleri */}
          <div className="hidden sm:flex items-center gap-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentQuote(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentQuote === index
                    ? 'bg-[#39a045] w-6'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Alıntı ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => handleQuoteChange("next")}
            className="group bg-black/30 hover:bg-[#39a045] text-white p-3 rounded-full transition-all duration-300 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-[#39a045]/20 transform hover:translate-x-1"
            disabled={isAnimating}
            aria-label="Sonraki alıntı"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Quotes;