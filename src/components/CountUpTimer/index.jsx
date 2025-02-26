import React, { useState, useEffect } from 'react';

const CountUpTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Use exact date with timezone specification
    const targetDate = new Date('1997-02-28T00:00:00+03:00');
    
    const updateTimer = () => {
      const now = new Date();
      
      // Calculate years more accurately by checking if we've passed the anniversary date this year
      let years = now.getFullYear() - targetDate.getFullYear();
      const monthNow = now.getMonth();
      const dayNow = now.getDate();
      const monthTarget = targetDate.getMonth();
      const dayTarget = targetDate.getDate();

      // If we haven't reached the anniversary yet this year, subtract one year
      if (monthNow < monthTarget || (monthNow === monthTarget && dayNow < dayTarget)) {
        years--;
      }

      // Calculate last anniversary date
      const lastAnniversary = new Date(now.getFullYear(), monthTarget, dayTarget);
      if (monthNow < monthTarget || (monthNow === monthTarget && dayNow < dayTarget)) {
        lastAnniversary.setFullYear(lastAnniversary.getFullYear() - 1);
      }

      // Calculate time difference from last anniversary
      const difference = now - lastAnniversary;
      
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeElapsed({ years, days, hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeItems = [
    { value: timeElapsed.years, label: "YIL" },
    { value: timeElapsed.days, label: "GÜN" },
    { value: timeElapsed.hours, label: "SAAT" },
    { value: timeElapsed.minutes, label: "DAKİKA" },
    { value: timeElapsed.seconds, label: "SANİYE" }
  ];

  return (
    <div className="w-full min-h-screen overflow-hidden relative pt-14 ">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-[linear-gradient(rgba(57,160,69,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(57,160,69,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#39a045]/0 via-[#39a045]/10 to-transparent transform -rotate-45" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[#39a045]/0 via-[#39a045]/10 to-transparent transform rotate-45" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10 sm:py-12 md:py-16">
        <div className="w-full max-w-[90rem] mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-6 mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-[#39a045] drop-shadow-lg">28 Şubat</span>
              <span className="text-white"> Post Modern Darbe</span>
            </h1>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#39a045] to-transparent mx-auto mb-4" />
              <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
                Bu antidemokratik müdahaleden bu yana geçen süre
              </p>
            </div>
          </div>

          {/* Counter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto">
            {timeItems.map((item, index) => (
              <div
                key={item.label}
                className={`relative group ${
                  index === timeItems.length - 1 ? 'col-span-2 sm:col-span-3 lg:col-span-1' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#39a045]/10 to-[#39a045]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 
                  border border-[#39a045]/10 group-hover:border-[#39a045]/20 transition-all duration-500
                  group-hover:transform group-hover:scale-[1.02]">
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white 
                      tabular-nums tracking-tight group-hover:text-[#39a045] transition-colors duration-500">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base text-gray-400 font-medium mt-2 
                      group-hover:text-gray-300 transition-colors duration-500">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote Section */}
          <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto px-4">
            <div className="relative">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#39a045]/30 mx-auto mb-4">
                <path fill="currentColor" d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
              </svg>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 italic leading-relaxed">
                "Demokrasi ve Hukuk Devleti ilkelerini hiçe sayan bu müdahale, milletimizin
                hafızasında derin izler bırakmıştır."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountUpTimer;