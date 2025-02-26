import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Clock, Sun, Moon, Cloud, Star } from 'lucide-react';

const Stars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
        >
          <Star className="w-2 h-2 text-white/80" />
        </div>
      ))}
    </div>
  );
};

const AudioWaveform = ({ isPlaying, audioProgress }) => {
  const bars = 20; 
  
  return (
    <div className="flex items-center justify-center gap-0.5 h-16">
      {[...Array(bars)].map((_, i) => {
        const height = isPlaying 
          ? Math.sin((i / bars) * Math.PI + audioProgress) * 32 + 40
          : 8;
        
        return (
          <div
            key={i}
            className="w-0.5 sm:w-1 bg-white/60 rounded-full transform transition-all duration-300"
            style={{
              height: `${height}px`,
              opacity: isPlaying ? 0.4 + (i / bars) * 0.6 : 0.4
            }}
          />
        );
      })}
    </div>
  );
};

const SunOrMoon = ({ time }) => {
  const calculatePosition = (time) => {
    const totalHours = 12;
    const progress = (time - 8) / totalHours;
    const angle = progress * Math.PI;
    const radius = 35; // Yarıçap küçültüldü
    
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 - Math.sin(angle) * radius;

    return {
      top: `${y}%`,
      left: `${x}%`,
    };
  };

  const isNight = time >= 19;
  
  return (
    <div 
      className="absolute transition-all duration-1000 ease-in-out" 
      style={calculatePosition(time)}
    >
      {isNight ? (
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/20 to-transparent rounded-full" />
        </div>
      ) : (
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-b from-yellow-200 to-orange-500 rounded-full shadow-lg animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent rounded-full" />
        </div>
      )}
    </div>
  );
};

const StoryExperience = () => {
  const [currentTime, setCurrentTime] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef(null);
  const nextAudioRef = useRef(null);

  const events = [
    {
      time: 8,
      title: "Sabah",
      description: "Güneş yeni doğuyor. Yeni bir güne başlıyoruz. Kuşların sesi ve sabah esintisiyle birlikte doğa uyanıyor...",
      audioFile: "ses.mp3",
      backgroundColor: "from-orange-300 to-blue-300",
      icon: Sun
    },
    {
      time: 12,
      title: "Öğle",
      description: "Güneş tam tepede. Gün en parlak vaktinde. Canlı bir enerjiyle her yer aydınlık...",
      audioFile: "ses.mp3",
      backgroundColor: "from-blue-400 to-blue-200",
      icon: Sun
    },
    {
      time: 16,
      title: "İkindi",
      description: "Güneş yavaş yavaş alçalmaya başlıyor. Gökyüzü turuncu tonlara bürünüyor...",
      audioFile: "ses.mp3",
      backgroundColor: "from-orange-400 to-blue-300",
      icon: Cloud
    },
    {
      time: 19,
      title: "Akşam",
      description: "Gün batımı yaklaşıyor. Gökyüzü kızıla bürünüyor. Günün son ışıkları dünyayı aydınlatıyor...",
      audioFile: "ses.mp3",
      backgroundColor: "from-orange-600 to-purple-500",
      icon: Moon
    },
    {
      time: 20,
      title: "Gece",
      description: "Ay ve yıldızlar gökyüzünü aydınlatıyor. Gecenin sessiz ve huzurlu atmosferi her yeri sarıyor...",
      audioFile: "ses.mp3",
      backgroundColor: "from-blue-900 to-purple-900",
      icon: Star
    }
  ];

  const currentEvent = events.find(event => event.time === currentTime) || events[0];
  const nextEvent = events.find(event => event.time > currentTime) || events[0];
  const EventIcon = currentEvent.icon;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        const progress = audioRef.current.currentTime / audioRef.current.duration;
        setAudioProgress(progress);
      });

      audioRef.current.addEventListener('ended', () => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          const nextTime = currentTime >= 20 ? 8 : currentTime + 4;
          setCurrentTime(nextTime);
        }
      });
    }

    // Bir sonraki ses dosyasını önceden yükle
    if (nextAudioRef.current) {
      nextAudioRef.current.src = nextEvent.audioFile;
      nextAudioRef.current.load();
    }
  }, [currentTime, nextEvent]);

  useEffect(() => {
    if (isTransitioning && audioRef.current) {
      audioRef.current.src = currentEvent.audioFile;
      if (isPlaying) {
        audioRef.current.play();
      }
      setIsTransitioning(false);
    }
  }, [isTransitioning, currentEvent, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-1000 bg-gradient-to-b ${currentEvent.backgroundColor}`}>
      {currentTime >= 19 && <Stars />}
      <SunOrMoon time={currentTime} />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-2 sm:p-4">
        {/* Başlık ve Saat */}
        <div className="text-center mt-4 sm:mt-8 w-full space-y-2 sm:space-y-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <Clock className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white/80" />
            <span className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
              {String(currentTime).padStart(2, '0')}:00
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <EventIcon className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {currentEvent.title}
            </h2>
          </div>
        </div>

        {/* Ana İçerik */}
        <div className="w-full max-w-xl mx-auto px-2 sm:px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-3 sm:p-4 md:p-6">
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-4">
              {currentEvent.description}
            </p>
            <AudioWaveform isPlaying={isPlaying} audioProgress={audioProgress} />
          </div>
        </div>

        {/* Kontroller */}
        <div className="flex flex-col items-center gap-4 pb-4 w-full max-w-md px-2">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {isPlaying ? 
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : 
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              }
            </button>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {isMuted ? 
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : 
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              }
            </button>
          </div>

          {/* İlerleme Çubuğu */}
          <div className="w-full px-2">
            <div className="bg-white/20 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/60 transition-all duration-500"
                style={{ width: `${((currentTime - 8) / 12) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        className="hidden"
        muted={isMuted}
      />
      <audio 
        ref={nextAudioRef} 
        className="hidden"
      />
    </div>
  );
};

export default StoryExperience;